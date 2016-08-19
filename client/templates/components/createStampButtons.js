var prices;

Template['components_createStampButtons'].onCreated(function() {

	if(typeof Session.get('updatedPrices') === 'undefined') {
		var text = "Fetching...";
		prices = [text, text];
		Session.set('updatedPrices', prices);
	}

	timestampLogicInstance.showPrices(pricesCallback);

	this.updatePrices = Meteor.setInterval(function() {
        timestampLogicInstance.showPrices(pricesCallback);
    }, 15 * 1000);

});

Template['components_createStampButtons'].onDestroyed(function() {
    Meteor.clearInterval(this.updatePrices);
});

Template['components_createStampButtons'].events({
	'click .stamp-button': function(event) {
		Session.set('stampModalId', event.currentTarget.id);
		Session.set('stampModalValue', event.currentTarget.value);
		if ($(document).height() > $(window).height())
			$('div.dapp-flex-content').addClass('modal-shift');
		
		EthElements.Modal.show('components_sendStampModal');
	}
});

var convertToNumbers = function(bigNumArray) {
	return [bigNumArray[0].toNumber(), bigNumArray[1].toNumber()];
}

var pricesCallback = function(err, res) {
	if (err) {
		console.log('pricesCallback error: ' + err);
	}
	else {
		prices = convertToNumbers(res);
		Session.set('updatedPrices', prices);
		if(typeof Session.get('loadedPrices') === 'undefined') {
			Session.set('loadedPrices', true);
		}
	}

}

Template['components_createStampButtons'].helpers({
	listPrices: function () {
		return Session.get('updatedPrices');
	},
	loadingPrice: function () {
		return Session.get('loadedPrices') === true ? true : false;
	},
	priceTitle: function (i) {
		return i === 0 ? "Basic" : "Proof";
	},
	formatEther: function (wei) {
	    return Session.get('loadedPrices') === true ? (wei / Math.pow(10,18)) : wei;
	}
});