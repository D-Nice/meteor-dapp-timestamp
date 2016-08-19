// When the template is created
Template['views_find'].onCreated(function() {
	Meta.setSuffix(TAPi18n.__("dapp.pages.find.title"));
});

Template['views_find'].onRendered(function () {
	$(window).scrollTop(0);
	Session.set("homeFaded", true);
});