var _ = require('lodash');
var $ = require('jquery');
var Reflux = require('reflux');
var NewtConfig = require('config');
var actions = require('actions/actions');
var assessmentURL = NewtConfig.BASE_URL + "program_member/assess";

var SAVING = false;
var AssessmentService = Reflux.createStore({

    init: function () {
	this.listenTo(actions.saveAssessment, this._on_save_assessment);
	this.listenTo(actions.submitAssessment, this._on_submit_assessment);


    },

    getSavingState: function () {

	return SAVING;
    },

    _on_save_assessment: function (data) {
        console.log('Assessment data sent to server: ', data);
	SAVING = true;
        var self = this;
        return $.ajax({
            type: "PUT",
            url: assessmentURL,
            contentType : 'application/json',
            data: JSON.stringify(data),
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                200:function(res){
		    SAVING = false;
                    console.log("Assessment save succeeded: ", res);
                    self.trigger({name: "assessment:SaveSucceeded"});
                }
            }
        })
        .fail(function(err){
	    SAVING = false;
            console.log("Assessment save failed: ", err);

	    err = JSON.parse(err.responseText);

            self.trigger({name: "assessment:SaveFailed", err: err.message});

        });

    },




    _on_submit_assessment: function(data){
	SAVING = true;
        console.log('Assessment data sent to server: ', data);
        var self = this;
        return $.ajax({
            type: "POST",
            url: assessmentURL,
            contentType : 'application/json',
            data: JSON.stringify(data),
            xhrFields: {
                withCredentials: true
            },
            statusCode: {
                200:function(res){
		    SAVING = false;

                    console.log("Assessment save succeeded: ", res);
                    self.trigger({name: "assessment:SubmitSucceeded"});
                }
            }
        })
        .fail(function(err){
	    SAVING = false;

            console.log("Assessment save failed: ", err);

	    err = JSON.parse(err.responseText);

            self.trigger({name: "assessment:SubmitFailed", err: err.message});
        });

    }

});

module.exports = AssessmentService;
