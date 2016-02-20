var React = require('react'),
    mui = require('material-ui');

var MaterialCheckbox = mui.Checkbox;

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js')

//*******************************
//*** React Class
//*******************************
var Checkbox = React.createClass({
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
        var value = this.props.value || [];

        stringValue = [];

        _.each(value, function(e){
           stringValue.push( e.toString() );
        });

        var beforeErrorText = '';
        var afterErrorText = '';
        if ( this.props.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = this.props.error.message;
            }else{
                afterErrorText = this.props.error.message;
            }
        }

        return{
            value: stringValue,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        };
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

    setValue: function(e)
    {
        var currentValues = this.state.value;

        if( this.refs['chk-' + e.target.value].isChecked() ){
            currentValues.push( e.target.value );
        }else{
            currentValues = _.without(currentValues, e.target.value);
        }

        this.setState({
            value: currentValues
        });

        this.props.onChange(currentValues);
    },

    _on_mouse_over: function(e){
        $(e.target).siblings().addClass('hover');
    },

    _on_mouse_out: function(e){
        $(e.target).siblings().removeClass('hover');
    },

    renderCheckbox: function(option, i){

        style = {float: 'left', width: 'auto', marginRight: '30px', paddingBottom: '5px'};

        //Vertical align checkboxes
        style.width = '100%';

        /*    if (this.props.align == 'vertical'){
         style.width = '100%';
         }*/

        var ref = 'chk-' + option.payload;

        var checked = false;
        if ( _.contains(this.state.value, option.payload.toString()) ){
            checked = true;
        }

        return (
            <MaterialCheckbox
                onMouseOver={this._on_mouse_over}
                onMouseOut={this._on_mouse_out}
                style={ style }
                labelStyle={ {width:'auto', maxWidth: '95%'} }
                value={option.payload}
                label={option.text}
                key={i}
                onCheck={this.setValue}
                ref={ref}
                defaultChecked = {checked}
            />
        );

    },

    render: function()
    {
        return (
            <div className="NCheckbox">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                { this.props.schema.fields.map(this.renderCheckbox) }
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        )
    }
});

module.exports = Checkbox;
