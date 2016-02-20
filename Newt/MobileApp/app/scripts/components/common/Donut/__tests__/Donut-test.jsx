jest.autoMockOff();

/**************************************
 * Donut component test
 * Auto-Generated on Wed Apr 08 2015
 **************************************/


describe('CircleProgress', function() {
    window.Reflux = require('reflux');
    window.React = require('react');
    window.jQuery = window.$ = require('jquery');
    window.lodash = window._ = require('lodash');
    window.d3 = require("d3");
    window.c3 = require("c3");
    $.support.cors = true;

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    /****************************
     * IMPORT YOUR MODULES HERE *
     ****************************/
    var Donut = require('../Donut.jsx');


    /****************************
     * DESCRIBE ASSERTIONS HERE *
     ****************************/
    it('Donut Render', function() {
        var donutComponent = TestUtils.renderIntoDocument(<Donut percentage={45} bottomLabel={"Cacium"} />);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(donutComponent, "donut").length).toBeGreaterThan(0);
        var divBottomLabel = TestUtils.findRenderedDOMComponentWithClass(donutComponent, "bottomLabel");
        expect(divBottomLabel.getDOMNode().textContent).toEqual('Cacium');
    });
});
