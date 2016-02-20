var React = require('react'),
    mui = require('material-ui');

var injectTapEventPlugin = require("react-tap-event-plugin");

var DropDownMenu = mui.DropDownMenu;

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

React.initializeTouchEvents(true);

injectTapEventPlugin();

//*******************************
//*** React Class
//*******************************
var Dropdown = React.createClass({
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
            value: newProps.value,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText
        });
    },

    setValue: function(e){

        this.setState({
            "value": e.target.value
        });

        this.props.onChange(e.target.value);
    },

    _getIdxFromPayload: function (payload) {

        return _.findIndex(this.props.schema.fields, function(menuItem) {
            return 	menuItem.payload == payload;
        });
    },

    render : function(){

        var selectedIdx = '';

        if ( this.state.value !== null && this.state.value !== '' ) {
            selectedIdx = this._getIdxFromPayload(this.state.value);
        }

        var underlineStyle = { margin: 0 };
        var labelStyle = { paddingLeft: 0, lineHeight: '46px' }        ;
        var style = { width: '100%', height: '39px' };

        return(
            <div className="NDropdown">
                <div className="label">
                    <label>{this.props.schema.text}</label>
                </div>
                <div className="microcopy" dangerouslySetInnerHTML={{__html: this.props.schema.options.microcopy}} />
                <div className="input-error">{this.state.beforeErrorText}</div>
                <DropDownMenu iconStyle={{fill: '#068d9d', top: '10px'}} style={style} underlineStyle={underlineStyle} labelStyle={labelStyle} selectedIndex={selectedIdx} menuItems={this.props.schema.fields} onChange={this.setValue} />
                <div className="input-error">{this.state.afterErrorText}</div>
            </div>
        );
    }
});

module.exports = Dropdown;
