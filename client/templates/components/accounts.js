var accountProvider;

Template['components_accounts'].onCreated(function () {
	if(Session.get('metaMask') === true) {
		accountProvider = metaMask.eth.accounts;
	}
	else {
		accountProvider = web3.eth.accounts;
	}
});

Template['components_accounts'].onRendered(function () {
	highlightAccount(0);
});

Template['components_accounts'].events({
	'click .account-choice': function(event) {
		highlightAccount(event.currentTarget.id);
	}
});

Template['components_accounts'].helpers({
	accountList: function () {
		return accountProvider;
	},
	accountsExist: function () {
		return accountProvider.length === 0 ? false : true;
	},
	isPublicNode: function () {
		if (Session.get('metaMask') === true)
			return false;
		else
			return Session.get('publicNode');
	}
});

highlightAccount = function (i) {
	var oldId = Session.get('selectedAccount');

	if (typeof oldId !== 'undefined' && oldId !== i) 
		$('button.account-choice.chosen-account').removeClass("chosen-account");

	Session.set('selectedAccount', i);
	
	var acct = $('button[class=account-choice][id=' + i + ']');
	acct.addClass("chosen-account");
}