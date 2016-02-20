'use strict';
window.jQuery = window.$ = require('jquery');
window.lodash = window._ = require('lodash');

window.Reflux = require('reflux');
window.React  = require('react/addons');
window.cx     = window.React.addons.classSet;
window.NewtConfig = require('./config');
var attachFastClick = require('fastclick');

window.RouterService = require('./stores/services/RouterService');
var PollingService = require('./stores/services/PollingService');

var Session = require('./utils/session.js');

var injectTapEventPlugin = require("react-tap-event-plugin");

//ENABLE FOR WEBPACK SUPPORT - DISABLE TO USE GULP
require('styles/main.scss')

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


//var viewport_height = $(window).height();
//$("#app_wrapper").height(viewport_height);






var Router = require('./router');
Router.start();


// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
