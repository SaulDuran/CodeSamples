var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;

var VisibilitySensor = require('react-visibility-sensor');

var AboutMeNutritionCard = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || { "moodIndex" : "",
                                 "sleepIndex" : "", 
                                 "energyIndex" : "", 
                                 "stressIndex" : "", 
                                 "anxietyIndex" : "", 
                                 "greenGraph" : "", 
                                 "blueGraph" : "",
                                 "copy" : ""},
      animate: false
    };
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      'data': newProps.data,
    });
  },
  setMarkup: function () {
    return { __html: this.state.data.copy };
  },

  checkVisibility: function(isVisible){
     //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
     this.setState({
         animate: isVisible ? true : false
    })
  },


  displayImages: function(wellbeingIndex, graphColor){

    var sensorActive,
        animateClassNames;



    if(this.props.animation){
      sensorActive = true;
      animateClassNames = this.state.animate ? "animate" : "";
    }else{
      sensorActive = false;
      animateClassNames = "animate";
    }

      var i = -1;

      return (
        <div className="aboutme-wellbeing-graph">
          {
            graphColor.map(function(graph) {
              
              while(i < wellbeingIndex){
                  i++;
                  return <img className={animateClassNames} src={graphColor[i%(wellbeingIndex+1)]} alt="" width="100%"/>
              }
            })
          }
        </div>
      );


  },



  render: function() {
    
    var graphColorGreen = this.state.data.greenGraph;
    var graphColorBlue = this.state.data.blueGraph;

    return (
      <div className="aboutme-section-card">
        <div className="aboutme-section-title wellbeing">
          <h2>Wellbeing</h2>
        </div>
        <div className="aboutme-section-content">
          <div className="aboutme-section-content-blk row">
            <div className="col-sm-12">
              Your well-being is a combination of mood, anxiety, stress, energy and sleep quality. When one of this is low, it can impact your overall health. Below is an example of which well-being indicator may be influencing your overall healt.
            </div>
          </div>
          <div className="aboutme-section-content-blk aboutme-wellbeing-graph-container row">


            <div className="graph">
                {this.displayImages(this.state.data.moodIndex, graphColorGreen)}  
              <div className="aboutme-wellbeing-graph-title"><h2>Mood</h2></div>
            </div>

            <div className="graph">
                {this.displayImages(this.state.data.sleepIndex, graphColorBlue)}  
              <div className="aboutme-wellbeing-graph-title"><h2>Sleep</h2></div>
            </div>
            <div className="graph">
                {this.displayImages(this.state.data.energyIndex, graphColorGreen)}  
              <div className="aboutme-wellbeing-graph-title"><h2>Energy</h2></div>
            </div>
            <div className="graph">
                {this.displayImages(this.state.data.stressIndex, graphColorBlue)}  
              <div className="aboutme-wellbeing-graph-title"><h2>Stress</h2></div>
            </div>
            <div className="graph">
                {this.displayImages(this.state.data.anxietyIndex, graphColorGreen)}  
              <div className="aboutme-wellbeing-graph-title"><h2>Anxiety</h2></div>
            </div>
          </div>

          <VisibilitySensor onChange={this.checkVisibility}/>

          <div className="aboutme-section-content-blk row">
            <div className="col-sm-12" style={{"paddingBottom" : "15px"}} dangerouslySetInnerHTML={this.setMarkup()}></div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = AboutMeNutritionCard;