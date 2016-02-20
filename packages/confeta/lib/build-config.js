'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _traverseSchema = require('./traverse-schema');

var _traverseSchema2 = _interopRequireDefault(_traverseSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildConfig(schema, getValue, options) {
  function throwIfStrict() {
    if (options.strict) {
      throw new Error('');
    }
  }

  var result = {};

  (0, _traverseSchema2.default)(schema, function (descriptor, segments) {
    var raw = getValue(segments);
    var value = raw;

    switch (descriptor.type) {
      case _types2.default.string:
        {
          if (typeof raw !== 'string') {
            throwIfStrict();

            value = '' + raw;
          }
          break;
        }
      case _types2.default.boolean:
        {
          if (typeof raw !== 'boolean') {
            throwIfStrict();

            value = raw === 'true';
          }
          break;
        }
      case _types2.default.integer:
        {
          if (typeof raw !== 'number') {
            throwIfStrict();

            value = parseInt(raw, 10);

            if (isNaN(value)) {
              throw new Error();
            }
          }
          break;
        }
      case _types2.default.float:
        {
          if (typeof setting !== 'number') {
            throwIfStrict();

            value = parseFloat(raw);
          }

          if (isNaN(value)) {
            throw new Error();
          }
          break;
        }
      case _types2.default.date:
        {
          if (!(raw instanceof Date)) {
            throwIfStrict();

            value = new Date(raw);
          }

          if (value.toString() === 'Invalid Date') {
            throw new Error();
          }
          break;
        }

      default:
        {
          throw new Error('');
        }
    }

    var key = segments.join('.');

    result[key] = value;
  });

  return result;
}

exports.default = buildConfig;