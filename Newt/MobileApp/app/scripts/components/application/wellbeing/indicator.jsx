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
var LessonListItem = require('../../wellbeing/LessonListItem/LessonListItem.jsx');
var Card = require('../../common/card/Card.jsx');
var LessonButton = require('../../wellbeing/LessonButton/LessonButton.jsx');
var WellbeingGraphCard = require('../../wellbeing/WellbeingGraphCard/WellbeingGraphCard.jsx');
var IndicatorCardComponent = require('../../wellbeing/IndicatorCardComponent/IndicatorCardComponent.jsx');

var WellbeingLessons = React.createClass({
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
      indicator: url_params.indicator
    };
  },
  render: function() {

    var padding = {"padding": "0px"};

    return (
      <div className="Wellbeing">
        <div className="pure-u-24-24" style={padding}>
          <IndicatorCardComponent indicator={this.state.indicator} />
        </div>
        <div className="pure-u-24-24" style={padding}>
          <LessonButton indicator={this.state.indicator} />
        </div>
        <div className="pure-u-24-24" style={padding}>
          <WellbeingGraphCard />
        </div>
      </div>
    );
  }
});

module.exports = WellbeingLessons;
