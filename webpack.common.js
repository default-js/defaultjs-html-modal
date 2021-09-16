const path = require("path");

const entries = {};
entries["module-bundle"] = "./index.js";
entries["browser-bundle"] = "./bundle-browser.js";
entries["standalone-bundle"] = "./bundle-standalone.js";

module.exports = {
	entry: entries,
	target: "web",
};
