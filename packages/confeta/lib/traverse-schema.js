'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function traverseSchema(schema, fn) {
  var segments = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  for (var key in schema) {
    var deeperSegments = segments.slice(0); // clone segments
    deeperSegments.push(key);
    var descriptor = schema[key];

    var type = descriptor.type;


    if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && Object.keys(type).length > 0) {
      traverseSchema(type, fn, deeperSegments);
    } else {
      fn(descriptor, deeperSegments);
    }
  }
}

exports.default = traverseSchema;