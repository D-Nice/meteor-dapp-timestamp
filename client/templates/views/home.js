
Template['views_home'].helpers({
    /**
    Get the name

    @method (name)
    */
});

// When the template is created
Template['views_home'].onCreated(function(){
	Meta.setSuffix("Timestamp Authority ÐApp");
});

Template['views_home'].onRendered(function(){
	$(window).scrollTop(0);
	$('#prepare_fade').css('opacity', '1');
	if(Session.get("homeFaded") !== true) {
		$("#fade_one").addClass("fade-in one");
		$("#fade_two").addClass("fade-in two");
		$("#fade_three").addClass("fade-in three");
		$("#fade_four").addClass("fade-in four");
		Session.set("homeFaded", true);
	}
});
