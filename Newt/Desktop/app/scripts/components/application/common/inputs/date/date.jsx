var React = require('react'),
    mui = require('material-ui');

var TextField = mui.TextField;

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

var datePick = require('jquery-ui/datepicker');

var injectTapEventPlugin = require("react-tap-event-plugin");

React.initializeTouchEvents(true);

injectTapEventPlugin();

//*******************************
//*** React Class
//*******************************
var DateSelector = React.createClass({
  mixins: [MuiThemeContextMixin],

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
    },

    componentDidMount: function(){

        var that = this;
        $('.datepicker').datepicker({
            changeMonth: true,
            changeYear: true,
            defaultDate: '01/01/1980',
            onSelect: function(value, obj){
                that._onselect(value);
            }
        });
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
            value: this.props.value,
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

    _onfocus: function(){
        this.setState({
            focused: true
        });
    },

    _onselect: function(date){
      this.props.onChange(date);

      this.setState({
          focused: false,
          value: date
      });
    },

    _onblur: function(){
        var date = $('.datepicker').val();

        this.props.onChange(date);

        this.setState({
            focused: false,
            value: date
        });
    },

    setValue: function(e, date){
        this.setState({"value": date});

        this.props.onChange(date);
    },

    render : function(){

        var now = new Date();

        var hrStyle = {transform: 'scaleX(0)'};

        if (this.state.focused){
            hrStyle = {transform: 'scaleX(1)'};
        }

        return(
            <div className="NDate">
                <div className="label">
                    <label>{this.props.schema.text}</label>
                    <div className="input-error">{this.state.beforeErrorText}</div>
                    <div className="datepicker-container">
                        <input className="datepicker" ref="datePick" onFocus={this._onfocus} onBlur={this._onblur} value={this.state.value}  />
                        <hr className="first" />
                        <hr style={hrStyle} className="second" />
                    </div>

                    <div className="input-error">{this.state.afterErrorText}</div>
                </div>
            </div>
        );
    }
});

module.exports = DateSelector;