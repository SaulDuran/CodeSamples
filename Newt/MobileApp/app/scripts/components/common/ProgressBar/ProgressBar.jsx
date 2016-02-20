/*******************************************************************
 * ProgressBar
 * -> Progress Bar with variable thresholds.
 * Wireframe
 * -> https://projects.invisionapp.com/d/main#/console/3206033/70669415/preview
 * Component Style File
 * -> app/styles/app/components/common/_ProgressBar.scss
 * Auto-Generated on Wed Apr 08 2015
 ******************************************************************/

var ProgressBar = React.createClass({

  propTypes: {
    
  },

  getInitialState: function()
  {
    if (
        typeof(this.props.data) == 'undefined' ||
        typeof(this.props.data.goal) == 'undefined' ||
        typeof(this.props.data.value) == 'undefined' ||
        typeof(this.props.data.label) == 'undefined'
    )
    {
      return {
        goal: 0,
        value: 0,
        label: ''
      };
    }

    return {
      goal: this.props.data.goal,
      value: this.props.data.value,
      label: this.props.data.label
    };
  },

  componentWillReceiveProps: function(newProps)
  {
    this.replaceState({
      goal : newProps.goal,
      value : newProps.value,
      label : newProps.label
    });
  },

  render: function()
  {

    var green_width = 0;
    var yellow_width = 0;
    var red_width = 0;
    var progress_value_width = 0;

    var green_class = '';
    var yellow_class = '';
    var red_class = '';

    var green_min_width = '0px';

    if ( this.state.value < this.state.goal && this.state.value > 0 ) {
      green_width = (this.state.value * 100) / this.state.goal;
      green_class = 'green-bar';
      progress_value_width = green_width * 70 / 100;
      green_min_width = '60px';
    }
    else if ( this.state.value < this.state.goal * 1.1 && this.state.value > 0 ){
      green_width = 100;
      yellow_width = 100;
      green_class = 'green-bar';
      yellow_class = 'yellow-bar';
      progress_value_width = 80;
    }
    else if( this.state.value > 0 ){
      green_width = 100;
      yellow_width = 100;
      red_width = 100;
      green_class = 'green-bar';
      yellow_class = 'yellow-bar';
      red_class = 'red-bar';
      progress_value_width = 100;
    }

    green_bar_style = {
      width: green_width + '%',
      minWidth : green_min_width
    }

    yellow_bar_style = {
      width: yellow_width + '%'
    }

    red_bar_style = {
      width: red_width + '%'
    }

    progress_value_style = {
      width: progress_value_width + '%',
      minWidth : green_min_width
    }

    return (
      <div className="progress_bar">
        <div className="bar">
          <div className="progress-value" style={progress_value_style}>{this.state.value}</div>
          <div className="green-zone"><div className={green_class} style={green_bar_style}>&nbsp;</div></div>
          <div className="goal-line">&nbsp;</div>
          <div className="yellow-zone"><div className={yellow_class} style={yellow_bar_style}>&nbsp;</div></div>
          <div className="red-zone"><div className={red_class} style={red_bar_style}>&nbsp;</div></div>
        </div>
        <div className="progress-label">{this.state.label}</div>
      </div>
    );
  }

});

module.exports = ProgressBar;
