var Router = require('./RouterStore.js');
var RouterContainer = require('./RouterContainer.js');
var React = require('react');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = require('./Routes.js');

var actions = require('../actions/actions');

exports.start = function() {
  RouterContainer.set(Router);

  Router.run(function (Handler) {
    //console.log("RUNNING...", window.location.hash);
    //actions.routerRouteChange({hash: window.location.hash});
    React.render(<Handler />, document.getElementById('app_container'));
  });
};
