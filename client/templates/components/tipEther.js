var accountProvider;
var localLogicInstance;

Template['components_tipEther'].onCreated(function () {
	Session.set('tipReceipt', false);

    if (Session.get('metaMask') === true) {
        localLogicInstance = metaMask.eth.contract(contractJsonLogic).at(timestampLogicResolvedAddress);
        accountProvider = metaMask.eth.accounts;
    }
    else {
        localLogicInstance = timestampLogicInstance;
        accountProvider = web3.eth.accounts;
    }
});

Template['components_tipEther'].onRendered(function () {
	highlightAccount(0);
});

Template['components_tipEther'].events({
	'click .submit-btn': function(event) {
		event.preventDefault();
		if ((Session.get('publicNode') === true && Session.get('metaMask') !== true) || accountProvider.length === 0) {
			var ethSendString = "eth.sendTransaction({from: eth.accounts[0], value: web3.toWei(" + $('#tipAmount').val() + ", 'ether'), to: '" + timestampLogicInstance.address + "', gas: " + 200000 + ", data: '" + timestampLogicInstance.tipCreator.getData() + "'})";
			Helpers.copyToClipboard(ethSendString);
		}
		else {
			$('.submit-btn').prop('disabled', true);
			localLogicInstance.tipCreator.sendTransaction({
            from: accountProvider[Session.get('selectedAccount')],
            value: web3.toWei($('#tipAmount').val(), 'ether'),
            gas: 100000 }, function(error, txHash) {
            	if (error) {
            		$('.submit-btn').prop('disabled', false);
            		alert(error); 
            	}
            	else {
            		Session.set('lockStampModal', true);
            		Session.set('tipReceipt', txHash);
            		$('#tipAmount').prop('disabled', true);
            		$('.submit-btn').val("Tipped");
            		//alert("Requested timestamp \n Transaction receipt: " + txHash);
            	}
            });
		}
	},
	'keydown #tipAmount': function(e) {
		// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	}

});

Template['components_tipEther'].helpers({
	getTip: function() {
		return Session.get('tipReceipt');
	}
});

