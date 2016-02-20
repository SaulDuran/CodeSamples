'use strict';
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  FloatingActionButton = mui.FloatingActionButton,
  Toggle = mui.Toggle,
  Dialog = mui.Dialog,
  Tab = mui.Tab,
  Tabs = mui.Tabs;

var AboutMeModel = require('../../stores/model/AboutMeModel');
var AboutMePage = require('./aboutMe/aboutMePage.jsx');

var AboutMe = React.createClass({
  getInitialState: function()
  {
    return {
      currentIndex: 0,
      items: []
    }
  },
  componentDidMount: function()
  {
    var items = AboutMeModel.getItems().AboutMe;

    if(items && items.length){
      this.setState({
        items: items
      });
    }
  },
  _onTabChange: function(index,tab){
    this.setState({
      currentIndex: index
    });
  },
  render: function() {

    this.tabs = <Tabs onChange={this._onTabChange} currentIndex={this.state.currentIndex}>
            {this.state.items.map(function(page, i){
              return (
                <Tab onActive={this._onActive} route={page.title} label={page.title} >
                  <AboutMePage title={page.title} sections={page.sections} />
                </Tab>
              )
            }, this)}
    </Tabs>;

    var prevButton;
    var nextButton;
    var buttonStyle = {"float": "right"};

    if(this.state.currentIndex > 0){
      prevButton = <RaisedButton onClick={this._previous} label="Previous" secondary={true} />
    }

    if(this.state.currentIndex < this.state.items.length-1){
      nextButton = <RaisedButton style={buttonStyle} onClick={this._next} label="Next" secondary={true} />
    }else{
      nextButton = <RaisedButton style={buttonStyle} onClick={this._goToWelcomePage} label="Go To Welcome Page" secondary={true} />
    }

    return (
      <div className="AboutMe">
        <h1 >AboutMe</h1>
      {this.tabs}
        <div className="pure-g">
          <div className="pure-u-1-3">{prevButton}</div>
          <div className="pure-u-1-3"></div>
          <div className="pure-u-1-3">{nextButton}</div>
        </div>


      </div>
    );
  },
  _onActive: function(tab){
    //this.transitionTo(tab.props.route);
  },
  _goToWelcomePage: function(){
    alert('Oops! There is no welcome page.');
  },
  _next: function(){
    this.setState({
      currentIndex: this.state.currentIndex+1
    });
  },
  _previous: function(){
    this.setState({
      currentIndex: this.state.currentIndex-1
    });
  }
});

module.exports = AboutMe;
