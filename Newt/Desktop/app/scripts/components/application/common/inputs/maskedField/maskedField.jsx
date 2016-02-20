var React = require('react'),
    mui = require('material-ui');

var TextField = mui.TextField;

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

require('jquery.inputmask');


//*******************************
//*** React Class
//*******************************
var MaskedField = React.createClass({
  mixins: [MuiThemeContextMixin],

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
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
            afterErrorText: afterErrorText
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

    setValue: function(e)
    {
      this.setState({
          "value": e.target.value
      });
    },

    componentDidMount: function()
    {
        var textField = $(this.refs.InputRef.getDOMNode());
        var input = textField.find("input");

        input.inputmask({
            mask: this.props.schema.options.mask,
            showMaskOnHover: false
        });
    },

    componentWillUnmount: function()
    {
        var node = this.refs.InputRef.getDOMNode();
        React.unmountComponentAtNode(node);
    },

    onBlur: function(e)
    {
        this.props.onChange(e.target.value);

        this.setState({
            "value": e.target.value
        });
    },

    render: function()
    {
        return (
            <div className="nTextField">
                <div className="label">
                    <label htmlFor={this.props.schema.key} >{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <TextField
                    fullWidth={true}
                    name={this.props.schema.key}
                    type="text"
                    value={this.state.value}
                    onChange={this.setValue}
                    onBlur={this.onBlur}
                    ref="InputRef"
                    placeholder={this.props.schema.options.placeholder}
                />
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        );
    }
});

module.exports = MaskedField;
