const $ = require('jquery')

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType === 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType === 3) { // text
		obj = xml.nodeValue;
	} else if (xml.nodeType === 4) {
        obj = xml.nodeValue
    }

	// do children
    // If just one text node inside
    
	if ("hasChildNodes" in xml && xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if ("hasChildNodes" in xml && xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) === "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) === "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}




$.get("http://mbmbam.libsyn.com/rss",r => {
    const thing = xmlToJson(r)
    console.log(thing)

})

$.get("http://feed.thisamericanlife.org/talpodcast?format=xml",r => {
    console.log(xmlToJson(r))
})

$.get("http://feeds.feedburner.com/dancarlin/history?format=xml",r => {
    console.log(xmlToJson(r))
})

$.get("http://wtfpod.libsyn.com/rss?format=xml",r => {
    console.log(xmlToJson(r))
})

$.get("https://rss.art19.com/the-bill-simmons-podcast?format=xml",r => {
    console.log(xmlToJson(r))
})


$.get("https://www.giantbomb.com/podcast-xml/beastcast/?format=xml",r => {
    console.log(xmlToJson(r))
})

$.get("http://feeds.feedburner.com/theangrychicken?format=xml",r => {
    console.log(xmlToJson(r))
})

$.get("http://feeds.frogpants.com/boop_feed.xml?format=xml",r => {
    console.log(xmlToJson(r))
})