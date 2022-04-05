"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uid = void 0;

var uid = function uid() {
  var timmy = Date.now().toString(36).toLocaleUpperCase();
  var randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randy = randy.toString(36).slice(0, 12).padStart(12, "0").toLocaleUpperCase();
  return "".concat(timmy, "-", randy);
};

exports.uid = uid;