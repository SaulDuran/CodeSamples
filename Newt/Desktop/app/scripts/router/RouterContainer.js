// https://github.com/rackt/react-router/blob/master/docs/guides/flux.md#handling-route-changes-as-actions
var _router = null;

exports.set = function (router) {
  _router = router;
};

exports.get = function () {
  return _router;
};
