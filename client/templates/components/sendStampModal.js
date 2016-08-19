var funcToCall;
var loadingTimeout = (Session.get('publicNode') === true) ? 1000 : 0;
var accountProvider;
var fetchedGasPrice;

Template['components_sendStampModal'].onCreated(function() {
	var localLogicInstance;
	if (Session.get('metaMask') === true) {
		localLogicInstance = metaMask.eth.contract(contractJsonLogic).at(timestampLogicResolvedAddress);
		accountProvider = metaMask.eth.accounts;
	}
	else {
		localLogicInstance = timestampLogicInstance;
		accountProvider = web3.eth.accounts;
	}

	web3.eth.getGasPrice(function(err, res) { 
		if (err)
			console.log('getGasPrice error: ' + err);
		else 
			fetchedGasPrice = res;
	});

	funcToCall = Session.get('stampModalId') === "stampBlock" ? localLogicInstance.getBlockTimeOnly : localLogicInstance.getTime;
	funcToCall.estimateGas("", function(err, res) { 
		if (err)
			console.log('estimateGas error: ' + err);
		else
			Session.set('gasCost', res);
	});
	Session.set('lockStampModal', false);
	getExchange();
});

Template['components_sendStampModal'].onDestroyed(function () {
	$('div.dapp-flex-content').removeClass('modal-shift');
});

Template['components_sendStampModal'].events({
	'keyup #stampText': _.throttle(function () {
		funcToCall.estimateGas($("#stampText").val(), function(err, res) {
			if (err)
				console.log('estimateGas error: ' + err);
			else
				Session.set('gasCost', res);
		});
	}, loadingTimeout),
	'click #stampSubmit': function () {
		var txArgs = $("#stampText").val();

		if ((Session.get('publicNode') === true && Session.get('metaMask') !== true) || accountProvider.length === 0) {
			var ethSendString = "eth.sendTransaction({from: eth.accounts[0], value: " + Session.get('stampModalValue') + ", to: '" + timestampLogicInstance.address + "', gas: " + (Session.get('gasCost') + 200000) + ", data: '" + funcToCall.getData(txArgs) + "'})";
			Helpers.copyToClipboard(ethSendString);
		}
		else {
			funcToCall.sendTransaction(txArgs, {
            from: accountProvider[Session.get('selectedAccount')],
            value: Session.get('stampModalValue'),
            gas: Session.get('gasCost') + 200000 }, function(error, txHash) {
            	if (error)
            		alert(error); 
            	else {
            		Session.set('lockStampModal', true);
            		Session.set('txReceipt', txHash);
            	}
            });
		}
	}
});

var getExchange = function() {
	HTTP.call('GET', 'https://api.etherscan.io/api?module=stats&action=ethprice', function (error, response) {
		if (error)
            console.log(error);
        else 
        	Session.set('exchangeRate', response.data.result.ethusd);
	});
}

Template['components_sendStampModal'].helpers({
	modalTitle: function () {
		var id = Session.get('stampModalId');
		if (id === "stampBlock")
			return "Blockchain Timestamp";
		else
			return id === "stampProof" ? "Oracle Time with Proof" : "Oracle Timestamp";
	},
	estimatedGas: function () {
		return Session.get('gasCost');
	},
	etherCost: function () {
		Session.set('ethCost', (parseInt(Session.get('stampModalValue')) + (fetchedGasPrice * Session.get('gasCost'))) / (Math.pow(10, 18)));
		return Session.get('ethCost');
	},
	usdCost: function () {
		return Session.get('ethCost') * Session.get('exchangeRate');
	},
	checkLock: function () {
		return Session.get('lockStampModal');
	},
	getTx: function () {
		return Session.get('txReceipt');
	}
});

