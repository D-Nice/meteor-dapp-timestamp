 var thisModalStamp;

Template['components_timestampListModal'].onCreated(function () {
	Session.set('enableThisHTML', false);

	thisModalStamp = timestampContractInstance.showTimestamps.call(Session.get('timestampDBIndex'));

});

Template['components_timestampListModal'].onDestroyed(function () {
	$('div.dapp-flex-content').removeClass('modal-shift');
	
	if(window.location.pathname === '/find')
		window.history.pushState('', '', '/find');
});

Template['components_timestampListModal'].events({
 	'click button[data-action=toggleHTML]': function(e, t){
        Session.get('enableThisHTML') !== true ? Session.set('enableThisHTML', true) : Session.set('enableThisHTML', false);
	}
});

Template['components_timestampListModal'].helpers({
	'stampLoaded': function() {
		return typeof(thisModalStamp) !== 'undefined' ? true : false;
	},
	'getIndex': function() {
		return Session.get('timestampDBIndex');
	},
	'getTime': function() {
		return thisModalStamp[1];
	},
	'getOwner': function() {
		return thisModalStamp[0];
	},
	'getStorage': function() {
		return thisModalStamp[5];
	},
	'hasHTML': function() {
		return (thisModalStamp[5].substr(0, 6) === "HTML: ") ? true : false;
	},
	'getThisHTML': function() {
		return Session.get('enableThisHTML');
	},
	'toggleThisHTML': function() {
		Session.get('enableThisHTML') !== true ? Session.set('enableThisHTML', true) : Session.set('enableThisHTML', false);
	},
	'returnValues': function() {
		var result = [];
		var args = ["owner", "blockTime", "oracleTime", "oracleURL", "ipfsProof"]
		var tempVal;

		for (i = 0; i < args.length; i++) {
			tempVal = thisModalStamp[i];

			if (typeof(tempVal) === "object")
				tempVal = tempVal.toNumber();

			if (i === 2 && tempVal === 0)
				break;
			/*else if (i === 3)
				tempVal = tempVal.match(/(?:\()(.*)(?:\))/)[1];*/ //Had to be disabled due to getCustomFunction
			else if (i === 4) {
				if (tempVal === "0x")
					break;
				tempVal = Base58.encode(new Buffer(tempVal.slice(2), 'hex'));
			}
			result.push({ key: args[i], value: tempVal });
		}
		return result;
	}
});
