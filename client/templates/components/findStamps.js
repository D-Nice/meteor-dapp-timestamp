var result = [];
var loadingTimeout = Session.get('publicNode') === true ? 50 : 0;

Template['components_findStamps'].onCreated(function() {
	var previousDB = Session.get('timestampSearchDB');
	if (typeof(previousDB) !== 'undefined')
		result = previousDB;

	var fetchedDB = Session.get('timestampDB');
	if (typeof(fetchedDB) !== 'undefined')
		if (fetchedDB.length > result.length)
			result = fetchedDB;

	if (typeof(Session.get('totalStamps')) === 'undefined') {
		Session.set('totalStamps', timestampContractInstance.getCallbackLength().toNumber());
	}
});

Template['components_findStamps'].onRendered(function () {

	Session.set('searchStart', false);
	Session.set('searching', false);

	stopLoading();

	var popupIndex = parseInt(window.location.search.substr(1));
	if(!isNaN(popupIndex) && popupIndex > 0 && popupIndex <= Session.get('totalStamps'))
		Helpers.timestampModalClick(popupIndex);
});

Template['components_findStamps'].onDestroyed(function() {
	Session.set('timestampSearchDB', result);
});

Template['components_findStamps'].events({
	'submit #searchForm': function(event) {
		event.preventDefault();
		if (Session.get('searching') === false) 
			search($("#searchText").val());
		else
			Session.set('stopSearch', true);
	    //return false;
	},
	'click button': function() {
		//shift the page, so page layout doesn't change from modal popup, when scrollbar disappears
		if ($(document).height() > $(window).height())
			$('div.dapp-flex-content').addClass('modal-shift');
		
		Helpers.timestampModalClick(this.index);
		window.history.pushState('', '', '/find?' + this.index);
	}
});

var search = function (input) {
    Session.set('timestampFoundDB', []);
    var totalStamps = Session.get('totalStamps');
    Session.set('searchStart', true);
    Session.set('searching', true);

    startLoading();

    recurseResults(0, input);
}

var recurseResults = function (i, input) {
	if (Session.get('stopSearch') === true) {
		stopLoading();
		Session.set('stopSearch', false);
		return;
	}

	Session.set('searchIndex', i);

	if (i < result.length) {
		listResults(result[i], input);
		i++;
		setTimeout(function () { recurseResults(i, input); }, 0);
	}
	else {
		var totalStamps = Session.get('totalStamps');
		if (i < totalStamps)
			populateDB(totalStamps - i - 1, input);
		else 
			stopLoading();

	}
}

var populateDB = _.throttle(function (i, input) {

	if (Session.get('stopSearch') === true) {
		stopLoading();
		Session.set('stopSearch', false);
		return;
	}

	var searchCounter = Session.get('searchIndex') + 1;
	Session.set('searchIndex', searchCounter);

	timestampContractInstance.showTimestamps.call(i, function(error, response) {
		if(error != null) { 
			console.log('populate error: ' + error);
			stopLoading();
		}
		else {
			var thisTimestamp = response;
			var formattedStamp = {index: i + 1,
				owner: thisTimestamp[0], 
				blocktime: thisTimestamp[1].toNumber(),
				data: thisTimestamp[5]};
			result.push(formattedStamp);
			listResults(formattedStamp, input);

			if (i > 0) {
				i--;
				populateDB(i, input);
			}
			else {
				stopLoading();
			}
		}
	});
}, loadingTimeout);

var listResults = function (stamp, input) {
	var stampString = stamp.owner + stamp.data + stamp.blocktime;

	if(stampString.search(new RegExp(input, "i")) !== -1) {
		var tempDB = Session.get('timestampFoundDB');
		tempDB.push(stamp);
		Session.set('timestampFoundDB', tempDB);
	}
}

var stopLoading = function () {
	Session.set('searching', false);
	$("main > div:first-of-type > div:first-child > div > div").each(function () {
		$(this).css("-webkit-animation", "none");
	    $(this).css("-moz-animation", "none");
	    $(this).css("-ms-animation", "none");
	    $(this).css("animation", "none");
	});
}

var startLoading = function () {
	$("main > div:first-of-type > div:first-child > div > div").each(function () {
		$(this).css("-webkit-animation", "");
	    $(this).css("-moz-animation", "");
	    $(this).css("-ms-animation", "");
	    $(this).css("animation", "");
	});
}

Template['components_findStamps'].helpers({
	'timestampFound': function() {
		return Session.get('timestampFoundDB');
	},
	'timestampFoundLength': function() {
		return Session.get('timestampFoundDB').length;
	},
	'matchCase': function() {
		return Session.get('timestampFoundDB').length === 1 ? "match" : "matches";
	},
	'convertTime': function(unixTime) {
		var humanTime = new Date(unixTime * 1000);
		return humanTime.toLocaleString();
	},
	'searchStarted': function() { 
		return Session.get('searchStart');
	},
	'searchTitle': function() {
		return Session.get('searching') ? "Stop" : "Find";
	},
	'searchIndex': function() {
		//searchIndex can be off by one, if just doing blank search
		return Math.max(Session.get('searchIndex'), Session.get('timestampFoundDB').length);
	}
});
