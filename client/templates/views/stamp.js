// When the template is created
Template['views_stamp'].onCreated(function() {
	Meta.setSuffix(TAPi18n.__("dapp.pages.stamp.title"));
});

Template['views_stamp'].onRendered(function () {
	Session.set("homeFaded", true);
});