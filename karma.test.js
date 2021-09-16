const { merge } = require("webpack-merge");
const common = require('./karma.common.js');
const puppeteer = require('puppeteer');

module.exports = function(config) {
	config.set(merge(common, {
		logLevel : config.LOG_INFO,
		browsers : [ 'ChromeHeadless' ],
		autoWatch : true,
		singleRun : true,
		concurrency : Infinity
	}))
}
