'use strict';
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  FloatingActionButton = mui.FloatingActionButton,
  Toggle = mui.Toggle,
  Dialog = mui.Dialog;

var actions = require('../../actions/actions');



var Home = React.createClass({

  mixins: [
    Navigation
  ],

  on_click_logout: function (evt) {
    actions.logout();
  },

  on_click_nutrition_addmeal: function (evt) {
    //this.refs.dialog.show();
    window.location.hash = "/app/nutrition/selectMeal";
  },

  on_click_header: function (evt) {
    actions.setHeaderTitle("HOME PAGE");
  },

  on_click_data: function (evt)
  {
    actions.requestData({
      channel: "DASHBOARD",
      topic: "data",
      callback: this.processData
    })
  },

  processData: function(data, envelope)
  {


  },

  _onDialogSubmit: function()
  {

  },


  onAuthStateChange: function()
  {

  },

  render: function() {

    var styles = {
      //"width":"500px"
    };

    var info_btn_styles = {
      "margin-left":"10px"
    };

    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    return (
      <div className="hero-unit" style={styles}>
        <h1>User Homepage</h1>

        <RaisedButton label="Logout"
                      onClick={this.on_click_logout} />

        <span style={info_btn_styles}></span>

        <RaisedButton label="Add Meal"
                      secondary={true}
                      onClick={this.on_click_nutrition_addmeal} />

      </div>
    );
  }
});

module.exports = Home;
