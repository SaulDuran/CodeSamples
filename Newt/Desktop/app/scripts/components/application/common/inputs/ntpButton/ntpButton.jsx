/** @jsx React.DOM */
var React = require('react');
var actions= require('actions/actions');

var NtpButton = React.createClass({
    // Get Assessment Options
    render : function () {

        var button_class = "ntp-button";
        var display_style = {};

        if(this.props.primary !== undefined){
            if(this.props.primary === false){
                button_class = "ntp-button-secondary";
            }
        }

        if(this.props.disabled && this.props.disabled === true){
            display_style = {"display" : "none"};
        }

        return (
            <button style={display_style} onClick={this.props.onClick} className={button_class + " " + this.props.className}>{this.props.text}</button>
        );
    }

});

module.exports = NtpButton;