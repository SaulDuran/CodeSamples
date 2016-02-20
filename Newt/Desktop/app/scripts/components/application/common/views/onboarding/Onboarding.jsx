var React = require('react');

var ContentView = require('./content/Content.jsx');



var Onboarding = React.createClass({

  propTypes: {
    backgroundImage: React.PropTypes.string.isRequired,
  },

  render: function() {

    var styles = {
      backgroundImage: "url(assets/images/"+ this.props.backgroundImage +")"
    };

    return (
      <div className="onboarding_view">
        <div className="onboarding_view_inner" style={styles}>
          <div className="exp">
            <div>
            {this.props.children}
            </div>
          </div>
          <ContentView>

          </ContentView>
        </div>
      </div>
    );
  }
});

module.exports = Onboarding;
