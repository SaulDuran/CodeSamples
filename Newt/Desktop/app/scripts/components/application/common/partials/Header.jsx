"use strict";
var React = require('react');

var Reflux = require('reflux');

var AuthService = require('services/AuthService');

var actions = require('actions/actions');

var Router = require('react-router');
var RouterNavigation = Router.Navigation;

var Header = React.createClass({

    mixins: [
        RouterNavigation,
        Reflux.listenTo(AuthService, "_on_auth_event")
    ],

    _on_auth_event: function(evt){

        if( evt && evt.name && evt.name == 'change:loggedIn' ){
            this.setState({
                loggedIn: true
            });
        }

        if( evt && evt.name && evt.name == 'change:loggedOut' ){
            this.setState({
                loggedIn: false
            });
        }
    },

    getInitialState: function(){
        return({
           loggedIn: AuthService.getLoggedIn()
        });
    },

    _onLogout: function(){
        AuthService.logout();
        this.transitionTo('login');
    },

    _onLogin: function(){
        this.transitionTo('login');
    },

    _renderBar: function(){
        if ( this.state.loggedIn ){
            var user = AuthService.getUserObj();
            //<span>Welcome {_.result(user, 'meta.EmailAddress.value', _.result(user, 'display_name', 'Participant'))}!</span>
            //TODO: get EmailAddress from registration record result.
            return (
                <div className="button-bar">
                    <span>Welcome {_.result(user, 'display_name', _.result(user, 'meta.FirstName.rawValue'))}!</span>
                    <button className="header-button" onClick={this._onLogout}>LOGOUT</button>
                </div>
            );
        }

        return (
            <div className="button-bar">
                <span>Have an account already?</span>
                <button className="header-button" onClick={this._onLogin}>LOGIN</button>
            </div>
        );

    },

	render: function() {
        return (
            <header className="container header">
                <div className="row header_container">
                    <div className="col-xs-6">
                        <a className="logo">
                            <img src="assets/images/svg/newtopia-logo.svg" alt="Newtopia" />
                        </a>
                    </div>
                    <div className="col-xs-6">
                        {this._renderBar()}
                    </div>
                </div>
            </header>
		);
	}
});

module.exports = Header;
