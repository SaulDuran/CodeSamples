var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;

var VisibilitySensor = require('react-visibility-sensor');   

var AboutMeHealthCard = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || { "imgBased" : "", "copy" : "", "imgEmotion" : ""},
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
        animateClassNames;

    if(this.props.animation){
      sensorActive = true;
      animateClassNames = this.state.animate ? "col-sm-4 emotion-badge-container animate" : "col-sm-4 emotion-badge-container";
    }else{
      sensorActive = false;
      animateClassNames = "col-sm-4 emotion-badge-container animate";
    }


    return (
      <div className="aboutme-section-card aboutme-section-card-first">
        <div className="aboutme-section-title health-personality">
          <h2>Health Personality</h2>
        </div>

        <div className="aboutme-section-content emotion">
          <div className="aboutme-section-content-blk row">

            <div className={animateClassNames}>
              <div className="emotion-badge">
                <div className="front face">
                  <img src={this.state.data.imgBack} alt="" width="100%"/>
                </div>
                <div className="back face">
                  <img src={this.state.data.imgBased} alt="" width="100%"/>
                </div>
              </div>
            </div>

            <div className="col-sm-8" dangerouslySetInnerHTML={this.setMarkup()}></div>
          </div>
          
        <VisibilitySensor onChange={this.checkVisibility}/>
          <div className="aboutme-section-content-blk row">
            <div className="col-sm-12">
              <img src={this.state.data.imgEmotion} alt="" width="100%"/>
            </div>
          </div>
        </div>


      </div>
    );
  }
});
module.exports = AboutMeHealthCard;