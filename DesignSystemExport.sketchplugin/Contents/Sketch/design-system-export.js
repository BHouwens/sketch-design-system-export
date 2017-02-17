@import 'common.js';
@import 'styling.js';
@import 'utilities.js';

var onRun = function (context) {
	var doc = context.document;
	var pages = [doc pages];

	//allow xml to be written to the folder
	var fileTypes = [NSArray arrayWithObjects:@"json", nil];


	//create select folder window
	var panel = [NSOpenPanel openPanel];
	var file_path;

	[panel setCanChooseDirectories:true];
	[panel setCanCreateDirectories:true];
	[panel setAllowedFileTypes:fileTypes];

	var clicked = [panel runModal];

	//check if Ok has been clicked
	if (clicked == NSFileHandlingPanelOKButton) {
		var isDirectory = true;
		//get the folder path
		var firstURL = [[panel URLs] objectAtIndex:0];
		//format it to a string
		file_path = [NSString stringWithFormat:@"%@", firstURL];

		//remove the file:// path from string
		if (0 === file_path.indexOf("file://")) {
			file_path = file_path.substring(7);
		}
	}

	var pageName = [doc askForUserInput: 'What page should I look for your design system in?' initialValue: 'Styles'];
	var artboards = getLayerOrLayersByName(pages, pageName, true);

	var jsonObj = Object.assign({}, getSystemColours(artboards), getSystemTypography(artboards));

	exportJSON(jsonObj, file_path);
};


function exportJSON(layerData, file_path) {
	// Convert the object to a json string
	var file = NSString.stringWithString(JSON.stringify(layerData, null, "\t"));
	// Save the file
	[file writeToFile:file_path + "sketch_styles.json" atomically:true encoding:NSUTF8StringEncoding error:null];

	var alertMessage = "sketch_styles.json saved to: " + file_path;
	alert("Export Successful", alertMessage);

}