@import 'styling.js';
@import 'typography.js';


/**
 *  Retrieves all the layers for the artboards
 *  passed
 *  
 *  @param {Object} artboards
 */

function getLayers(artboards) {
    var layerArray = [];

    if (artboards.count()) {
        for (var j = 0; j < artboards.count(); j++) {
			var layers = artboards[j].layers();

			for (var k = 0; k < layers.count(); k++) {
				layerArray.push(layers[k]);
			}
		}
    }

    return layerArray;
}


/**
 *  Gets the layer/s specified by the needed name. Can choose 
 *  whether to return all child layers (set `areArtboards` to true) or
 *  just the layer itself
 * 
 *  @param {Object} layers
 *  @param {string} layerName
 *  @param {boolean} areArtboards
 */

function getLayerOrLayersByName(layers, layerName, areArtboards) {
    areArtboards = areArtboards || false;

    if (layers.count()) {
        for (var i = 0; i < layers.count(); i++) {
            if (String(layers[i].name()).toLowerCase().indexOf(layerName.toLowerCase()) != -1) {
                return areArtboards ? layers[i].layers() : layers[i];
            }
        }
    }

    return {};
}


/**
 *  Gets and constructs the colours for an 
 *  entire tools project
 * 
 *   @param {Object} artboards
 */

function getSystemColours(artboards) {
    var allColours = {};
	var layerArray = getLayerOrLayersByName(artboards, 'colou', true);

    if (layerArray.length) {
		for (var i = 0; i < layerArray.length; i++) {
			var name = String(layerArray[i].name());
            alert('name', name);
			allColours[name] = getFillColour(layerArray[i]);
		}
	}

    return { colours: allColours };
}


/** 
 *  Gets and constructs the typography for an 
 *  entire tools project
 * 
 *  @param {Object} artboards
 */

function getSystemTypography(artboards) {
    var allType = { };
    var typographyLayers = getLayerOrLayersByName(artboards, 'typ', true);

    if (typographyLayers.count()) {
        for (var i = 0; i < typographyLayers.count(); i++) {
            if (typographyLayers[i] instanceof MSTextLayer) {
                var name = String(typographyLayers[i].name());
                allType[name] = getTypeInfoForLayer(typographyLayers[i]);
            }
        }
    }

    return { typography: allType };
}