var React = require('react');
var Reflux = require('reflux');


var Navigation    = require('react-router').Navigation;

var NtpButton = require('../../../../components/common/inputs/ntpButton/ntpButton.jsx');
var MuiThemeContextMixin = require('../../../../components/mixins/MuiThemeContextMixin.js');

var mui = require('material-ui'),
    RadioButtonGroup = mui.RadioButtonGroup,
    RadioButton = mui.RadioButton;


var CheckboxGroup = require('react-checkbox-group');
var Checkbox = mui.Checkbox;

var VisibilitySensor = require('react-visibility-sensor'); 
var actions = require('../../../../actions/actions');


var AboutMeGeneticCard = React.createClass({
  mixins: [
    MuiThemeContextMixin
  ],


  getInitialState: function () {
    return {
      data: this.props.data || { "img" : "" },
      days: '',
      time: '',
      animate: false
    };
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      'data': newProps.data,
    });
  },
  on_change_days: function(evt, selected){
    // console.log("RadioButtonGroup --- onChange() ---selected: ", selected);
    // this.setState({
    //   'days' : selected
    // });

    this.setState({
      'days' : this.refs.bookDays.getCheckedValues()
    });

  },
  on_change_time: function(evt, selected){

    this.setState({
    	'time' : this.refs.bookTime.getCheckedValues()
    });
  },
  _schedule: function(evt, selected){
    actions.requestWelcomeCall({"days": this.state.days, "time": this.state.time, "tz" : new Date().getTimezoneOffset()});
  },

  checkVisibility: function(isVisible){
     //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
     
     this.setState({
         animate: isVisible ? true : false
    })
  },  
  render: function() {

    var sensorActive,
        animateClassNames;

    if(this.props.animation){
      sensorActive = true;
      animateClassNames = this.state.animate ? "dna animate" : "dna";
    }else{
      sensorActive = false;
      animateClassNames = "dna animate";
    }


    return (
      <div className="aboutme-section-card">
        <div className="aboutme-section-title genetic">
          <h2>What&#39;s your genetic color? </h2>
        </div>
        <div className="aboutme-section-content aboutme-nopadding">
          <div className="aboutme-section-content-blk aboutme-padding row">
            <div className="col-sm-12">
              We now know your likes and dislikes, but there is more... Schedule the delivery your genetic test today by booking a welcome call.
            </div>
          </div>
          
          <div className="aboutme-section-content-blk">
            <div className="row">
              <div className="col-sm-12 genetic-container">
                <img className= {animateClassNames} src={this.state.data.dna} alt="" width="100%"/>
                <img className="genetic-bg" src={this.state.data.bg} alt="" width="100%"/>
              </div>
            </div>
                <VisibilitySensor onChange={this.checkVisibility} active={sensorActive}/>

            <div className="row">
              <div className="col-sm-12">
                <div className="aboutme-nextstep">
                  <h2>Next step!</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="aboutme-section-content-blk aboutme-padding row">
            <div className="col-sm-12 txt-book-call">
              To book your 20 minute welcome call choose a day and time that is convenient for you.
            </div>
          </div>






          <div className="aboutme-padding row">
            <div className="col-sm-12 aboutme-sday-container">
              <CheckboxGroup
                name="aboutme-book-days"
                value={this.state.time}
                ref="bookDays"
                onChange={this.on_change_days}
              >
                <div>
                    <Checkbox
                      value="monday"
                      key="1"
                      className="checkbox"
                      label="Monday"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                    <Checkbox
                      value="tuesday"
                      key="2"
                      className="checkbox"
                      label="Tuesday"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>
                 
                    <Checkbox
                      value="wednesday"
                      key="3"
                      className="checkbox"
                      label="Wednesday"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                    <Checkbox
                      value="thursday"
                      key="4"
                      className="checkbox"
                      label="Thursday"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>


                    <Checkbox
                      value="friday"
                      key="5"
                      className="checkbox"
                      label="Friday"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                </div>
              </CheckboxGroup>
            </div>
          </div>








          <div className="aboutme-padding row">
            <div className="col-sm-12 aboutme-stime-container">

              <CheckboxGroup
                name="aboutme-book-time"
                value={this.state.time}
                ref="bookTime"
                onChange={this.on_change_time}
              >
                <div>
                    <Checkbox
                      value="8-10am"
                      key="1"
                      className="checkbox"
                      label="8:00 - 10:00 am"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                    <Checkbox
                      value="10-12am"
                      key="2"
                      className="checkbox"
                      label="10:00 - 12:00 am"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>
                 
                    <Checkbox
                      value="12-2pm"
                      key="3"
                      className="checkbox"
                      label="12:00 - 2:00 pm"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                    <Checkbox
                      value="2-4pm"
                      key="4"
                      className="checkbox"
                      label="2:00 - 4:00 pm"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>


                    <Checkbox
                      value="4-6pm"
                      key="5"
                      className="checkbox"
                      label="4:00 - 6:00 pm"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>

                    <Checkbox
                      value="6-8pm"
                      key="6"
                      className="checkbox"
                      label="6:00 - 8:00 pm"
                      iconStyle={{
                        fill: 'rgb(140, 195, 73)'
                      }}/>
                </div>
              </CheckboxGroup>
            </div>
          </div>

          <div className="aboutme-padding row">
            <div className="col-sm-12 aboutme-stime-container">
              <div className="lc-row">
                <NtpButton className="aboutme-schedule-button dmr" primary={true} text="Schedule welcome call" onClick={this._schedule} />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
});
module.exports = AboutMeGeneticCard;


//<NtpButton className="aboutme-schedule-button dmr" primary={true} text="Schedule welcome call" onClick={this._schedule} />
