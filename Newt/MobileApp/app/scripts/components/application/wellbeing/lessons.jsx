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

var Actions = require('../../../actions/actions');
var LessonListItem = require('../../wellbeing/LessonListItem/LessonListItem.jsx');
var Card = require('../../common/card/Card.jsx');
var LessonList = require('../../wellbeing/LessonList/LessonList.jsx');
var LessonListTabs = require('../../wellbeing/LessonListTabs/LessonListTabs.jsx');
var LessonListCard = require('../../wellbeing/LessonListCard/LessonListCard.jsx');

var WellbeingLessons = React.createClass({
  mixins: [
    Navigation
  ],
  componentDidMount: function()
  {

  },
  getInitialState: function()
  {
    return {
      lessons: [{
        name: "Lesson 1",
        favorite: false,
        short_description: "this is a blurb about a lesson lasting only a few characters"
      },{
        name: "Lesson 2",
        favorite: false,
        short_description: "this is a blurb about a lesson lasting only a few characters"
      },{
        name: "Lesson 3",
        favorite: false,
        short_description: "this is a blurb about a lesson lasting only a few characters"
      }]
    };
  },
  render: function() {

    return (
      <div className="Wellbeing">
        <LessonListCard indicator={"sleep"} />
      </div>
    );
  }
});

module.exports = WellbeingLessons;


