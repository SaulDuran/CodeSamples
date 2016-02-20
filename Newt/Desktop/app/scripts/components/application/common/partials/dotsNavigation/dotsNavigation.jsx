var React = require('react');

var actions = require('actions/actions');

var NavItem = require('./navItem.jsx');

var Router = require('react-router');

var RouterNavigation = Router.Navigation;

var AnswerStore = require('stores/Answers');

var Navigation = React.createClass({

    mixins: [
        RouterNavigation
    ],

    propTypes: {
        section: React.PropTypes.string.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        pageCount: React.PropTypes.number.isRequired,
    },

    getInitialState: function()
    {
        var navItems = this._generateNavItems(this.props.currentPage, this.props.pageCount);
        return {
            navItems: navItems
        }
    },

    componentWillReceiveProps: function(newProps)
    {
        if(newProps && newProps.currentPage && newProps.pageCount){
            var navItems = this._generateNavItems(newProps.currentPage, newProps.pageCount);
            this.setState({navItems: navItems});
        }
    },


    _generateNavItems: function(currentPage, pageCount)
    {
        var navItems = [];

        for(var i=0; i<pageCount; ++i){

            var itemState = "";

            if(i < (currentPage - 1)){
                itemState = "complete";
            } else if(i == (currentPage - 1)){
                itemState = "current";
            } else {
                itemState = "";
            }

            navItems.push({
                itemState: itemState,
                onClick: this._navItemClicked.bind(this, i)
            });
        }

        return navItems;
    },


    _navItemClicked: function(page)
    {
        this.transitionTo(this.props.section, { 'page': page });
        actions.checkValidPage(this.props.section, page-1);
    },

    _renderNavItem: function(navItem, i)
    {
        return (
            <NavItem itemState={navItem.itemState}
                onClick={this._navItemClicked.bind(this, (i+1))} />
        )
    },

    render: function ()
    {
        return (
            <div className="newt_nav">
                {this.state.navItems.map(this._renderNavItem)}
            </div>
        );
    }

});

module.exports = Navigation;