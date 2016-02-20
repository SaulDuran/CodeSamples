/**
 * Created by goat on 2015-08-25.
 */
var React = require('react');
var Reflux = require('reflux');
var actions = require('actions/actions');
var Validation = require('services/Validation');
var AnswerStore = require('stores/Answers');
var _ = require('lodash');
var dispatcher = require('./dispatcher');
var VisibilityHandler = require('services/Visibility');

/***
*  Event Progression:
*   
*  1. When this component renders it processes the schema to 
*     get a list of other questions' answers it depends on for
*     visibility. 
*     
*     For example: Question A needs Question B == 0 to show
*
*     These list will be used to check when a answer is stored
*     in the AnswerStore, to see if the visibility of this component
*     needs to be updated.
*
*     This component uses a dispatcher based on the type of the 
*     schema to render the inner component with a callback as a property. 
*     
*  2. This callback (onUpdate) is called in this component the 
*     question's schema and value is sent to the validationService.
*     
*     The validation service will check the value of the question and
*     fire either a valid or invalid event. It is an event because some 
*     validations are an ajax call. For example: email. Events also
*     behave better with react. 
*
*  3. This component listens for the valid|invalid event from the validation 
*     service. If it is invalid this component will update the inner dispatched
*     input to show the invalid state and value.
*
*  4. If the component is valid it will call an action.sumbitAnswer
*     the AnswersStore will store it and send an event out (because this can be ajax).
*
*  5. This component will listen to act on events from AnswerStore for answers submission
*     that are part of it's constraint for visibility. 
*     
*
*/
var Question = React.createClass({

  mixins: [
    Reflux.listenTo(Validation.ValidationStore, "_on_validation"),
    Reflux.listenTo(AnswerStore, "_on_answer_store_event")

  ],

  getInitialState: function() {
    // If an visiblity rule exists in the schema then default is true for hidden
    var schema = this.props.schema;
    var hidden = false;
    var constraintsInputs = [];

      _.each(schema.visibility.constraints, function(visibilityRule, j) {
        constraintsInputs.push(visibilityRule.questionKey);
      });

    if (schema.visibility.constraints && schema.visibility.constraints.length > 0) {
      hidden = this.isHidden();
    }

    var value = AnswerStore.getAnswer(this.props.entityName, schema.key);
    //UPDATE
    if(value){
      if(value.rawValue){
        value = value.rawValue;
      } else {
        this._on_update(value);
      }
    } else {
      value = '';
    }
    /*if (value){
        value = value.rawValue;
    }else{
        value = '';
    }*/
    return {
      "hidden": hidden,
      "constraintsInputs": constraintsInputs,
      "valid" : undefined,
      "value" : value,
      "error" : {}
    };

  },

  isHidden: function() {
    var vh = new VisibilityHandler( this.props.schema, AnswerStore );

    if ( vh.hasOwnProperty( this.props.schema.visibility.type ) )
    {
      return ! vh[ this.props.schema.visibility.type ]();
    }

    return false;
  },

  isVisibilityDependantOn: function(changeInputId) {
    //Check the schema.visibility and see if it has the question now depends on the changedInput
    var dependsOn = false;

    if (_.findIndex(this.state.constraintsInputs, function(ele) {
        return ele == changeInputId;
      }) >= 0) {
      dependsOn = true;
    }

    return dependsOn;

  },

  _on_validation: function(changeEvent) {

    if (changeEvent.name == "input:isValid" && changeEvent.schema.id == this.props.schema.id) {
      //this.refs.input.isValid(changeEvent);
      this.setState({ "valid" : true, "value" : changeEvent.value }, function() {
        actions.submitAnswer({
          "schema": this.props.schema,
          "entityName": this.props.entityName,
          "value": changeEvent.value,
          "page": this.props.page
        });
      });

    } else if (changeEvent.name == "input:isInvalid" && changeEvent.schema.id == this.props.schema.id) {
      //TODO: hook up with error object from validationService.
      this.setState({ "valid" : false, "error" : changeEvent.validationError.error, "value" : changeEvent.value });
      actions.deleteAnswer({"schema": this.props.schema, "entityName": this.props.entityName, "page": this.props.page});


    }

    console.log("Validate POHONE", changeEvent.value)
  },

  _on_answer_store_event: function(changeEvent) {
    //Check if the answers update is something we depend on
    if (changeEvent.name == "stored:answers" && this.isVisibilityDependantOn(changeEvent.schemaKey)) {
      var newHidden = this.isHidden();
      if (newHidden != this.state.hidden) {
        this.setState({
          "hidden": newHidden
        });

      }

    } else if (changeEvent.name == "changed:answers") {
      var schema = this.props.schema;
      var value = AnswerStore.getAnswer(this.props.entityName, schema.key);
      if (value){
        value = value.rawValue;
      }else{
        value = '';
      }
      this.setState({
        "value" : value
      });
    }

  },

  propTypes: {
    schema: React.PropTypes.object.isRequired
  },

  //Happens when the input has a new value
  _on_update: function(value) {
    // Options need to have a value at least
    actions.validateAnswer({
      "schema": this.props.schema,
      "value": value // CHANGE THIS TO WHAT THE INPUT VIEW WILL DO this.refs.input.getValue()
    });

  },

  validate: function(){
      actions.validateAnswer({
          "schema": this.props.schema,
          "value": this.state.value
      });
  },

  isValid: function(){
    return this.state.valid;
  },

  render: function() {
      /*
       * Generate the grid based on schema.layout
       */
      var className = 'question_view ';
      if ( this.props.schema.layout && this.props.schema.layout.column ){
              if (this.props.schema.layout.column == 'half'){
                  className += 'col-sm-6 ';

                  if ( this.props.schema.layout.offset && this.props.schema.layout.offset == 'right' ){
                      className += 'col-sm-offset-6';
                  }

              } else if (this.props.schema.layout.column == 'third'){
                  className += 'col-sm-4 ';
                  if ( this.props.schema.layout.offset && this.props.schema.layout.offset == 'right' ){
                      className += 'col-sm-offset-8';
                  }
              }
      }else{
          className += 'col-sm-12';
      }

      var QuestionInput = dispatcher.getInput( this.props.schema.type );

      if (this.state.hidden == true){
          return null;
      }

      if (this.props.schema.fields){
          newFields = [];

          _.each(this.props.schema.fields, function(field, i){

              if ( field.payload === null ){
                  field.payload = i;
              }

              newFields.push(field);
          });

          this.props.schema.fields = newFields;
      }

      if ( this.state.valid == false ){
          className += ' is-error';
      }

      return (
      <div className={className}>
        <QuestionInput valid={this.state.valid} error={this.state.error} value={this.state.value} onChange={this._on_update} schema={this.props.schema} defaultValue={this.state.value}/>
      </div>
      );
  }
});

module.exports = Question;
