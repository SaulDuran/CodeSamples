/**
 * Created by goat on 2015-03-24.
 */

var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
var DaoExec = require('./DaoExec');


var METHODS = {
  SET: "SET",
  GET: "GET",
  DELETE: "DELETE",
  SEARCH: "SEARCH"
};


function getIsoDateFromMixed(mixed)
{
  var _date = false;
  if(mixed && mixed.toDate && typeof mixed.toDate === "function"){
    _date = mixed.toDate();
  } else if(mixed instanceof Date){
    _date = mixed;
  } else if(typeof mixed === "string"){
    _date = new Date(mixed);
  }

  if(_date !== false){
    var iso_string = _date.toISOString();
    //iso_string = iso_string
  }
  return false;
};



function DataAccessObject(options, dao_exec_instance, dao_exec_ctx){

  this._da_options = {
    method: false,
    data: false,
    uuid: false,
    search: false,
    startdate: false,
    enddate: false,
    maxresults: false, // replaced by limit, here for legacy
    limit: false,
    offset: false,
    page: false, // replaced by offset, here for legacy
    type: false,
    typeClass: false
  };

  this._da_prev_options = false;

  this._config = {
    type: false,
    typeClass: false
  };

  this._dao_exec = false;
  this._dao_exec_context = false;



  if(options && options.type && options.typeClass){
    this._config.type = options.type;
    this._config.typeClass = options.typeClass;
    this._da_options.type = options.type;
    this._da_options.typeClass = options.typeClass;
  } else {
    throw new Error("DataAccessObject must be provided with 'type' and 'typeClass' options");
  }

  if(dao_exec_instance instanceof DaoExec){
    this._dao_exec = dao_exec_instance;
    this._dao_exec_context = dao_exec_ctx;
  } else {
    throw new Error("DataAccessObject : dao_exec_instance must be instance of DaoExec");
  }



  /***
   * @method set
   *
   * @returns {DataAccessObject}
   */
  this.set = function()
  {
    this._da_options.method = METHODS.SET;

    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(args.length === 1){
        this._da_options.data = args[0];
      } else if(args.length > 1){
        var data_arr = [];
        for(var i=0; i<args.length; ++i){
          if(typeof args[i] === "object"){
            data_arr.push(args[i]);
          }
        }
        this._da_options.data = data_arr;
      }
    } else {
      throw new Error("DAO.set method must be called with data to set");
    }

    return this;
  };


  /***
   * @method get
   *
   * @returns {DataAccessObject}
   */
  this.get = function()
  {
    this._da_options.method = METHODS.GET;

    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(args.length === 1){
        if(typeof args[0] === "string"){
          this._da_options.uuid = args[0];
        } else {
          throw new Error("argument provided to DAO.get must be UUID of type string");
        }
      } else if(args.length > 1){
        // ???
      }
    } else {
      // get the collection

    }

    return this;
  };


  /***
   * @method delete
   *
   * @returns {DataAccessObject}
   */
  this.delete = function()
  {
    this._da_options.method = METHODS.DELETE;

    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(args.length >= 1){
        if(typeof args[0] === "string"){
          this._da_options.uuid = args[0];
        } else {
          throw new Error("DAO.delete must be called with a UUID of type string");
        }
      }
    } else {
      // in future maybe delete the collection?? for now throw error
      throw new Error("DAO.delete must be called with a UUID of type string");
    }

    return this;
  };


  /***
   * @method search
   *
   * @returns {DataAccessObject}
   */
  this.search = function()
  {
    this._da_options.method = METHODS.SEARCH;

    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(args.length >= 1){
        if(typeof args[0] === "object"){
          if(args[0] && args[0].queryString){
            this._da_options.search = args[0];
          } else {
            throw new Error("DAO.search must be called with a searchOptions object containing queryString");
          }
        } else {
          throw new Error("DAO.search must be called with a searchOptions object containing queryString");
        }
      }
    } else {
      throw new Error("DAO.search must be called with a searchOptions object containing queryString");
    }

    return this;
  };


  this.aggregate = function ()
  {
    this._da_options.aggregate=true;
    return this;
  };


  this.startDate = function (startDate)
  {
    var isValidDate = function(dateString){
      var d = new Date(dateString);
      return (_.isDate(d) && d.getTime() !== NaN);
    }

    if (isValidDate(startDate)) {
	    this._da_options.startdate = startDate;
    } else {
	    throw new Error("DAO.startDate : the startDate provided is not valid");
    }
    return this;
  };


  /***
   * @method betweenDates
   *
   * @returns {DataAccessObject}
   */
  this.betweenDates = function()
  {
    var isValidDate = function(dateString){
      var d = new Date(dateString);
      return (_.isDate(d) && d.getTime() !== NaN);
    }

    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(args.length === 1){
        if(isValidDate(args[0])){
          this._da_options.startdate = args[0];
          this._da_options.enddate   = (new Date()).toISOString();
        } else {
          throw new Error("DAO.betweenDates : the start date provided is not valid");
        }
      } else if(args.length === 2){
        if(isValidDate(args[0]) && isValidDate(args[1])){
          this._da_options.startdate = args[0];
          this._da_options.enddate   = args[1];
        } else {
          throw new Error("DAO.betweenDates : the start and/or end date provided is not valid");
        }
      }
    } else {
      throw new Error("DAO.betweenDates : must be called with start date and optional end date");
    }

    return this;
  };


  /***
   * @method maxResults
   *
   * @returns {DataAccessObject}
   */
  this.maxResults = function()
  {
    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(typeof args[0] === "number"){
        this._da_options.maxresults = args[0];
      } else {
        throw new Error("DAO.maxResults : must be called with numeric value");
      }
    } else {
      throw new Error("DAO.maxResults : must be called with numeric value");
    }
    return this;
  };


  /***
   * @method limit
   *
   * @returns {DataAccessObject}
   */
  this.limit = function()
  {
    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(typeof args[0] === "number"){
        this._da_options.limit = args[0];
      } else {
        throw new Error("DAO.limit : must be called with numeric value");
      }
    } else {
      throw new Error("DAO.limit : must be called with numeric value");
    }
    return this;
  };

  /***
   * @method page
   *
   * @returns {DataAccessObject}
   */
  this.page = function()
  {
    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(typeof args[0] === "number"){
        this._da_options.page = args[0];
      } else {
        throw new Error("DAO.page : must be called with numeric value");
      }
    } else {
      throw new Error("DAO.page : must be called with numeric value");
    }
    return this;
  };

  /***
   * @method offset
   *
   * @returns {DataAccessObject}
   */
  this.offset = function()
  {
    var args = Array.prototype.slice.call(arguments);
    if(args.length){
      if(typeof args[0] === "number"){
        this._da_options.offset = args[0];
      } else {
        throw new Error("DAO.offset : must be called with numeric value");
      }
    } else {
      throw new Error("DAO.offset : must be called with numeric value");
    }
    return this;
  };


  /***
   * @method exec
   *
   * @returns {promise}
   */
  this.exec = function()
  {
    var da_options_clone = _.cloneDeep(this._da_options)
    var promise = this._dao_exec.exec(da_options_clone);

    this._da_prev_options = da_options_clone;
    this._resetDataAccessOptions();

    return promise;
  };



  this._resetDataAccessOptions = function()
  {
    this._da_options.method     = false;
    this._da_options.data       = false;
    this._da_options.uuid       = false;
    this._da_options.search     = false;
    this._da_options.startdate  = false;
    this._da_options.enddate    = false;
    this._da_options.maxresults = false;
    this._da_options.page       = false;
    this._da_options.aggregate  = false;
  };



  this.getType = function()
  {
    return this._config.type;
  }


  this.getTypeClass = function()
  {
    return this._config.typeClass;
  }
}

module.exports = DataAccessObject;
