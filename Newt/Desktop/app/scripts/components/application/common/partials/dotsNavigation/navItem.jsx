var React = require('react');

var NavItem = React.createClass({

  mixins: [],

  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    itemState: React.PropTypes.string.isRequired,
  },

  getInitialState: function()
  {
    return {
      itemState: this.props.itemState
    }
  },

  componentWillReceiveProps: function(newProps)
  {
    if(newProps && typeof newProps.itemState === "string"){
      this.setState({
        itemState: newProps.itemState
      });
    }
  },

  render: function ()
  {
    iconClasses = 'icon ';

    if ( this.state.itemState === "complete" ){
        iconClasses += 'complete ';
    }

    if ( this.state.itemState === "current" ){
        iconClasses += 'current ';
    }

    return (
      <div className="nav_item">
        <div className={iconClasses} onClick={this.props.onClick}>
        </div>
      </div>
    );
  }

});

module.exports = NavItem;
