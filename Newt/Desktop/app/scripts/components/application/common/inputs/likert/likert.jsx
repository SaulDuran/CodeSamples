var React = require('react'),
    mui = require('material-ui');

var RadioButton = mui.RadioButton;

var injectTapEventPlugin = require("react-tap-event-plugin");

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

React.initializeTouchEvents(true);

injectTapEventPlugin();

//*******************************
//*** React Class
//*******************************
var Likert = React.createClass({
  mixins: [MuiThemeContextMixin],

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
        selected = this.props.value;

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
            selected: selected,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        };
    },

    componentWillReceiveProps: function(newProps)
    {
        selected = newProps.value;

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
            selected: selected,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        });
    },

    _handleItemSelection: function(e)
    {
        this.setState({
            selected: e.target.value
        });

        this.props.onChange(e.target.value);
    },

    _calculateSelected: function(childItem)
    {
        if(parseInt(childItem) <= parseInt(this.state.selected)){
            return true;
        }

        return false;
    },

    renderLikertItem: function(option, i, data)
    {
        var center = {textAlign: 'center'};

        var selected = this._calculateSelected(option);

        var styleHr = {};
        if ( i == data.length-1){
            styleHr = { display: 'none' };
        }

        var classHr = '';
        if (option < this.state.selected){
            classHr = 'selected';
        }

        return (
            <div className="likert-item-container" >
                <RadioButton className="likert-item" value={option} onTouchTap={this._handleItemSelection} checked={selected} />
                <hr className={classHr} style={ styleHr } />
            </div>
        );
    },

    renderLabelText: function(labelObject, i, n)
    {
        var middle = Math.ceil(n.length / 2);
        var className = "likert-label";
        if (i === middle-1){
            className += " centered";
        }


        return (
            <div key={i} className={className}>
                {labelObject.text}
            </div>
        );
    },

    render: function()
    {
        return (
            <div className="NLikert">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <div>
                {_.map(this.props.schema.fields, this.renderLabelText)}
                </div>
                <div>
                {_.range(this.props.schema.fields.length).map(this.renderLikertItem)}
                </div>
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        )
    }

});

module.exports = Likert;
