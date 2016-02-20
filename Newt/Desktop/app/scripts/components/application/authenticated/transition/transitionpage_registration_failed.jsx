/** @jsx React.DOM */
var React = require('react');
var mui = 	require('material-ui'),
		RaisedButton = mui.RaisedButton;

var AnswersStore = require('stores/Answers');
var actions = require('actions/actions');
var NtpButton = require('../../../../components/common/inputs/ntpButton/ntpButton.jsx');

var Transition = React.createClass({
  	// Get Transition Options
  getInitialState: function () {
    return {
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {
  },
  onRestart: function() {
      actions.transitionTo({"route" : "registration", "args" : {"page": 1}});
  },
	render : function () {


    // style with opaque and layers to be refined in near future
    	return (
            <div className="ntp-outer-container">
	    		<div className="transition-container transition-one">
	    			<div className="ntp-inner-container transition-assessment-content">
              <div className="transition-inner-content-one">
                <div className="transitionText transition-one-content">
                  <p className="transition-one-content-title">Thank you for attempting to register</p>
                  <p className="transition-fail-blue"><strong>At this time, it looks like you may not be eligible.</strong></p>
                  <p className="transition-fail-blue">Before we take steps to validate this information, please ensure that your date of birth and member ID have been entered exactly as requested, as unfortunately they do not match our records.<br /><br />
                  Click <a href="#" onClick={this.onRestart}>here</a> to begin the registration process again.<br /><br /> 
                  You can choose to call our toll free number <strong>(1-888-639-3181)</strong> to connect with a Care Specialist who will guide you through the registration process.</p>
                </div>
              </div>
	    			</div>

				</div>
			</div>
		);

    }

});
//<div className="transition-user-picture"><img src={profileUserPic} width="100" height="100"/></div>
//<div className="transition-message-title"><h1>Hey {answers["FirstName"] || answers["PublicDisplayName"]}!</h1></div>
//<div className="transition-button">
//<RaisedButton label="START ASSESSMENT" secondary={true} className="transition-button-btn" onClick={this.onContinue} />
//</div>

module.exports = Transition;

