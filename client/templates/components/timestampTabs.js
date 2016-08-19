var metaTags = ["HTML:", "PREDICT:", "SHA-2:", "SHA-3", "Keccak:", "MD5:"];
var metaTagColor = ["#828282", "#74C366", "#6495ED", "#6495ED", "#6495ED", "#6495ED"];
var lastIndex;

Template['components_timestampTabs'].helpers({
	'metaCheck': function(data) {
		for (var i = 0; i < metaTags.length; i++) {
			if(data.startsWith(metaTags[i])) {
				lastIndex = i;
				return true;
			}
		}
		return false;
	},
	'metaPrefix': function(data) {
		return data.substr(0, metaTags[lastIndex].length - 1);
	},
	'metaColor': function() {
		return metaTagColor[lastIndex];
	},
	'metaData': function(data) {
		return data.substr(metaTags[lastIndex].length);
	}
});