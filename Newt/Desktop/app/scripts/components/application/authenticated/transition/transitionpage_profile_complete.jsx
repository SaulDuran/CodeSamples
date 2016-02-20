/** @jsx React.DOM */
var React = require('react');
var mui = 	require('material-ui'),
		RaisedButton = mui.RaisedButton;

var Reflux = require('reflux');
 var Router = require('react-router');

var RouterNavigation = Router.Navigation;


   
var AnswersStore = require('stores/Answers');
//var Banner = require('../common/banner.jsx');
var actions = require('actions/actions');
var NtpButton = require('components/common/inputs/ntpButton/ntpButton');
var AuthService = require('services/AuthService');


var Transition = React.createClass({
  	// Get Transition Options
  mixins:[
    Reflux.listenTo(AuthService, "_ontrigger_authstate"),
    RouterNavigation   
  ],
  _ontrigger_authstate: function() {
    this.setState({
      "userData": AuthService.getUserObj()
    });
  },
  getInitialState: function() {
    return { 
      "userData": AuthService.getUserObj()
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
  },
  onContinue: function (action) {
      actions.transitionTo({"route" : "about-me"});
  },
	render : function () {
    var answers = this.state.answers;
  
     var avatar = _.result(this.state.userData, 'meta.avatar', {type: undefined});

      var ProfileUserPic = "";
      if (avatar.type === "premade") {
	  ProfileUserPic = "assets/images/avatar/avatar (" + avatar.data + ").png";
      } else {
	  ProfileUserPic = "data:image/jpg;base64," + avatar.data;
      }
 
    var email = AnswersStore.getAnswerByQuestionKey('registration.EmailAddress.value') || window.NewtEmailAddress || "email address";

    //var email = answers["EmailAddress"] || window.NewtEmailAddress || "email address";


    // style with opaque and layers to be refined in near future
    	return (
            <div className="ntp-outer-container">
	    		<div className="transition-container transition-one">
	    			<div className="transition-content ntp-inner-container transition-assessment-content">
              <div className="transition-inner-content">
                <div className="transition-message-title">
                  <h1>Congrats! your personal profile is complete.</h1>
                </div>
                <div className="transitionText">
                  <div className="transition-tagline">the next step on your path to health is a welcome call from our care specialist.</div>
                  <div className="whats-included">
                    <img src="assets/images/svg/include/include_profile_complete.svg" alt="Newtopia" />
                  </div>
                  <p>Expect an email confirming the completion of your personal profile to username@example.com.<br />If you do not receive a confirmation note from us within the next 10-minutes, you may want to check your spam folder.</p>
                  <p> </p>
                  <p className="bottom-privacy">If you entered the wrong e-mail address or would like us to use a different email address for the Newtopia program please contact one of our Care Specialists and they will be glad to assist you. They can be reached via e-mail at <a href="mailto:clientcare@newtopia.com">clientcare@newtopia.com</a></p> 

                </div>
              </div>
	    			</div>

				</div>
			</div>
		);

    }

});
module.exports = Transition;

