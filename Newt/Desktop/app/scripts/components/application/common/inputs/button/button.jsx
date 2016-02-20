var React = require('react');


//*******************************
//*** React Class
//*******************************
var Button = React.createClass({

    propTypes:
    {
        disabled: React.PropTypes.bool,
        label: React.PropTypes.string,
        primary: React.PropTypes.bool
    },

    getInitialState: function()
    {
        return null;
    },

    _onClick: function()
    {
        this.props.onClick();
    },

    render: function()
    {
        var disabled = ' ';
        var classes = 'NButton ';

        if (this.props.disabled){
            disabled = ' disabled ';
            classes += ' disabled ';
        }

        if (this.props.primary){
            classes += ' primary ';
        }

        return (
            <button {...this.props} className={classes} >{this.props.label}</button>
        );
    }
});

module.exports = Button;
