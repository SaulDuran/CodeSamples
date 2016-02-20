var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var _ = require('lodash');
var marked = require('marked');
var RouterNavigation = Router.Navigation;

var mui = require('material-ui'),
  RaisedButton = mui.RaisedButton,
  FloatingActionButton = mui.FloatingActionButton,
  Toggle = mui.Toggle,
  Dialog = mui.Dialog,
  Tab = mui.Tab,
  Tabs = mui.Tabs;

var AboutMeModel = require('stores/AboutMeModel');

var copyStrings = require('./copy_strings.js');

//ABOUT ME COMPONENTS
var AboutMeHeader = require('./common/aboutMeHeader.jsx');
var AboutMeFooter = require('./common/aboutMeFooter.jsx');

var AboutMeHealthCard = require('./aboutMeHealthCard.jsx');
var AboutMeNutritionCard = require('./aboutMeNutritionCard.jsx');
var AboutMeWellbeingCard = require('./aboutMeWellbeingCard.jsx');
var AboutMeActivityCard = require('./aboutMeActivityCard.jsx');
var AboutMeGeneticCard = require('./aboutMeGeneticCard.jsx');
var AuthService = require('../../../../services/AuthService');

var DetectMobile = require('utils/detect-mobile.js');


var AboutMe = React.createClass({
  mixins:[
    Reflux.listenTo(AboutMeModel, "_ontrigger_aboutmestore"),
    Reflux.listenTo(AuthService, "_ontrigger_authstate"),
    RouterNavigation   
  ],

  init: function() {
    },
  _ontrigger_aboutmestore: function(eventObj) {
    if (eventObj.name == "change:aboutme") {
      this.setState({
        "aboutUser": AboutMeModel.getAboutUser()
      });
    } else if (eventObj.name == "submitted:welcome_call") {
	this.transitionTo("profile_complete");
   } else if (eventObj.name == "welcome_call:failed") {
	this.setState({ "error" : "Failed to submit welcome call"});
   }
  },
  _ontrigger_authstate: function() {
    this.setState({
      "userData": AuthService.getUserObj()
    });
  },
  getInitialState: function() {
    return {
      "aboutUser": AboutMeModel.getAboutUser(),
      "userData": AuthService.getUserObj()
    };
  },
  componentWillMount: function() {
    $('html').addClass("about-me-mounted");
  },
  componentWillUnmount: function() {
    $('html').removeClass("about-me-mounted");
  },
  componentDidMount: function() {},

  render: function() {
    var userState = this.state.userData;
    var USER_DATA = {
      userAvatarPic: "",
      userName: ""
    };
    console.log("DATA ==>" + userState)
     var avatar = _.result(this.state.userData, 'meta.avatar', {data: "1", type: "premade"});

      var pic = "";
      if (avatar.type === "premade") {
	  pic = "assets/images/avatar/avatar (" + avatar.data + ").png";
      } else {
	  pic = "data:image/jpg;base64," + avatar.data;
      }
      USER_DATA = {
        userAvatarPic: pic,
        userName: _.result(userState, 'meta.FirstName.value') || _.result(userState, 'meta.NewtopiaProfileName.value') || _.result(userState, 'display_name', 'Participant')
      };

    
    //PERSONALITY CARD DATA
    var personality = _.result(this.state.aboutUser, "personality.type", "emotion");
    var personalityCopy = _.result(copyStrings, "personality." + personality, "Your personality type can often find it challenging to stick to a particular diet or excercise plan because of difficulties planing ahead. \n \nWhile you may initially feel motivated to start working towards healthy lifestyle goals, it can be hard to stay on track without structure, which means minor setbacks like one day of bad eating, can derail you completely. \n \nLike a trusted friend, your certified coach will help you add structure to your day and keep you motivated and accountable to work towards your goals, one small step at time.");
    var HEALTH_DATA = {
      imgBack: 'assets/images/aboutme/personality/back.svg',
      imgBased: 'assets/images/aboutme/personality/'+personality+'.svg',
      copy: marked(personalityCopy),
      imgEmotion: 'assets/images/aboutme/population/'+personality+'.png'
    };


    //NUTRITION CARD DATA
    var nutrition = _.result(this.state.aboutUser, "nutrition.type", "standard");
    nutrition = nutrition.replace(/ diet/g,''); 
    var nutritionCopy = _.result(copyStrings, "nutrition." + nutrition, "Your certified health coach will help you plan meals and snacks to support your non-vegetarian diet, and ensure you are receiving adequate amounts of calories and nutrients. With non-vegetarian diet you can enjoy a variety of food and treats that are healthy and delicious.");
    var NUTRITION_DATA = {
      bg: 'assets/images/aboutme/nutrition/'+ nutrition + '/bg.svg',
      items: [
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-1.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-2.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-3.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-4.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-5.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-6.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-7.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-8.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-9.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-10.svg',
        'assets/images/aboutme/nutrition/'+ nutrition + '/item-11.svg',  
      ],
      nutritionType: nutrition,
      copy: marked(nutritionCopy)
    };


    //ACTIVITY CARD DATA
    var activity = _.result(this.state.aboutUser, "activity.type", "active") || "active";
    var activityCopy = _.result(copyStrings, "activity." + activity, "We\'re thrilled you are ready to embark on a more active lifestyle. Increased physical activity will help you lose weight, increase your energy, improve your mood, and reduce your risk for diseases like diabetes and cancer. We are going to work together to rediscover activities that you used to enjoy. We will also be sharing tips on how to increase your daily movement, and organizing Newtopia Activity Challenges designed to make physical activity fun and practical.");
    var ACTIVITY_DATA = {
      bg: 'assets/images/aboutme/activity/bg.svg',
      path: 'assets/images/aboutme/activity/'+activity + '/path.svg',
      icon: 'assets/images/aboutme/activity/'+activity + '/icon.svg',
      copy: marked(activityCopy), 
    };

    //WELLBEING CARD DATA
    var wellbeing = _.get(this.state.aboutUser, "wellbeing.type");
    var wellbeingCopy =_.result(copyStrings, "wellbeing." + wellbeing,  "With poor sleeping habits, the chances are you are not getting a good quality sleep, or sleep that required 7 - 9 hours a night. Sleep deprivation impact more than just energy levels. Sleep deprivation also influences your weight, causes food cravins, hormonal imbalances and prevents the burning of calories during REM sleep. You will benefit from the ongoing guidence and support of your certified personal coach who will help you practice good sleep habits to improve your sleep quality.");

    var wellbeingValues = _.get(this.state.aboutUser, "wellbeing.values");
    var WELLBEING_DATA = {
      moodIndex: _.get(wellbeingValues, "mood", 0),
      sleepIndex: _.get(wellbeingValues, "sleep", 0) ,
      energyIndex: _.get(wellbeingValues, "energy", 0),
      stressIndex: _.get(wellbeingValues, "stress", 0),
      anxietyIndex: _.get(wellbeingValues, "anxiety", 0),

      greenGraph: [
        'assets/images/aboutme/wellbeing/green/graph-0.svg',
        'assets/images/aboutme/wellbeing/green/graph-1.svg', 
        'assets/images/aboutme/wellbeing/green/graph-2.svg', 
        'assets/images/aboutme/wellbeing/green/graph-3.svg', 
        'assets/images/aboutme/wellbeing/green/graph-4.svg', 
        'assets/images/aboutme/wellbeing/green/graph-5.svg', 
        'assets/images/aboutme/wellbeing/green/graph-6.svg', 
        'assets/images/aboutme/wellbeing/green/graph-7.svg',
      ],

      blueGraph: [
        'assets/images/aboutme/wellbeing/blue/graph-0.svg',
        'assets/images/aboutme/wellbeing/blue/graph-1.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-2.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-3.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-4.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-5.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-6.svg', 
        'assets/images/aboutme/wellbeing/blue/graph-7.svg',
      ],


      copy: marked(wellbeingCopy),
    };


    //GENETICS CARD DATA
    var GENETICS_DATA = {
      bg: 'assets/images/aboutme/genetic/bg.svg',
      dna: 'assets/images/aboutme/genetic/dna.svg'
    };

    // Play anim for desktop browser only
    var playAnimation = DetectMobile.any() ? false : true;

    return (
      <div className="aboutme-container">
        <AboutMeHeader data={USER_DATA} animation={playAnimation}></AboutMeHeader>
        <AboutMeHealthCard data={HEALTH_DATA} animation={playAnimation}></AboutMeHealthCard>
        <AboutMeNutritionCard data={NUTRITION_DATA} animation={playAnimation}></AboutMeNutritionCard>
        <AboutMeWellbeingCard data={WELLBEING_DATA} animation={playAnimation}></AboutMeWellbeingCard>
        <AboutMeActivityCard data={ACTIVITY_DATA} animation={playAnimation}></AboutMeActivityCard>
        <AboutMeGeneticCard data={GENETICS_DATA} animation={playAnimation}></AboutMeGeneticCard>
        <AboutMeFooter/>
      </div>
      );
  }

});

module.exports = AboutMe;
