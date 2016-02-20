/**
 * Created by goat on 2015-03-19.
 */
var _   = require('lodash'),
  $   = require('jquery'),
  DataAccessObject = require('./DataAccessObject'),
  DaoExec = require('./DaoExec');

var dao_registry = {};
////////////////////////////////////////
//            DEBUG ONLY
// window.dao_registry = dao_registry;
////////////////////////////////////////



/***
 * @class DataAbstractionService
 * @param options
 * @constructor
 */
function DataAbstractionService(options){

  this._driver = false;

  if(options && options.driver){
    var validDriver = this._verifyDriverImplementsInterface(options.driver);
    if(validDriver){
      this._driver = options.driver;
    } else {
      throw new Error("DataAbstractionService : driver provided does not correctly implement interface");
    }
  } else {
    throw new Error("DataAbstractionService : driver not found in DAS initialization options");
  }
};



DataAbstractionService.prototype._verifyDriverImplementsInterface = function(driver)
{
  var required_methods = ["get", "set", "delete", "search"];
  var missing_methods = false;

  _.each(required_methods, function(method_name){
    if( ! (driver && driver[method_name] && typeof driver[method_name] === "function")){
      missing_methods = true;
    }
  });

  return !missing_methods;
};



/***
 * @method createDataAccessObject
 * @param options
 */
DataAbstractionService.prototype.createDataAccessObject = function(options)
{
  var _type = false,
    _typeClass = false,
    _daoExec = false;

  if(options && options.type && options.typeClass){
    _type = options.type;
    _typeClass = options.typeClass;
  } else {
    throw new Error("DAS.createDataAccessObject : type and typeClass must be provided in options");
  }

  _daoExec = new DaoExec({
    cb: this._daoExecCallbackHandler,
    context: this
  });

  var DAO = new DataAccessObject({
    type: _type,
    typeClass: _typeClass
  }, _daoExec);

  var daoId = _.uniqueId("dao_");
  DAO._dao_id = daoId;
  dao_registry[daoId] = DAO;

  return DAO;
};



DataAbstractionService.prototype._daoExecCallbackHandler = function(args, $dfdExec)
{
  if(args && args.length){
    var da_options = args[0];
    if(da_options && da_options.method){
      var funcName = da_options.method.toLowerCase();

      if(this._driver && this._driver[funcName]){

        var $dfd = this._driver[funcName].call(this._driver, da_options);

        $dfd.done($dfdExec.resolve)
            .fail($dfdExec.reject);

      } else {
        throw new Error("DataAbstractionService : driver does not have method [",funcName,"]");
      }
    } else {
      throw new Error("DataAbstractionService._daoExecCallbackHandler() da_options does not have method");
    }
  }
}

module.exports = DataAbstractionService;

