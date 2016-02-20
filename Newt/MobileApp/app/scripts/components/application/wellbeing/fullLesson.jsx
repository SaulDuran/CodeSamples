'use strict';
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;
var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  TextField = mui.TextField,
  Snackbar = mui.Snackbar,
  Tabs = mui.Tabs,
  Dialog = mui.Dialog,
  Tab = mui.Tab;

var AuthService = require('../../../stores/services/DataService');
var Router = require('react-router');

var Actions = require('../../../actions/actions');
var FullLessonCard= require('../../wellbeing/FullLessonCard/FullLessonCard.jsx');

var FullLesson = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State
  ],
  componentDidMount: function()
  {

  },
  getInitialState: function()
  {
    var url_params = this.getParams();

    return {
      lessonID: url_params.id
    };
  },
  render: function() {

    return (
      <div className="Wellbeing">
      <FullLessonCard lessonID={this.state.lessonID} />
      </div>
    );
  }
});

module.exports = FullLesson;
