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
    var _zkid$events$on, _zkid$events, _zkid$events$on2, _zkid$events2, _zkid$events$on3, _zkid$events3;
    if (!zkid) throw new Error('Zkid Wallet not install');
    super(zkid.request);
    (_zkid$events$on = (_zkid$events = zkid.events).on) == null ? void 0 : _zkid$events$on.call(_zkid$events, 'zkID_Wallet_didLoggedChanged', this.#didChanged);
    (_zkid$events$on2 = (_zkid$events2 = zkid.events).on) == null ? void 0 : _zkid$events$on2.call(_zkid$events2, 'zkID_Wallet_lock', this.#lock);
    (_zkid$events$on3 = (_zkid$events3 = zkid.events).on) == null ? void 0 : _zkid$events$on3.call(_zkid$events3, 'zkID_Wallet_unlock', this.#unlock);
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
  generateZkp(option) {
    return zkid.request('proof_generate', option);
  }
}
exports.ZkidWalletProvider = ZkidWalletProvider;