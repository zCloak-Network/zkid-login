"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZkidWalletProvider = void 0;
var _Provider = require("./base/Provider");
var _window;
const zkid = (_window = window) == null ? void 0 : _window.zkid;
class ZkidWalletProvider extends _Provider.BaseProvider {
  static isInstalled() {
    return !!window.zkid;
  }
  constructor() {
    var _zkid$on, _zkid$on2, _zkid$on3;
    if (!zkid) throw new Error('Zkid Wallet not install');
    super(zkid.request);
    (_zkid$on = zkid.on) == null ? void 0 : _zkid$on.call(zkid, 'did_changed', this.#didChanged);
    (_zkid$on2 = zkid.on) == null ? void 0 : _zkid$on2.call(zkid, 'lock', this.#lock);
    (_zkid$on3 = zkid.on) == null ? void 0 : _zkid$on3.call(zkid, 'unlock', this.#unlock);
  }
  #didChanged = (() => {
    var _this = this;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this.emit('did_changed', ...args);
    };
  })();
  #lock = () => {
    this.emit('lock');
  };
  #unlock = () => {
    this.emit('unlock');
  };
  importCredential(data) {
    return zkid.request('credential_import', {
      credential: data
    });
  }
}
exports.ZkidWalletProvider = ZkidWalletProvider;