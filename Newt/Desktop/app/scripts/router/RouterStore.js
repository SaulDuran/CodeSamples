//https://github.com/rackt/react-router/blob/master/docs/guides/flux.md#handling-route-changes-as-actions
// router.js
// The trick is to assign module.exports before any require()s
var React = require('react');
var Router = require('react-router');
var routes = require('./Routes');

var router;

module.exports = {
  makePath: function (to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref: function (to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo: function (to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith: function (to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack: function () {
    router.goBack();
  },

  run: function (render) {
    router.run(render);
  }
};

// By the time route config is require()-d,
// require('./router') already returns a valid object
router = Router.create({
  routes: routes
  //location: Router.HistoryLocation
});
