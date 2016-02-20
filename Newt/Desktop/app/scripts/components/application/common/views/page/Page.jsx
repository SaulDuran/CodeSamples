/**
 * Created by goat on 2015-08-25.
 */
var React = require('react');
var _ = require('lodash');
var Question = require('../question/Question.jsx');

var Page = React.createClass({
  propTypes: {
    schema: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return this.props;
  },
  componentWillReceiveProps: function(newProps) {
    this.setState(newProps);
  },
  mapQuestion: function (q) {
    return <Question schema={q} ref={q.key} key={q.key} entityName={this.props.entityName} page={this.props.page} />
  },
  render: function() {
    var entityName = this.props.entityName;
    var questions = _.result(this.props.schema, 'questions', []);
    
    if(this.props.page == 0){
      return (
        <div className="page_view row">
          <div className="header-title"><h1 className="page-title">{this.props.schema.title}</h1></div>
          <div className="page-tagline">{this.props.schema.tagline}</div>
          <div className="whats-included">
            <img src="assets/images/svg/include/include_1.svg" alt="Newtopia" />
          </div>
          <div className="start-registration">Start your registration</div>

          {questions.map(this.mapQuestion)}
        </div>
      );
    } else {
      return (
        <div className="page_view row">
          <div className="header-title"><h1 className="page-title">{this.props.schema.title}</h1></div>
          <div className="page-tagline">{this.props.schema.tagline}</div>
          {questions.map(this.mapQuestion)}
        </div>
      );
    }

    
  }
});


module.exports = Page;
