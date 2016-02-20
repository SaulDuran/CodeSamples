'use strict';
var React = require('react');

var Autocomplete = require('react-autocomplete');

// its actually called a combobox, but noboby searches for that
var Pick = require('react-pick');
var Combobox = Pick.Combobox;

var Promise = require('es6-promise').Promise;

//*******************************
//*** React Class
//*******************************
var ComboBox = React.createClass({

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object,
        align: React.PropTypes.string
    },

    getInitialState: function()
    {
        var beforeErrorText = '';
        var afterErrorText = '';
        if ( this.props.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = this.props.error.message;
            }else{
                afterErrorText = this.props.error.message;
            }
        }

        return {
            open: false,
            currentText: '',
            value: this._returnValueByPayload(this.props.value),
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText,
            focused: false
        }
    },

    componentWillReceiveProps: function( newProps )
    {
        var beforeErrorText = '';
        var afterErrorText = '';
        if ( newProps.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = newProps.error.message;
            }else{
                afterErrorText = newProps.error.message;
            }
        }

        this.setState({
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        });
    },

    componentDidMount: function(){
        var that = this;
        $(this.refs.comboRef.getDOMNode()).find('input').blur( function(){
            that._onBlur();
        });
    },

    _onChange: function(value){

        this.setState({
            value: value
        });
    },


    _getOptionsForInputValue: function(inputValue) {

        var fields = this.props.schema.fields;
        _(fields).forEach(function(field) {
            field.text = field.text.trim();
        }).value();

        return new Promise(function(resolve, reject) {
            var search = inputValue.toLowerCase();

            if (search === '') {

                resolve(fields);

                return;
            }

            resolve(fields.filter( function(option) {
                if ( _.startsWith(option.text.toLowerCase().trim(), search) ){
                    return option;
                }
            }));

        });
    },

    _getLabelForOption: function(value) {
        return value.text;
    },

    _returnValueByPayload: function(payload) {
        return _.find(this.props.schema.fields, {payload: payload});
    },

    _onClick: function(event){
        this.setState({
            focused: true
        });

        var input = '';

        if(this.state.value){
            input = this.state.value.text;
        }

        this.refs.comboRef.updateOptionsForInputValue(input);
    },

    _onBlur: function(){
        this.setState({
            focused: false
        });

        var value = '';

        if (typeof(this.state.value) !== 'undefined' && this.state.value !== null){
            value = this.state.value.payload;
        }

        this.props.onChange(value);
    },

    _onClickArrow: function(){
        $(this.refs.comboRef.getDOMNode()).find('input').trigger('click');
        $(this.refs.comboRef.getDOMNode()).find('input').trigger('focus');
    },

    render: function()
    {
        var hrStyle = {transform: 'scaleX(0)'};

        if (this.state.focused){
            hrStyle = {transform: 'scaleX(1)'};
        }

        var svgStyle = {
            display:'inline-block',
            height:'24px',
            width:'24px',
            '-webkit-user-select':'none',
            transition:'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            position:'absolute',
            top:'10px',
            right:'16px',
            fill:'#068d9d'
        };

        return (
            <div className="NComboBox" >
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <div className="combobox-container">
                    <Combobox
                        getOptionsForInputValue={this._getOptionsForInputValue}
                        getLabelForOption={this._getLabelForOption}
                        value={this.state.value}
                        onChange={this._onChange}
                        onClick={this._onClick}
                        onBlur={this._onBlur}
                        ref='comboRef'
                        autocomplete='menu'
                    />
                    <svg onClick={this._onClickArrow} style={svgStyle} viewBox="0 0 24 24" >
                        <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                    <hr className="first" />
                    <hr style={hrStyle} className="second" />
                </div>
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        );
    }
});

module.exports = ComboBox;