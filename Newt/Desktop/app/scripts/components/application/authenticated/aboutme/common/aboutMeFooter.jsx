var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;


var AboutMeFooter = React.createClass({
  render: function() {
    return (
      <div className="aboutme-footer">
        <div className="row">
          <div className="col-sm-12">
            <img src="assets/images/svg/newtopia-logo.svg" className="logo" alt="" width="100%"/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AboutMeFooter;
