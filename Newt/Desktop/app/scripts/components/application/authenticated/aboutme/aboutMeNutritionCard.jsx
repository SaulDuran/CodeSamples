var React = require('react');
var Reflux = require('reflux');
var Navigation    = require('react-router').Navigation;

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Toggle = mui.Toggle,
    Dialog = mui.Dialog;

var VisibilitySensor = require('react-visibility-sensor');   

var AboutMeNutritionCard = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data || { "bg" : "", 
                                 "items" : "",
                                 "copy" : "", 
                                 "nutritionType" : ""},
      animate: false
    };
  },
  componentDidMount: function (newProps) {

  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      'data': newProps.data,
    });
  },
  setMarkup: function () {
    return { __html: this.state.data.copy };
  },

  checkVisibility: function(isVisible){
     //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
     
     this.setState({
         animate: isVisible ? true : false
    })
  },  

  displayImages: function(){

    var sensorActive,
        animateClassNames;

    if(this.props.animation){
      sensorActive = true;
      animateClassNames = this.state.animate ? "item animate" : "item";
    }else{
      sensorActive = false;
      animateClassNames = "item animate";
    }

    var itemsLength;
    if(this.state.data.nutritionType == "vegetarian"){
      itemsLength = this.state.data.items.length;
    }else{
      itemsLength = this.state.data.items.length-1;
    }

    var items = this.state.data.items;

    return (
      <div className="items-container">
        {
          items.map(function(item, i) {
          
              if(i < itemsLength){
                return <img src={item} className={animateClassNames} alt="" width="100%"/>
              }
            
          })
        }
      </div>
    );




  },

  render: function() {



    return (
      <div className="aboutme-section-card">
        <div className="aboutme-section-title nutrition">
          <h2 className="color--yellow">Nutrition</h2>
        </div>
        <div className="aboutme-section-content">
          <div className="aboutme-section-content-blk row nutrition-container">
            <div className="col-sm-12 nutrition-content" >
              <img src={this.state.data.bg} className="nutrition-bg" alt="" width="100%"/>
              
                {this.displayImages()}
             
            </div>
            <VisibilitySensor onChange={this.checkVisibility}/>
          </div>
                       
          <div className="aboutme-section-content-blk row">
            <div className="col-sm-12" dangerouslySetInnerHTML={this.setMarkup()}></div>
          </div>

          
        </div>
      </div>
    );
  }
});

module.exports = AboutMeNutritionCard;