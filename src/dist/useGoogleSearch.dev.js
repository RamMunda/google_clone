"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _key = _interopRequireDefault(require("./key"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CONTEXT_KEY = "6d760e1bcdc952b13";

var useGoogleSearch = function useGoogleSearch(term) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  console.log('term', term);
  (0, _react.useEffect)(function () {
    var fetchdata = function fetchdata() {
      return regeneratorRuntime.async(function fetchdata$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fetch("https://www.googleapis.com/customsearch/v1?key=".concat(_key["default"], "&cx=").concat(CONTEXT_KEY, "&q=").concat(term)).then(function (response) {
                return response.json();
              }).then(function (result) {
                return setData(result);
              })["catch"](function (err) {
                return console.log("error", err);
              });
              console.log(data);
              fetch("https://www.googleapis.com/customsearch/v1?key=".concat(_key["default"], "&cx=").concat(CONTEXT_KEY, "&q=").concat(term, "&start=11&relatedSite={relatedSite?}")).then(function (response) {
                return response.json();
              }).then(function (result) {
                return console.log("result", result);
              })["catch"](function (err) {
                return console.log("error", err);
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    fetchdata();
  }, [term]);
  console.log(data);
  return {
    data: data
  };
};

var _default = useGoogleSearch;
exports["default"] = _default;