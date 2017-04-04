this["JST"] = this["JST"] || {};

this["JST"]["Controls"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"opened\">Открыто:<span class=\"opened-value\">" + (jade.escape(null == (jade_interp = "0") ? "" : jade_interp)) + "</span></div>\n<button id=\"resetButton\" class=\"btn\">" + (jade.escape(null == (jade_interp = "Сбросить") ? "" : jade_interp)) + "</button>");;return buf.join("");
};