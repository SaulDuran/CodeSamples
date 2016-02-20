var React = require('react');
//var Router = require('react-router');
//var RouteHandler = Router.RouteHandler;

var Transition = React.createClass({

  render: function() {

    return (
      <div className="transition">
        <div style={{width:"100%", height: "300px"}}>
            <h1>Transition Page</h1>
            <h3>This is a transition page...</h3>
          </div>
      </div>
    );
  }
});

module.exports = Transition;
