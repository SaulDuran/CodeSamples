"use strict";
var React = require('react');

var Reflux = require('reflux');

var AuthService = require('services/AuthService');

var actions = require('actions/actions');

var Router = require('react-router');
var RouterNavigation = Router.Navigation;

var Footer = React.createClass({
	render: function() {
        return (
            <footer className="footer">
                <div className="footer-container">
                    <div className="row">
                        <div className="col-xs-12"><span className="footer-tx-small">Have any questions? We are standing by to support you</span></div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12"><span className="footer-tx-regular">1.888.639.3181 | clientcare@newtopia.com</span></div>
                    </div>
                </div>
            </footer>
		);
	}
});

module.exports = Footer;
