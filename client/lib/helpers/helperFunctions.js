/**
Helper functions

@module Helpers
**/

/**
The Helpers class containing helper functions

@class Helpers
@constructor
**/

Helpers = {};


/**
Reruns functions reactively, based on an interval. Use it like so:

    Helpers.rerun['10s'].tick();

@method (rerun)
**/

Helpers.rerun = {
    '10s': new ReactiveTimer(10)
};


/**
Clear localStorage

@method (getLocalStorageSize)
**/

Helpers.getLocalStorageSize = function(){

    var size = 0;
    if(localStorage) {
        _.each(Object.keys(localStorage), function(key){
            size += localStorage[key].length * 2 / 1024 / 1024;
        });
    }

    return size;
};



/**
Reactive wrapper for the moment package.

@method (moment)
@param {String} time    a date object passed to moment function.
@return {Object} the moment js package
**/

Helpers.moment = function(time){

    // react to language changes as well
    TAPi18n.getLanguage();

    if(_.isFinite(time) && moment.unix(time).isValid())
        return moment.unix(time);
    else
        return moment(time);

};


/**
Formats a timestamp to any format given.

    Helpers.formatTime(myTime, "YYYY-MM-DD")

@method (formatTime)
@param {String} time         The timstamp, can be string or unix format
@param {String} format       the format string, can also be "iso", to format to ISO string, or "fromnow"
@return {String} The formated time
**/

Helpers.formatTime = function(time, format) { //parameters
    
    // make sure not existing values are not Spacebars.kw
    if(format instanceof Spacebars.kw)
        format = null;

    if(time) {

        if(_.isString(format) && !_.isEmpty(format)) {

            if(format.toLowerCase() === 'iso')
                time = Helpers.moment(time).toISOString();
            else if(format.toLowerCase() === 'fromnow') {
                // make reactive updating
                Helpers.rerun['10s'].tick();
                time = Helpers.moment(time).fromNow();
            } else
                time = Helpers.moment(time).format(format);
        }

        return time;

    } else
        return '';
};

Helpers.getResolverAddress = function () {
    return '0x201bFAB09A473D4286cce0af77b04bc71b2a7aB6';
};

/**
Takes a camelcase and shows it with spaces
@method toSentence
@param {string} camelCase    A name in CamelCase or snake_case format
@return {string} sentence    The same name with spaces
**/
Helpers.toSentence = function (inputString, noHTML) {
    if (typeof inputString == 'undefined') 
        return false;
    inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
    if (noHTML === true) // only consider explicit true
        return inputString.replace(/([A-Z]+|[0-9]+)/g, ' $1').replace("_", "");
    else 
        return inputString.replace(/([A-Z]+|[0-9]+)/g, ' $1').replace("_", "").replace(/([\_])/g, '<span class="dapp-punctuation">$1</span>');
};

Helpers.timestampModalClick = function(i) {
    Session.set('timestampDBIndex', i - 1);
    EthElements.Modal.show('components_timestampListModal');
};

Helpers.copyToClipboard = function (text) {
    window.prompt("Press Ctrl+C to copy and paste into Geth console", text);
}