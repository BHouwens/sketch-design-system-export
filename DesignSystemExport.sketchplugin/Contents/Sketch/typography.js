@import 'utilities.js';

/**
 *  Gets the desired layer based on the value 
 *  of the text layer instead of the name
 * 
 *  @param {Object} layers
 *  @param {string} valueToFind
 */

function getLayerByText(layers, valueToFind) {
    if (layers.count()) {
        for (var i = 0; i < layers.count(); i++) {
            if (String(layers[i].stringValue()).indexOf(valueToFind) != -1) {
                return layers[i];
            }
        }
    }
}


/**
 *  Gets all relevant typographic info for a given
 *  layer
 * 
 *  @param {Object} layer
 */

function getTypeInfoForLayer(layer) {
    return {
        value: String(layer.stringValue()),
        size: String(layer.fontSize()),
        aligned: getSemanticAlignment(layer.textAlignment()),
        line_height: String(layer.lineHeight()),
        font: getFontName(String(layer.font()))
    }
}


/**
 *  MSTextLayer outputs alignment as a long primitive,
 *  so it needs to be converted to a text representation
 * 
 *  @param {number} alignment
 */

function getSemanticAlignment(alignment) {
    var map = ['left', 'right', 'centre', 'justified'];

    if (alignment <= map.length) {
        return map[alignment];
    }

    return 'unknown';
}


/**
 *  Gets the font name from the noisy font() 
 *  method in the MSTextLayer
 * 
 *  @param {string} fontString
 */

function getFontName(fontString) {
    return fontString.slice(0, fontString.indexOf(' ')).replace(/[^A-Z\-\_\s]/gi, '');
}
