/**
Template Controllers

@module Templates
*/

/**
The view2 template

@class [template] views_view2
@constructor
*/

Template['views_tech'].onCreated(function() {
	  Meta.setSuffix(TAPi18n.__("dapp.pages.tech.title"));
});

Template['views_tech'].onRendered(function () {
	Session.set("homeFaded", true);
});

Template['views_tech'].events({
	'click li': function(e) {
		var content = $(e.target).parent().parent().next();
		if (content.is(':hidden'))
			content.slideDown('slow');
		else
			content.slideUp('medium');
	}
});

Template['views_tech'].helpers({
	'logicAddress': function() {
		return timestampLogicResolvedAddress;
	},
	'showABI': function() {
		return JSON.stringify(contractJsonLogicUser);
	}
});
