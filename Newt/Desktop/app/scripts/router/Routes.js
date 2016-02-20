var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Application = require('../components/application/Application.jsx');
var Authenticated = require('../components/application/authenticated/Authenticated.jsx');

var Welcome = require('../components/application/welcome/Welcome.jsx');
var Loading = require('../components/application/loading/Loading.jsx');
var Login = require('../components/application/login/Login.jsx');
var LoginForgotPassword = require('../components/application/login/ForgotPassword.jsx');
var LoginResetPassword = require('../components/application/login/ResetPassword.jsx');

var Transition = require('../components/application/authenticated/transition/Transition.jsx');


// transition pages
var PostRegistration  = require('../components/application/authenticated/transition/transitionpage_registration_failed.jsx');
var AssessmentComplete  = require('../components/application/authenticated/transition/transitionpage_registration_complete.jsx');
var ProfileComplete = require('../components/application/authenticated/transition/transitionpage_profile_complete.jsx');


var Registration = require('../components/application/registration/Registration.jsx');
var Assessment = require('../components/application/authenticated/assessment/Assessment.jsx');

var AboutMe = require('../components/application/authenticated/aboutme/aboutMe.jsx');

var config = require('../config'); 

var UnifiedLogin = require('../components/application/unifiedLogin/UnifiedLogin.jsx');


var devRoutes = function() {
   if (config.DEV_ROUTES) {
        var SchemaEditor = require('components/dev/schemaEditor/SchemaEditor');

  return (
    <Route name="schema-editor" path="/dev/se" handler={SchemaEditor} />
         );
   }

};

var routes = (
  <Route name="application" path="/" handler={Application}>
    <Route name="loading" path= "/loading" handler={Loading} />
    <Route name="login" path="/login" handler={Login} />
    <Route name="forgot_password" path="/forgot-password" handler={LoginForgotPassword} />
    <Route name="reset_password" path="/reset-password" handler={LoginResetPassword} />
    <Route name="registration" path="/registration/:page" handler={Registration} />
    <Route name="unifiedLogin" path="/unifiedLogin/:token" handler={UnifiedLogin} />
      <Route name="registration_failed" path="/transition/registration-failed" handler={PostRegistration} />


    <Route name="authenticated" handler={Authenticated}>


      <Route name="about-me" path="/about-me" handler={AboutMe} />
      
      <Route name="transition" path="/transition" handler={Transition} />

      <Route name="registration_complete" path="/transition/registration-complete" handler={AssessmentComplete} />
      <Route name="profile_complete" path="/transition/profile-complete" handler={ProfileComplete} />
      
      <Route name="assessment" path="/assessment/:page" handler={Assessment} />
      <NotFoundRoute handler={Loading}/>
    </Route>
    {devRoutes()}
    <NotFoundRoute handler={Loading}/>
    <DefaultRoute handler={Login} />
  </Route>
);

module.exports = routes;
