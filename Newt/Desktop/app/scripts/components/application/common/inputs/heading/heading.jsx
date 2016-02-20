var React = require('react'),
    mui = require('material-ui');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js')

//*******************************
//*** React Class
//*******************************
var Heading = React.createClass({
  mixins: [MuiThemeContextMixin],

  propTypes: {
    value: React.PropTypes.string
  },

  render: function()
  {
    return (
      <div className="label NHeading">
        <label>{this.props.schema.text}</label>
      </div>
    );
  }
});

module.exports = Heading;
