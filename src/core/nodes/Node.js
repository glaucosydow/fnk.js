// ================================================================================================================
// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

FNK.Node = function() {
	this.setInitialData();
	this.createParameters();
	this.populateParameters();
	this.createConnectors();
	this.populateConnectors();
};

FNK.Node.prototype = {};
FNK.Node.prototype.constructor = FNK.Node;


// ================================================================================================================
// STATIC properties ----------------------------------------------------------------------------------------------

// Constants
FNK.Node.CONNECTOR_ID_INPUT = "input";
FNK.Node.CONNECTOR_ID_OUTPUT = "output";
FNK.Node.CONNECTOR_ID_SEPARATOR = "-";



// ================================================================================================================
// INTERNAL interface ---------------------------------------------------------------------------------------------

FNK.Node.prototype.setInitialData = function() {
	// Static properties for rendering purposes
	//		public var renderingClass:Class;
	this.renderingCaption = "null";				// What's displayed on the node								"+"
	this.categoryType = "";					// Node category type (NOT the same as data type)			"Number"
	this.selectingCaption = "";				// What's the display name of the node, for selection		"+ (Number)"
			
	// Instance properties
	this.alwaysProcess = false;				// Whether it should always execute on every frame
	this.patch = undefined;					// Patch where this node is in
	this.needsProcess = true;					// Whether it needs processing (because something has changed and its result is dirty)

	this.inputConnectors = undefined;
	this.outputConnectors = undefined;
	this.parameters = undefined;
		
//		protected var HelpXML:Class;

	//renderingClass = VisibleNode;
	//categoryType = CategoryType.SYSTEM;
	//selectingCaption = renderingCaption + " ("+categoryType+")";
};

FNK.Node.prototype.createConnectors = function() {
	// Create lists of connectors
	this.inputConnectors = new FNK.ConnectorList();
	this.outputConnectors = new FNK.ConnectorList();
};

FNK.Node.prototype.populateConnectors = function() {
	// Actually populate the connector list with the expected connectors
	
};

FNK.Node.prototype.createParameters = function() {
	// Create list of parameters
	this.parameters = new FNK.ConnectorList();
};

FNK.Node.prototype.populateParameters = function() {
	// Actually populate the parameter list with the expected parameters
};


// ================================================================================================================
// PUBLIC interface -----------------------------------------------------------------------------------------------

FNK.Node.prototype.getInputConnector = function(__id) {
	return this.inputConnectors.getConnector(__id);
};

FNK.Node.prototype.getInputConnectorAt = function(__position) {
	return this.inputConnectors.getConnectorAt(__position);
};

FNK.Node.prototype.getInputConnectorIdAt = function(__position) {
	return this.inputConnectors.getConnectorIdAt(__position);
};

FNK.Node.prototype.getOutputConnector = function(__id) {
	return this.outputConnectors.getConnector(__id);
};

FNK.Node.prototype.getOutputConnectorAt = function(__position) {
	return this.outputConnectors.getConnectorAt(__position);
};

FNK.Node.prototype.getOutputConnectorIdAt = function(__position) {
	return this.outputConnectors.getConnectorIdAt(__position);
};

FNK.Node.prototype.getNumInputConnectors = function() {
	return this.inputConnectors.getNumConnectors();
};

FNK.Node.prototype.getNumOutputConnectors = function() {
	return this.outputConnectors.getNumConnectors();
};

FNK.Node.prototypedispose = function() {
	//dispatchEvent(new NodeEvent(NodeEvent.DISPOSE, this));
	this.patch = undefined;
	this.renderingClass = undefined;
	this.inputConnectors = undefined;
	this.outputConnectors = undefined;
};


// ================================================================================================================
// PROCESSING interface -------------------------------------------------------------------------------------------

FNK.Node.prototype.process = function() {
	if (this.alwaysProcess || this.inputConnectors.hasChangedAny || this.needsProcess) {
		// Actual processing
		this.innerProcess();
		this.dispatchValueChanges();
		this.resetChangeFlags();
	}
};

FNK.Node.prototype.innerProcess = function() {
	// Process the node, using the input and creating the output
};

FNK.Node.prototype.resetChangeFlags = function() {
	this.needsProcess = false;
	this.inputConnectors.resetChangeFlag();
	this.outputConnectors.resetChangeFlag();
};

FNK.Node.prototype.dispatchValueChanges = function() {
	this.dispatchChange();

	var i;
	var cn;
	for (i = 0; i < this.outputConnectors.numConnectors; i++) {
		cn = this.outputConnectors.getConnectorAt(i); 
		if (this.alwaysProcess || cn.hasChanged) {
			//dispatchEvent(new NodeEvent(NodeEvent.OUTPUT_CONNECTOR_VALUE_CHANGE, this, cn.id));
		}
	}
};

FNK.Node.prototype.dispatchChange = function() {
	//dispatchEvent(new NodeEvent(NodeEvent.VALUE_CHANGE, this));
};


// ================================================================================================================
// GENERIC interface ----------------------------------------------------------------------------------------------

FNK.Node.prototype.toString = function() {
	//return "[" + getQualifiedClassName(this) + "]";
	return "[" + this.renderingCaption + "]";
};

/*
public function get hasHelpPatch(): Boolean {
	return Boolean(HelpXML);
}

public function get helpPatchSource(): XML {
	if (hasHelpPatch) {
		var patchXML:XML = XML(new HelpXML());
		return patchXML;
	}
	return null;
}
*/
