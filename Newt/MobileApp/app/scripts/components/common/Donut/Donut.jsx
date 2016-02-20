/*******************************************************************
 * CircleProgress
 * -> Generic circle progress that NutritionCircleProgress is extended from
 * Wireframe
 * -> https://projects.invisionapp.com/d/main#/console/3206033/70966463/preview
 * Component Style File
 * -> app/styles/app/components/common/_CircleProgress.scss
 * Auto-Generated on Wed Apr 08 2015
 ******************************************************************/
var c3 = require('c3');
var _ = require('lodash');

var Donut = React.createClass({
  propTypes: {
      bottomLabel: React.PropTypes.string.isRequired,
      centerText: React.PropTypes.string,
      percentage: React.PropTypes.number.isRequired,
      fontSizeMultiplier: React.PropTypes.number,
      chartObj: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
        bottomLabel: "Protein",
        centerText: undefined,
        percentage: 96,
        fontSizeMultiplier: .20,
        chartObj: undefined
    }
  },

  getInitialState: function()
  {

      if (!this.props.centerText){
        var centerText = this.props.percentage + "%";
      }

      return {
        bottomLabel: this.props.bottomLabel || "",
        centerText: this.props.centerText || centerText,
        percentage: this.props.percentage || 0
      };
  },

  componentWillReceiveProps: function(newProps)
  {
    var centerText = "";
    if (newProps && newProps.centerText){
      centerText = newProps.centerText;
    } else {
      centerText = newProps.percentage + "%";
    }
    this.setState({
      bottomLabel: newProps.bottomLabel || "",
      centerText: centerText,
      percentage: newProps.percentage || 0
    })
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
    if (this.props.chartObj){
      this.props.chartObj.destroy();
    }
  },

  _getCircleWidth: function(width){
    return width - 30;
  },

  _setCenterTextFontSize: function(_chartObjInternal){
    if (this.refs.donut_graph){
      var $graphRoot = $(this.refs.donut_graph.getDOMNode());
      var $centerText = $graphRoot.find(".c3-chart-arcs-title");
      var chartWidth = 0;
      var $chart = $graphRoot.find(".c3-chart-arcs");

      try {
        if ($chart.length > 0 && $chart[0].getBBox && $chart[0].getBBox().width!==0){
          chartWidth = parseInt($chart[0].getBBox().width, 10);
        }else{
          chartWidth = _chartObjInternal.radiusExpanded*2;
        }
      }catch(e){
        chartWidth = _chartObjInternal.radiusExpanded*2;
      }


      //alert(chartWidth* this.props.fontSizeMultiplier);
      var fontSize = chartWidth* this.props.fontSizeMultiplier;
      console.log("{Label: "+ this.props.bottomLabel +
          ", Percentage: "+ this.props.percentage +
          "}  Chart Width: "+ chartWidth);
      $centerText.css("font-size",  fontSize + "px");
      $bottomLabel = $graphRoot.find(".bottomLabel");
      $bottomLabel.css("font-size",  fontSize + "px");
    }
  },

  _handleResize: function(e){
      if(this.props.chartObj){
        var chartObj = this.props.chartObj;

        this._setCenterTextFontSize(chartObj.internal);
        var $graph_display = $(this.refs.graph_display.getDOMNode());
        var graphDisplayWidth = $graph_display.width();

          if (Math.abs(graphDisplayWidth - this.props.lastFlushedWidth) > this.props.flushWidthThrehold){
            this.props.lastFlushedWidth = graphDisplayWidth;
            chartObj.flush();
          }else{
             chartObj.resize({
              width: graphDisplayWidth,
              height: graphDisplayWidth
          });
        }
      }
  },

  componentDidMount: function(){
    var remainder = 100 - this.props.percentage;
    if (this.refs.graph_display){
      var $graph_display = $(this.refs.graph_display.getDOMNode());
      $graph_display.hide();
      //window.addEventListener('resize', _.throttle(this._handleResize, 500));
      var graphDisplayWidth = $graph_display.width();
      var donutWidth = (graphDisplayWidth>300)? 30: 6;

      var self = this;
      if (!this.props.chartObj){
        this.props.chartObj = c3.generate({
            bindto: self.refs.graph_display.getDOMNode(),
            onrendered: function () {
              self.props.flushWidthThrehold = 200;
              self.props.lastFlushedWidth = graphDisplayWidth;
              self._setCenterTextFontSize(this);
              $graph_display.show();
            },
            size: {
              width: self._getCircleWidth(graphDisplayWidth),
              height: self._getCircleWidth(graphDisplayWidth)
            },
            data: {
                columns: [
                    [self.state.bottomLabel, self.props.percentage],
                    ['remainder', remainder]
                ],
                order: null,
                type : 'donut',
                onclick: function (d, i) {  }
            },
            legend: {
              show: false
            },
            interaction: {
              enabled: false
            },
            color: {
              pattern: ['#494949', '#DADADA']
            },
            tooltip: {
              show: false
            },
            donut: {
                title: self.state.centerText,
                width: donutWidth,
                label: {
                  show: false
                }
            }
        });
      }
    }
  },

  render: function()
  {
    // var bottomLabelStyle={
    //   "font-size": this.props.textSize + "px"
    // }
    return (
      <div className="donut" ref="donut_graph">
        <div ref="graph_display" className="graph_display"></div>
        <div className="bottomLabel">{this.state.bottomLabel}</div>
      </div>
    );
  }

});

module.exports = Donut;
