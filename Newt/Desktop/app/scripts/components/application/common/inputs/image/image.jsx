var React = require('react'),
    mui = require('material-ui');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js')

//*******************************
//*** React Class
//*******************************
var Image = React.createClass({
  mixins: [MuiThemeContextMixin],

  render: function()
  {
    return (
      <div></div>
    );
  }
});

module.exports = Image;
