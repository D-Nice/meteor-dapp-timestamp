var result = [];
var loadingTimeout = Session.get('publicNode') === true ? 500 : 200;

Template['components_timestampList'].onRendered(function () {
	var lastStamp = Session.get('lastStampIndex') - 1;
	
	//added typeof aug14th if bugs occur
	if (typeof lastStamp !== 'undefined' && Session.get('firstListRender') && Session.get('timestampLoadLock') !== true) {
		if (lastStamp > 0 && $(document).height() == $(window).height()) {
			Session.set('timestampLoadLock', true);
			timestampIterate(lastStamp, 0);
		}
	}

	Session.set('firstListRender', true);

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() >= $(document).height() - 200
			&& Session.get('timestampLoadLock') !== true) {

			Session.set('timestampLoadLock', true);
			timestampLoad();

		}
	});

	$(window).resize(function() {
		if($(window).scrollTop() + $(window).height() >= $(document).height() - 200
			&& Session.get('timestampLoadLock') !== true) {

			Session.set('timestampLoadLock', true);
			timestampLoad();

		}
	});
});

Template['components_timestampList'].events({
	'click button': function(event) {
		if ($(document).height() > $(window).height())
			$('div.dapp-flex-content').addClass('modal-shift');

		Helpers.timestampModalClick(this.index);	
	}
});

addTimestamp = function(stamp, i) {
	result.push({index: i + 1,
		owner: stamp[0], 
		blocktime: stamp[1].toNumber(),
		data: stamp[5]});

	Session.set('lastStampIndex', i);
}

timestampIterate = function(i, x) {
	timestampContractInstance.showTimestamps.call(i, function(error, response) {
		var thisTimestamp = response;
		var widthNow = currentWidthDivisor();

		x += 1;
		if (i > 0 && ($(document).height() == $(window).height() || x % widthNow != 0)) {
			addTimestamp(thisTimestamp, i);
			if (x >= widthNow) {
				Session.set('timestampDB', result);
				setTimeout(function() { timestampIterate(i - 1, 0); }, 0);
			}
			else {
				setTimeout(function() { timestampIterate(i - 1, x); }, loadingTimeout);
			}
		}
		else {
				addTimestamp(thisTimestamp, i);
				Session.set('timestampDB', result);
				Session.set('timestampLoadLock', false);

			return true;
		}
	});
}

var timestampLoad = _.throttle(function () {
	i = Session.get('lastStampIndex');
	i--;
	if (i < 0) {
		Session.set('timestampDB', result);
		return;
	}

	timestampContractInstance.showTimestamps.call(i, function(error, response) {
		var thisTimestamp = response;
		addTimestamp(thisTimestamp, i);

		Session.set('timestampDB', result);

		if ((Session.get('timestampLengthSaved') - i) % currentWidthDivisor() != 0) {
			timestampLoad();
		}
		else {
			Session.set('timestampLoadLock', false);
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				Session.set('timestampLoadLock', true)
				timestampLoad();
			}
		}
	});
}, loadingTimeout);

var currentWidthDivisor = function () {
	var w = window.innerWidth;
	if (w >= 960)
		return 3;
	else if (w >= 660)
		return 2;
	else
		return 1;
}

Template['components_timestampList'].helpers({
	'timestampLength': function() {
		if(Session.get('timestampLengthSaved') === undefined)
			Session.set('timestampLengthSaved', timestampContractInstance.getCallbackLength().toNumber());
		return Session.get('timestampLengthSaved') - 1;
	},
	'timestampDisplayLength': function() {
		return Session.get('timestampLengthSaved');
	},
	'timestampIndex': function (i) {
		return Session.get('timestampLengthSaved') - i;
	},
	'timeReady': function() {
		return Session.get('timeReady');
	},
	'timestampList': function(i) {
		if(Session.get('initialLoad') !== true && Session.get('timestampLoadLock') !== true) {

			Session.set('initialLoad', true);
			Session.set('timestampLoadLock', true);

			if (result != 'undefined')
				i -= result.length;

			setTimeout(function () { timestampIterate(i, 0); }, 0);
		};
		
		return Session.get('timestampDB');
	},
	'convertTime': function(unixTime) {
		var humanTime = new Date(unixTime * 1000);
		return humanTime.toLocaleString();
	}
});
