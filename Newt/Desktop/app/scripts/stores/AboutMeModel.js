var _ = require('lodash');
var $ = require('jquery');
var Reflux = require('reflux');


var actions = require('actions/actions');
var AnswersModel = require('stores/Answers');
var NewtConfig = require('config');
var userURL = NewtConfig.BASE_URL + "user";


var AuthService = require('services/AuthService');


var ABOUT_USER = {};

var AboutMeModel = Reflux.createStore({
  listenables: actions,
  init: function(args) {
    this.listenTo(AuthService, this._onAuthServiceEvent);
    this.listenTo(actions.requestWelcomeCall, this._on_requestWelcomeCall);
    this.listenTo(actions.fetchAboutMe, this._fetchAboutUser);

    console.log("TEST 2 ===>fetchedAboutMe ?")

    if (AuthService.getLoggedIn()) {
      this._fetchAboutUser();
    }
  },

  getAboutUser: function() {
    return ABOUT_USER;
  },

  _on_requestWelcomeCall: function(obj) {
    var self = this;
    $.ajax({
      type: "POST",
      xhrFields: {
        withCredentials: true
      },
      url: userURL + "/me/about/requestWC",
      dataType: 'json',
      data: JSON.stringify(obj),
      statusCode: {
        200: function(res) {
	     self.trigger({"name" : "submitted:welcome_call"});
    	}
      }
    }).error(function() {
	self.trigger({"name" : "welcome_call:failed"});
    });

  },

  _onAuthServiceEvent: function() {
    if (AuthService.getLoggedIn()) {
      this._fetchAboutUser();
    } else {
      ABOUT_USER = {};
    }
  },

  _fetchAboutUser: function() {
    var self = this;
    $.ajax({
      type: "GET",
      xhrFields: {
        withCredentials: true
      },
      url: userURL + "/me/about",
      statusCode: {
        200: function(res) {
          ABOUT_USER = res;
          self.trigger({
            name: "change:aboutme"
          });
        }
      }
    });

  }

});


module.exports = AboutMeModel;

