/**
Helper functions

@module Helpers
**/

/**
Global template helpers

@class TemplateHelpers
@constructor
**/

/**
A simple template helper to log objects in the console.

@method (debug)
**/

Template.registerHelper('debug', function(object){
    console.log(object);
});



/**
Formats a timestamp to any format given.

    {{formatTime myTime "YYYY-MM-DD"}}

@method (formatTime)
@param {String} time         The timstamp, can be string or unix format
@param {String} format       the format string, can also be "iso", to format to ISO string, or "fromnow"
//@param {Boolean} realTime    Whether or not this helper should re-run every 10s
@return {String} The formated time
**/

Template.registerHelper('formatTime', Helpers.formatTime);


/**
Formats a number.

    {{formatNumber myNumber "0,0.0[0000]"}}

@method (formatNumber)
@param {String} number
@param {String} format       the format string
@return {String} The formatted number
**/

Template.registerHelper('formatNumber', function(number, format){
    if(format instanceof Spacebars.kw)
        format = null;

    if(number instanceof BigNumber)
        number = number.toNumber();

    format = format || '0,0.0[0000]';


    if(!_.isFinite(number))
        number = numeral().unformat(number);

    if(_.isFinite(number))
        return numeral(number).format(format);
});


Template.registerHelper('ifRouteIs', function (routeName) {
      return Router.current().route.getName() === routeName;
});

Template.registerHelper('web3IsConnected', function () {
    return web3.isConnected();
});

loadOnce = false; //may use this variable for loading geth proxy

Template.registerHelper('loadScreen', function () {
    if(!loadOnce) {
        loadOnce = true;
        return web3.isConnected();
    }
    return loadOnce;
});

Template.registerHelper('timestampListFunction', function (func, arg1) {
    return Template.components_timestampList.__helpers.get(func)(arg1);
});
    
Template.registerHelper('$', function () {
  return Helpers;
});