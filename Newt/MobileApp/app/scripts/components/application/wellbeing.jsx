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

//var AuthService = require('../../stores/services/DataService');

var Actions = require('../../actions/actions');
var WellbeingStore = require('../../stores/model/WellbeingStore');
var LessonListItem = require('../wellbeing/LessonListItem/LessonListItem.jsx');
var Card = require('../common/card/Card.jsx');
var LessonList = require('../wellbeing/LessonList/LessonList.jsx');
var LessonListTabs = require('../wellbeing/LessonListTabs/LessonListTabs.jsx');
var LessonListCard = require('../wellbeing/LessonListCard/LessonListCard.jsx');

var WellbeingChip = require('../wellbeing/WellbeingChip/WellbeingChip.jsx');

var WellbeingLandingPage = require('../wellbeing/WellbeingLandingPage/WellbeingLandingPage.jsx');

var WellbeingSettingsDialog = require('../wellbeing/WellbeingSettingsDialog/WellbeingSettingsDialog.jsx');


var Wellbeing = React.createClass({

  mixins: [
    Navigation,
    Reflux.listenTo(WellbeingStore, "_onWellbeingStoreChange")
  ],

  componentDidMount: function()
  {
    Actions.fetchWellbeingLessons();
    Actions.scrollToTop();
    if(WellbeingStore.isUserFirstVisit()){
      Actions.transitionToWellbeingWelcomePage();
    }
  },

  getInitialState: function()
  {
    return {
      first_visit: WellbeingStore.isUserFirstVisit()
    };
  },

  _onWellbeingStoreChange: function(store_event)
  {
    this.setState({
      first_visit: WellbeingStore.isUserFirstVisit()
    });
  },

  render: function()
  {
    var rendered = this.state.first_visit ? null : <WellbeingLandingPage />;
    return (
      <div className="Wellbeing no-datepicker">
        {rendered}
      </div>
    );
  }

});

module.exports = Wellbeing;
