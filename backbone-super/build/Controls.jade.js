this["JST"] = this["JST"] || {};

this["JST"]["Controls"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (openedCount) {
var jade_indent = [];
buf.push("\n<div class=\"opened\">Открыто:<span class=\"opened-value\">" + (jade.escape(null == (jade_interp = openedCount) ? "" : jade_interp)) + "</span></div>\n<button id=\"resetButton\" class=\"btn\">" + (jade.escape(null == (jade_interp = "Сбросить") ? "" : jade_interp)) + "</button>");}.call(this,"openedCount" in locals_for_with?locals_for_with.openedCount:typeof openedCount!=="undefined"?openedCount:undefined));;return buf.join("");
};