'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Confeta, [null].concat(args)))();
};

var _buildConfig = require('./build-config');

var _buildConfig2 = _interopRequireDefault(_buildConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $sources = Symbol('sources');
var $schema = Symbol('schema');
var $options = Symbol('options');

var Confeta = function () {
  function Confeta(schema) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Confeta);

    this[$schema] = schema;
    this[$sources] = [];
    this[$options] = options;
  }

  _createClass(Confeta, [{
    key: 'addSource',
    value: function addSource(instance) {
      var mapKey = arguments.length <= 1 || arguments[1] === undefined ? function (x) {
        return x;
      } : arguments[1];

      this[$sources].push({
        instance: instance,
        mapKey: mapKey
      });

      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      var _this = this;

      return (0, _buildConfig2.default)(this[$schema], function (segments) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this[$sources][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var source = _step.value;
            var instance = source.instance;
            var mapKey = source.mapKey;


            var mappedSegments = segments.map(mapKey);

            var value = instance.get(mappedSegments);

            if (value) {
              return value;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }, this[$options]);
    }
  }]);

  return Confeta;
}();