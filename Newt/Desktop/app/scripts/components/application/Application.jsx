"use strict";
var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Header = require("../common/partials/Header.jsx");

var DetectMobile = require('utils/detect-mobile.js');
var DetectBrowser = require('utils/detect-browser.js');

var Application = React.createClass({

  componentWillMount: function(){
  },
  render: function() {

    var visibility;
    if(!DetectMobile.any()){
       visibility = {"display" :"none"};
    }

    var overflow = {"overflow-y": "hidden", "display": "none"}

    if (DetectBrowser.isIE () && DetectBrowser.isIE () < 11){

          return (

          <div>
            <div id="bg-layer"></div>
            <div className="application">

              <div className="warning-browser" >
                <p >We’re sorry, but your current browser is not supported.<br />
                Please use or download the latest version of<br />
                 <a href="http://www.google.com/chrome" title="Google Chrome">Chrome</a>, <a href="http://www.apple.com/safari/" title="Apple Safari">Safari</a>, <a href="http://www.firefox.com/" title="Mozilla Firefox">Firefox</a> or <a href="http://windows.microsoft.com/ie" title="Microsoft Internet Explorer">Internet Explorer</a> (version 11 or higher).</p>
              </div>

              <div className="container" style={overflow}>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="content">
                      <RouteHandler />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
    else{

     return (
        <div className="application">

          <div className="warning-mobile" style={visibility} >
            <p >We seek to learn a lot about you during the registration process. As such we ask numerous questions which are best answered on a large screen such as a desktop or laptop.<br/><br/>
            Please revisit this link from a larger screen device or contact one of our care specialists at 1-888-639.3181.</p>
          </div>

          <Header />

          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="content">
                  <RouteHandler />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    }
 
  }

});

module.exports = Application;
