// When the template is created
Template['views_list'].onCreated(function() {
	Meta.setSuffix(TAPi18n.__("dapp.pages.list.title"));
});

Template['views_list'].onRendered(function () {
	$(window).scrollTop(0);
	Session.set("homeFaded", true);
});