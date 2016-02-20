var React = require('react'),
    mui = require('material-ui');


var Checkbox = mui.Checkbox;

var AnswerStore = require('stores/Answers');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

//*******************************
//*** React Class
//*******************************
var Agreement = React.createClass({
  mixins: [MuiThemeContextMixin],

    propTypes: {
        valid: React.PropTypes.bool,
        error: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
    },

    componentDidMount: function()
    {
      var that = this;

      var ref = 'aggrText-' + this.props.schema.id;

      if ( $(this.refs[ref].getDOMNode()).innerHeight() >= $(this.refs[ref].getDOMNode())[0].scrollHeight ){
          that.setState({
              disabled: false
          });
      }

      $(this.refs[ref].getDOMNode()).scroll( function(){

          if ($(this).scrollTop() >= $(this)[0].scrollHeight - $(this).innerHeight()) {

              that.setState({
                  disabled: false
              });
          }

      });
    },

    getInitialState: function()
    {

        var fname = AnswerStore.getAnswerByQuestionKey('registration.FirstName');
        var lname = AnswerStore.getAnswerByQuestionKey('registration.LastName');

        var name = '';

        if ( fname && lname ){
            name = fname.value + ' ' + lname.value;
        }

        var beforeErrorText = '';
        var afterErrorText = '';
        if ( this.props.valid == false ){
            if (this.props.error.position == 'before'){
                beforeErrorText = this.props.error.message;
            }else{
                afterErrorText = this.props.error.message;
            }
        }

        var value = false;
        var disabled = true;
        if( this.props.value.length > 0  ){
            value = true;
            disabled = false;
        }

        return {
            value: value,
            beforeErrorText: beforeErrorText,
            afterErrorText: afterErrorText,
            disabled: disabled,
            name: name
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

    _handleCheck: function(){

        if ( this.state.disabled === true ){
            return false;
        }

	var content = this.props.schema.options.placeholder;
	var str2 = decodeURIComponent(escape(window.atob(content)));
	var textContent = $('<div />').html(str2).text();

        var text = textContent + '\r\n' + 'Participant name: ' + this.state.name + '\r\n' + moment().format('MMM D, YYYY');

        if (this.state.value === true){
          this.setState({
              value: false
          });
          this.props.onChange("");
        }else{
          this.setState({
              value: true
          });
          this.props.onChange(text);
        }
    },

    render: function()
    {
        var date =  moment().format('MMM D, YYYY');

        var checkBoxStyles = {color:'auto', width: 'auto', float: 'left'};
        var labelStyles = {color:'auto', cursor: 'pointer'};

        var checkboxClass = '';
        if ( this.state.disabled ){
            checkBoxStyles.color = '#ccc';
            labelStyles.color = '#ccc';
            checkboxClass =  "disabled";
        }else{
            delete checkBoxStyles.color;
            delete labelStyles.color;
        }
	var content = this.props.schema.options.placeholder;
        
	var createMarkup = function() { 
		
	var str2 = decodeURIComponent(escape(window.atob(content)));
			return { __html : str2 };
	  };

    var ref = 'aggrText-' + this.props.schema.id;

        return (
          <div className="NAgreement">
              <span className="microcopy">You must read (scroll) this entire agreement before you can click ‘I agree’.</span>
              <div className="input-error">{this.state.beforeErrorText}</div>
              <div ref={ref} className="agreement-text">
                  <div dangerouslySetInnerHTML={createMarkup()} />
                  <span className="participant">
                    <br />
                    Participant Name: {this.state.name}
                    <br />
                    Date: {date}
                  </span>
              </div>
              <Checkbox
                  className={checkboxClass}
                  style={checkBoxStyles}
                  name={this.props.schema.key}
                  onCheck={this._handleCheck}
                  value={this.state.value}
                  defaultChecked={this.state.value}
                  ref="checkbox"
                  disabled={this.state.disabled}
              />
              <label style={labelStyles} onClick={this._handleCheck} htmlFor={this.props.schema.key} dangerouslySetInnerHTML={{__html: this.props.schema.text}} ></label>
              <div className="input-error">{this.state.afterErrorText}</div>
          </div>
        );
    }
});

module.exports = Agreement;
