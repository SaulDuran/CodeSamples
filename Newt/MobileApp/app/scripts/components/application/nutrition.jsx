//'use strict';
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;
var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  TextField = mui.TextField,
  Snackbar = mui.Snackbar,
  Tabs = mui.Tabs,
  Dialog = mui.Dialog,
  Tab = mui.Tab;

var moment = require('moment');

var AuthService = require('../../stores/services/DataService');
var SelectMealCardTable = require('../nutrition/SelectMealCardTable/SelectMealCardTable.jsx');
var LikertWaterScale = require('../nutrition/LikertWaterScale/LikertWaterScale');
//var DatePicker = require('../common/DatePicker.jsx');
var RadialGraph = require('../common/CircleProgress/CircleProgress.jsx');
var Card = require('../common/card/Card.jsx');
var CardButtonBar = require('../common/CardButtonBar/CardButtonBar.jsx');
var DataSeries = require('../common/Graph/components/DataSeries.jsx');

var DatePickerBar = require('../common/DatePickerBar/DatePickerBar.jsx');
var DateTime = require('../../../../node_modules/material-ui/lib/js/utils/date-time');

var Graph = require('../common/Graph/Graph.jsx');
var CircleProgress = require('../common/CircleProgress/CircleProgress.jsx');

var GeneticOverlay = require('../nutrition/GeneticOverlay/GeneticOverlay.jsx');

var Actions = require('../../actions/actions');
var NutritionStore = require('../../stores/model/NutritionStore');


var Nutrition = React.createClass({
  mixins: [
    Navigation,
    Reflux.listenTo(Actions.showWater, "_onShowWater"),
    Reflux.listenTo(NutritionStore, "_onNutritionStoreChange")
  ],

  _onNutritionStoreChange: function(store_event) {

    console.log(store_event);

    switch (store_event.name) {
      case 'change:date':
	console.log("CHANGED DATE");
	
        this.setState({
	      date: NutritionStore.getSelectedDate()
                });

        break;
      case 'change:water_quantity':
        this.setState({
          waterTotal: NutritionStore.getWaterQuantity(),
        });
        break;
      case 'change:fetch_records':
        this.setState({
          foodRecords: NutritionStore.getFoodRecords(),
                });
        break;
      case 'change:food_aggregate':
        this.setState({
          nutritionAggregate: NutritionStore.getNutritionAggregate()
        });



        break;
      default:
        break;
    }

    //this.refs.date_picker_bar.setDate(NutritionStore.getSelectedDate());

  },

  componentWillMount: function()
  {
    //Actions.setDateNutrition(moment());
  },

  componentDidMount: function() {
    Actions.scrollToTop();
  },

  getInitialState: function() {
    return {
      foodRecords: NutritionStore.getFoodRecords(),
      caloriesGoal: NutritionStore.getCaloriesGoal(),
      calorieTotal: NutritionStore.getCaloriesConsumed(),
      waterGoal: NutritionStore.getWaterGoal(),
      waterTotal: NutritionStore.getWaterQuantity(),
      nutritionAggregate: NutritionStore.getNutritionAggregate(),
      mealAndWaterStatus: NutritionStore.getDailyMealAndWaterStatus()
    };
  },



  _onShowWater: function() {
    this.refs.addWater.show();
  },

  _onSaveWater: function(value) {
    this.refs.addWater.dismiss();

    Actions.saveWaterQuantity({
      "quantity": value
    });
  },

  _formatDate: function(date) {
    return DateTime.format(date);
  },

  _prevDate: function(prevDate) {
    console.log("nutrition.jsx _prevDate() : ", prevDate)
    Actions.setDateNutrition(prevDate);
  },

  _nextDate: function(nextDate) {
    console.log("nutrition.jsx _nextDate() : ", nextDate)
    Actions.setDateNutrition(nextDate);
  },

  _onchange_date_picker: function(_null, date) {
    console.log("nutrition.jsx _onchange_date_picker() : ", date)

    Actions.setDateNutrition(date);
  },

  _gotoAddFood: function() {
    Actions.transitionTo({
      route: "nutrition_selectMeal"
    });
  },
  _gotoFoodHistory: function() {
    Actions.transitionTo({
      route: "nutrition_foodHistory"
    });
  },

  render: function() {

    var data = {
     	foodRecords: NutritionStore.getFoodRecords(),
          mealAndWaterStatus: NutritionStore.getDailyMealAndWaterStatus(),
          calorieTotal: NutritionStore.getCaloriesConsumed(),
          waterTotal: NutritionStore.getWaterQuantity(),
          nutritionAggregate: NutritionStore.getNutritionAggregate(),
          caloriesGoal: NutritionStore.getCaloriesGoal(),
	};
    var circle_graph_buttons = [
      {
        key: '0',
        label: 'add water',
        action: this._onShowWater,
        primary: false
      },
      {
        key: '1',
        label: 'add food',
        action: this._gotoAddFood,
        primary: false
      }
    ];

    var history_buttons = [
      {
        key: '0',
        label: 'view history list',
        action: this._gotoAddFood
      }
    ];

    var graph_buttons = [
      {
        key: '0',
        label: 'view history',
        action: this._gotoFoodHistory,
        primary: false
      }
    ];

    var waterActions = [
      {
        key: '0',
        label: 'add water',
        action: this._onSaveWater,
        primary: false
      }
    ];


    var circleProgressData = {
      graphParams: {
        graphID: "budgetGraph",
        radius: 50,
        borderWidth: 2,
        duration: 750,
        tick: 50,
        background: "#d3d3d3",
        caloriesConsumed: data.calorieTotal,
        caloriesBudget: data.caloriesGoal
      },
      graphSlices: [
        [50, "#05a048"],
        [25, "#f80008"]
      ]
    };

    var chart_data = {
      values: data.nutritionAggregate,
      limit: data.caloriesGoal
    };

    return (
      <div className="Nutrition">
        <div className="nutritionDatePicker">
          <DatePickerBar onChange={this._onchange_datepickerbar}
                         ref="date_picker_bar"
                         autoOk={true}
                         maxDate={new Date()}
                         defaultDate={NutritionStore.getSelectedDate().toDate()}
                         formatDate={this._formatDate}
                         onPrevDate={this._prevDate}
                         onNextDate={this._nextDate}
                         onChange={this._onchange_date_picker}/>
        </div>
        <div className="pure-g nutrition-content">
          <div className="pure-u-24-24">
            <div className="pure-u-1 pure-u-lg-1-2">
              <SelectMealCardTable mealAndWaterStatus={data.mealAndWaterStatus}></SelectMealCardTable>
            </div>
            <div className="pure-u-1 pure-u-lg-1-2">
              <Card header={ "My Progress Today"} buttons={circle_graph_buttons}>
                <CircleProgress data={circleProgressData} />
              </Card>

            </div>
            <div className="pure-u-24-24">              
              <GeneticOverlay text="How can exploring your genetics speed up weight loss? Complete your test and find out!"/>
            </div>
            <div className="pure-u-24-24">
              <Card header={ "Calories Consumed"} buttons={graph_buttons}>
                <Graph width="300" height="200" data={chart_data} />
              </Card>
              <div className="waterPopup">
                <Dialog ref="addWater" actions={waterActions}>
                  <Card  header={ "How much water did you drink?"}>
                    <div className="add-water-dialog pure-u-24-24">
                      <LikertWaterScale ref="likertWaterScale" onSave={this._onSaveWater} initialValue={data.waterTotal} total={data.waterGoal} />
                    </div>
                  </Card>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
});

module.exports = Nutrition;
