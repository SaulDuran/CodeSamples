var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;


var VisibilitySensor = require('react-visibility-sensor');

var AboutMeActivityCard = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || { "img" : "", "copy" : ""},
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
  render: function() {


    var sensorActive,
        animateClassNamesPath,
        animateClassNamesIcon;

    if(this.props.animation){
      sensorActive = true;
      animateClassNamesPath = this.state.animate ? "path animate" : "path";
      animateClassNamesIcon = this.state.animate ? "icon animate" : "icon";
    }else{
      sensorActive = false;
      animateClassNamesPath = "path animate";
      animateClassNamesIcon = "icon animate";
    }

    return (
      <div className="aboutme-section-card">
          <div className="aboutme-section-title activity">
            <h2>Activity</h2>
          </div>
          <div className="aboutme-section-content">
            <div className="aboutme-section-content-blk row activity-container">
              <div className="col-sm-12 activity-content">
                <img className={animateClassNamesIcon} src={this.state.data.icon} alt="" width="100%"/>
                <img className={animateClassNamesPath} src={this.state.data.path} alt="" width="100%"/>
                <img className="activity-bg" src={this.state.data.bg} alt="" width="100%"/>
              </div>
            </div>

            
            <VisibilitySensor onChange={this.checkVisibility}/>
            <div className="aboutme-section-content-blk row activity-text">
              <div className="col-sm-12" dangerouslySetInnerHTML={this.setMarkup()}></div>
            </div>
          </div>
        </div>
    );
  }
});
module.exports = AboutMeActivityCard;