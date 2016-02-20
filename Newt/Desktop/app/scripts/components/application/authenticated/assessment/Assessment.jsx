var React = require('react');
var SchemaStore = require('stores/Schema');
var Router = require('react-router');
var Reflux = require('reflux');
var Page = require('../../../common/views/page/Page.jsx');
var AnswerStore = require('stores/Answers');

var MuiThemeContextMixin = require('components/mixins/MuiThemeContextMixin.js');

var mui = require('material-ui');
var RouterNavigation = Router.Navigation;
var LinearProgress = mui.LinearProgress;


var actions = require('actions/actions.js');
var PageTrackerMixin = require('components/mixins//PageTracker.js');

var AssessmentService = require('services/AssessmentService');

var DotsNavigation = require('../../../common/partials/dotsNavigation/dotsNavigation');

var Button = require('components/common/inputs/button/button');

var Assessment = React.createClass({
  getInitialState: function() {

    /// DO NOT HAVE A STATE FOR PAGE VARIABLE
    /// The react router has it's own state for the paramters in the url
    /// This causes multiple re-renders.
    return {
      loaded: false,
      error: false
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    MuiThemeContextMixin,
    Router.State,
    RouterNavigation,
    Reflux.listenTo(SchemaStore, "_on_schema_store_event"),
    PageTrackerMixin,
    Reflux.listenTo(AssessmentService, "_on_assessment_service_event")
  ],

  _on_assessment_service_event: function(evt){

      if (evt.name == "assessment:SubmitFailed") {
          this.setState({"error" : evt.err});
      }
      else if (evt.name == "assessment:SubmitSucceeded") {
          this.setState({"error" : false});

	         actions.fetchAboutMe();
          this.transitionTo("about-me");
      }

  },


  _on_schema_store_event: function(evt) {
    if (evt.name == "loading" && evt.type == 'assessment') {
      this.setState({
        "loaded": false
      });
    }
    if (evt.name == "changed:entity" && evt.type == 'assessment') {
      this.setState({
        "loaded": true
      });
    }
  },


  componentDidUpdate: function() {

    this._checkAccessPage();

    // Save the defaultValues into AnswerStore
    var schema = this._get_schema();
    var page = this._get_page_from_url();

    var that = this;

    _.each(schema.questions, function( question ){

        //If the question has a default value
        if (typeof(question.options.defaultValue) != 'undefined'){

            // Get the question answer from answer store
            var answer = AnswerStore.getAnswerByQuestionKey('assessment.' + question.key );

            // If the question is not saved in answer store
            if (typeof(answer) == 'undefined' || answer == null){

                // Save the default value
                that.refs[page].refs[question.key]._on_update(question.options.defaultValue);
            }
        }

    });

    return true;

  },

  componentDidMount: function() {
    this.TrackPageChange({
      entityName: 'assessment',
      pageFrom: -1,
      pageTo: 0
    });
  },

  _checkAccessPage: function() {

    var page = this._get_page_from_url();

    if (page == 0) {
      return true;
    }

    var redirectTo = false;
    for (i = 0; i < page; i++) {

      if (!AnswerStore.isValidPage('assessment', i)) {
        redirectTo = i;
        break;
      }
    }

    if (redirectTo !== false) {
      this.transitionTo('assessment', {
        'page': redirectTo + 1
      });
    }

  },

  _validate_page_components : function( page )
  {
    var isValidPage = AnswerStore.isValidPage('assessment', page);

    if  (! isValidPage )
    {
      for ( prop in this.refs[page].refs )
      {
        if ( this.refs[page].refs.hasOwnProperty(prop) )
        {
          var answer = AnswerStore.getAnswerByQuestionKey('assessment.' + prop );

          if ( (typeof answer == 'object') && (answer != null) && (answer.hasOwnProperty('value')) )
          {
            answer = answer.value;
          }
          else
          {
            answer = '';
          }

          this.refs[page].refs[prop]._on_update(answer);
        }
      }

      return false;
    }

    return true;
  },


  _on_next_page: function() {
    var page = this._get_page_from_url();

    var that = this;

    setTimeout(function(){
        if ( that._validate_page_components( page ) )
        {

          that.transitionTo('assessment', {
            'page': page + 2
          });

          that.TrackPageChange({
            entityName: 'assessment',
            pageFrom: page,
            pageTo: page + 1
          });

          var answers = AnswerStore.getAnswerByEntity('assessment');

          answers._version = SchemaStore.getEntityVersion('assessment');
          actions.saveAssessment(answers);

        }else{

            setTimeout(function(){

                $('html, body').animate({
                    scrollTop: $('.is-error:first').offset().top
                }, 500);

            }, 500);

        }

    }, 1500);
  },

  _on_prev_page: function() {
    var page = this._get_page_from_url();
    var that = this;
    this.setState({
      schema: SchemaStore.getPageSchema("assessment", page - 1)
    }, function() {

      console.log('prev', page - 1);
      that.transitionTo('assessment', {
        'page': page
      });
      that.TrackPageChange({
        entityName: 'assessment',
        pageFrom: page,
        pageTo: page - 1
      });
    });
  },

  _on_submit: function() {

    var page = this._get_page_from_url();

    var that = this;

    setTimeout(function(){

        if ( that._validate_page_components( page ) )
        {
          var answers = AnswerStore.getAnswerByEntity('assessment');
          answers._version = SchemaStore.getEntityVersion('assessment');

          //NEVER EVER SEND DATA DIRECTLY TO A STORE
          actions.submitAssessment(answers);

        }else{

            setTimeout(function(){

                $('html, body').animate({
                    scrollTop: $('.is-error:first').offset().top
                }, 500);

            }, 500);

        }

    }, 1500);

  },

  _get_page_from_url: function() {
    var page = 0;
    var params = this.context.router.getCurrentParams();
    if (params && typeof params.page) {
      page = parseInt(params.page) - 1;
    }

    return page;

  },

  _get_schema: function() {
    var page = this._get_page_from_url();
    var schema = SchemaStore.getPageSchema("assessment", page);

    return schema;
  },


  _renderButtons: function(page) {

    if (page == 0) {
      return (
        <div className="bottom-buttons">
          <Button label="Next" primary={true} onClick={this._on_next_page} />
        </div>
        );
    } else if (page == SchemaStore.getPageNumbers("assessment") - 1) {

        var errorDiv = '';
        if(this.state.error !== false ){
            errorDiv = <div className="submit-error">{this.state.error}</div>;
        }

      return (
        <div className="bottom-buttons">
          <Button label="Back" primary={true} onClick={this._on_prev_page} />
          <Button label="Submit" primary={true} onClick={this._on_submit} />
          {errorDiv}
        </div>
        );
    } else {
      return (
        <div className="bottom-buttons">
          <Button label="Back" primary={true} onClick={this._on_prev_page} />
          <Button label="Next" primary={true} onClick={this._on_next_page} />
        </div>
        );

    }
  },



  render: function() {
    var loaded = this.state.loaded;
    var page = this._get_page_from_url();
    var schema = this._get_schema();

    if (schema && schema.questions) {
      loaded = true;
    }

    if (!loaded) {

        return (<div className="assessment">
	      	<br />
	      	<LinearProgress mode="indeterminate"  />
		<br />

        </div>);

    }

    var routePage = page + 1;

    var pageCount = SchemaStore.getPageNumbers('assessment');

    return (
      <div className="assessment">
        <DotsNavigation section="assessment" currentPage={routePage} pageCount={pageCount} />
        <Page ref={page} key={page} entityName="assessment" schema={schema} onNext={this._on_next_page} page={page} />
          <div className="row">
              <div className="col-lg-8">
                  <div className="bottom-privacy">
                      We take your privacy seriously. We do not share any information we learn about you with your employer or insurer. <a href="http://www.newtopia.com/privacy-policy" target="_blank">View privacy policy</a>
                  </div>
              </div>
              <div className="col-lg-4">
                {this._renderButtons(page)}
              </div>
          </div>
      </div>
      );
  }
});

module.exports = Assessment;
