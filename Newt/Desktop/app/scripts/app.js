global._ = require('lodash');
global.$ = require('jquery');
global.moment = require('moment');

var Session = require('./utils/session.js');

var RouterService = require('services/RouterService');
var Router = require('./router/Router.jsx');
Router.start();
