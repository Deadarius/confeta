'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createInstance;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $env = Symbol('env');
var $separator = Symbol('separator');

var ConfetaEnv = function () {
  function ConfetaEnv() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ConfetaEnv);

    var prefix = options.prefix || '';
    this[$separator] = options.separator || '.';
    this[$env] = Object.keys(process.env).filter(function (x) {
      return x.startsWith(prefix);
    }).reduce(function (sum, key) {
      var keyWithoutPrefix = key.slice(prefix.length, key.length);
      sum[keyWithoutPrefix] = process.env[key];

      return sum;
    }, {});
  }

  _createClass(ConfetaEnv, [{
    key: 'get',
    value: function get(segments) {
      var path = segments.join(this[$separator]);

      return this[$env][path];
    }
  }]);

  return ConfetaEnv;
}();

function createInstance(options) {
  return new ConfetaEnv(options);
}