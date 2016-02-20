var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;


var VisibilitySensor = require('react-visibility-sensor');    

var AboutMeHeader = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || { "userAvatarPic" : "", "userName" : ""},
      animate: false
    };
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      'data': newProps.data
    });
  },
  checkVisibility: function(isVisible){
     //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
     
     this.setState({
         animate: isVisible ? true : false
    })
  },

  render: function() {
    
    var avatarPic = {"backgroundImage": "url('"+this.props.data.userAvatarPic+"')"};

    var sensorActive,
        animateClassNames;

    if(this.props.animation){
      sensorActive = true;
      animateClassNames = this.state.animate ? "aboutme-user-avatar animate" : "aboutme-user-avatar";
    }else{
      sensorActive = false;
      animateClassNames = "aboutme-user-avatar animate";
    }

    return (
      <div className="aboutme-header">
        <div className="aboutme-title row">
          <VisibilitySensor onChange={this.checkVisibility}/>
          <div className="col-sm-2">
            <div className={animateClassNames} style={avatarPic}></div>
          </div>
          <div className="col-sm-10">
            <h1>About me</h1>
          </div>
        </div>
        <div className="aboutme-insights row">
          <div className="col-sm-12">Insights about {this.props.data.userName}</div>
        </div>
        <div className="aboutme-intro row">
          <div className="col-sm-12">
            This is the start of your personalized journey to living a healthier life style.<br /> Below is what we know about you so far.
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AboutMeHeader;
