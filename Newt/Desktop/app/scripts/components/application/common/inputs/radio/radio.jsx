var React = require('react'),
    mui = require('material-ui');
var RadioButtonGroup = mui.RadioButtonGroup,
    RadioButton = mui.RadioButton;

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

//*******************************
//*** React Class
//*******************************
var Radio = React.createClass({
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
            value: this.props.value,
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
            value: newProps.value,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        });
    },

    setValue: function(e)
    {
        this.setState({
           value: e.target.value
        });

        this.props.onChange(e.target.value);
    },

    renderRadioButton: function(option, i)
    {
        style = {float: 'left', width: '100%', marginRight: '30px', display:'inline-block', paddingBottom: '5px'};

    /*    if (this.props.align == 'vertical'){
            style.width = '100%';
        }  */

        return (
            <RadioButton
                style={ style }
                labelStyle={ {width:'auto'} }
                value={option.payload.toString()}
                label={option.text}
                key={i}/>
        );
    },

    render: function()
    {
        return (
            <div className="NRadio">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <RadioButtonGroup name={this.props.schema.key}
                    defaultSelected={this.state.value.toString()}
                    ref="radio_button_group"
                    onChange={this.setValue} >

                    { this.props.schema.fields.map(this.renderRadioButton) }

                </RadioButtonGroup>
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        )
    }
});

module.exports = Radio;
