/** @jsx React.DOM */
var React = require('react');

var Router = require('react-router');
var Reflux = require('reflux');
// var actions = require('../../actions/actions');
// var AuthService = require('../../stores/service/AuthService');

// var NtpButton = require('./ntpButton.jsx');

// check for login:
//console.log('Logged in: ' + AuthService.getLoggedIn());


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(AuthService, "onLogout"),
	    Reflux.listenTo(AuthService, "onLogin"),
	    Router.Navigation,
	    Router.State
	],

	getInitialState: function()
	{
		return this._syncAuth();
	},

	onLogout: function(){
		this._onAuthModelChange();
	},

	onLogin: function(){
    	this._onAuthModelChange();
	},

	_onAuthModelChange: function(options){
		console.log("===BANNER onAuthModelChange====");
		this.setState(this._syncAuth);
	},

	_loggedInStateClickHandler: function(){
		AuthService.logout();
		actions.transitionTo({"to" : "start"});
	},

	_loggedOutStateClickHandler: function(){
		actions.transitionTo({"to" : "start"});
	},

	_syncAuth: function(){
//		var loggedIn = AuthService.getAuthState()["logged_in"];
		console.log('checking login (_syncAuth): '+AuthService.getLoggedIn());
		var loggedIn = AuthService.getLoggedIn();
		
		var text = loggedIn ? 'LOGOUT' : 'LOGIN';
		var label = loggedIn ? '' : "Have an account?"
		var handler = loggedIn ? this._loggedInStateClickHandler : this._loggedOutStateClickHandler;
		
//		console.log({authStatusLabel: label,
//			  authStatusText: text,
//			  authStatusHandler: handler});
		
		return {
		  authStatusLabel: label,
		  authStatusText: text,
		  authStatusHandler: handler
		};
	},

	render: function () {
		var bannerStyle = {
			"padding-top": "0px",
			"margin-bottom": "30px"
		}
		var authStatusStyle = {
  			"cursor": "pointer",
  			"padding-right": "30px"
		};
		var logoStyle ={
			"cursor": "pointer",
			"padding-left": "0px",
			"text-align": "left"
		}

		var labelStyle = {
			"margin-right": "20px",
			"color": "#fff"
		}



		return (
			<div className="banner" style={bannerStyle}>
				 <div className="pure-g banner-inner-grid">
			        <div className="pure-u-1-2 2-box">
			        	<div className="banner-newtopia-logo" style={logoStyle}><img className="logo-image" src="images/newtopia_logo.svg" /></div>
			        </div>
			          <div className="pure-u-1-2 2-box" style={{"text-align" : "right"}}>
			          	<div className="auth-status-container">
				          	<div className="auth-status-label" style={labelStyle}>{this.state.authStatusLabel}</div>
		  					<div className="auth-status-text">
								<NtpButton onClick={this.state.authStatusHandler} primary={false} text={this.state.authStatusText} />
		  					</div>

						</div>
					</div>
				 </div>
			</div>
		);
	}
});
