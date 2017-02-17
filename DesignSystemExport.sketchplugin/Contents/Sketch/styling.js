/**
 *  Generates a colour object with the shape
 *  { r: #, g: #, b: # }
 *  
 *  Where these contain the hex codes for the relevant channels
 * 
 *  @param {string} stringColour
 */

function constructColourFactory(stringColour) {
	var rRaw = stringColour.slice(stringColour.indexOf('r:') + 2, stringColour.indexOf('g'));
	var gRaw = stringColour.slice(stringColour.indexOf('g:') + 2, stringColour.indexOf('b'));
	var bRaw = stringColour.slice(stringColour.indexOf('b:') + 2, stringColour.indexOf('a'));

	var realColours = {
		r: Math.floor(Number(rRaw) * 255),
		g: Math.floor(Number(gRaw) * 255),
		b: Math.floor(Number(bRaw) * 255)
	};

	return rgbToHex(realColours.r, realColours.g, realColours.b);
}


/**
 *  Gets the fill colour of a layer
 * 
 *  @param {Object} layer
 */

function getFillColour(layer) {
	var fillColour;

	if (layer instanceof MSTextLayer) {
		alert('alignment', layer.textAlignment());
		fillColour = String(layer.textColor());
	} else {
		fillColour = String(layer.style().fills().firstObject().color());
	}

	return constructColourFactory(fillColour);
}


/**
 *  Gets the stroke colour of a layer
 * 
 *  @param {Object} layer
 */

function getStrokeColour(layer) {
	var strokeColour = String(layer.style().borders().firstObject().color());
	return constructColourFactory(strokeColour);
}


/**
 *  Converts r, g, b values to hex
 * 
 *  @param {string} r
 *  @param {string} g
 *  @param {string} b
 */

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function getColourData(layer) {
	// add the strings to the array
	var layerInfo = {
		fill: getFillColour(layer),
		stroke: getStrokeColour(layer)
	};

	return layerInfo;
}