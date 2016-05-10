/**
 * Created by 2016/05/10
 */
'use strict';
var ES = require("../common/ui.js");
var interfacePort  = {};
interfacePort.get = function (id){		
	return ES.ui.get(id);
};

interfacePort.select = function (config){
	return ES.ui.select(config);
};

interfacePort.slider = function (config){
	return ES.ui.slider(config);
};

interfacePort.input = function (config){
	return ES.ui.input(config);
};

interfacePort.input_filter = function (config){
	return ES.ui.input_filter(config);
};

interfacePort.input_port = function (config){
	return ES.ui.input_port(config);
};

interfacePort.input_city = function (config){
	return ES.ui.input_city(config);
};

interfacePort.mvx = ES.mvx;

module.exports = interfacePort;