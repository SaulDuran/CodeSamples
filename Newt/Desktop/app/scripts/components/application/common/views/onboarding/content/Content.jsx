var React = require('react');


var Content = React.createClass({

  render: function() {

    var styles = {
      position:"absolute",
      zIndex: "10"
    };

    return (
      <div className="onboarding_view_content">
        <div style={styles}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Content;
