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
      actions.transitionTo({"route" : "assessment", "args" : {"page": 1}});
  },
	render : function () {
    var answers = this.state.answers;
    var firstName = AnswersStore.getAnswerByQuestionKey('registration.FirstName.value');
    var display_name = AnswersStore.getAnswerByQuestionKey('registration.NewtopiaProfileName.value');
    //var profileUserPic = answers['UploadYourPhoto'] || answers['SelectAvatar'] || "images/avatarGeneric.png";
    var avatar = _.result(this.state.userData, 'meta.avatar', {"type" : undefined});
    var ProfileUserPic = "";
    if (avatar.type === "premade") {
      ProfileUserPic = "assets/images/avatar/avatar (" + avatar.data + ").png";
    } else if (avatar.type === "custom") {
      ProfileUserPic = "data:image/jpg;base64," + avatar.data;
    } else {
      ProfileUserPic = "assets/images/blank-profile-picture.png";
    }
    //Hello {firstName || display_name}!
    // style with opaque and layers to be refined in near future
    	return (
    		<div className="ntp-outer-container">
          <div className="transition-container transition-one">
            <div className="transition-content ntp-inner-container">

              <div className="transition-inner-content">
                <div className="transition-message-title">
                  <h1>YOUR REGISTRATION IS COMPLETE!</h1>
                </div>

                <div className="row">
                  <div className="transition-user-picture col-sm-2">
                    <img src={ProfileUserPic} width="100" height="100"/>
                    <div className="pic-name">{display_name}Ilanit</div>
                  </div>
                  <div className="transition-user-move col-sm-10">
                    <p>Move to the next step on your journey to a healthier lifestyle. Complete your personal profile and share your story with us. </p>
                  </div>

                </div>

                <div className="transitionText">
                  <div className="transition-pictures">
                    <div className="pictures-container">
                      
                      <div className="step">
                        <div className="">
                          <div><img src="assets/images/svg/clock.svg" /></div>
                          <div className="transition-pictures-text">IT ONLY TAKES<br /> 20 MINUTES</div>
                        </div>
                        <div className="">
                          <hr />
                        </div>
                      </div>

                      <div className="step">
                        <div className="">
                          <div><img src="assets/images/svg/face.svg" /></div>
                          <div className="transition-pictures-text">YOU CAN BE HONEST!<br /> IT’S JUST BETWEEN US</div>
                        </div>
                        <div className="">
                          <hr />
                        </div>
                      </div>

                      <div className="step">
                        <div className="">
                          <div><img src="assets/images/svg/timer.svg" /></div>
                          <div className="transition-pictures-text">YOU HAVE 48-HOURS<br /> TO COMPLETE IT</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p></p>
                  <p>The combined results from your profile and genetic test will enable us to customize a program that works for you.</p>
                  <p></p>

                  <div className="row transition-button-container">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-4">
                      <div className="bottom-buttons">
                        <NtpButton className="buttonbar-btn" disabled="false" onClick={this.onContinue} text="START" />
                      </div>
                    </div>
                  </div>
                
                </div>
              
              </div>
	    			</div>
	    			
				</div>
			</div>
		);

    }

});
module.exports = Transition;

