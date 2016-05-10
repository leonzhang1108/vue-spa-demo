/**
 * Created by 2016/05/10
 */
'use strict';
var ES = require("../common/ui.js");
var interfacePort  = {};
interfacePort.get = function (id){		
	return ES.ui.get(id);
};

interfacePort.select = function (id){		
	return ES.ui.select({
		el:id
	});
};

interfacePort.slider = function (id, itemWidth, itemHeight, tailOffset, transType){		
	return ES.ui.slider(id, itemWidth, itemHeight, tailOffset, transType);
};

interfacePort.input = function (id){		
	return ES.ui.input({
		el:id
	});
};

interfacePort.input_filter = function (id){		
	return ES.ui.input_filter({
		el:id
	});
};

interfacePort.input_port = function (id){		
	return ES.ui.input_port({
		el:id
	});
};

interfacePort.input_city = function (id){		
	return ES.ui.input_city({
		el:id
	});
};

interfacePort.mvx = ES.mvx;

module.exports = interfacePort;