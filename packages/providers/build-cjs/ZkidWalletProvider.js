"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZkidWalletProvider = void 0;
var _Provider = require("./base/Provider");
var _window;
const injectWindow = (_window = window) == null ? void 0 : _window.zkid;
class ZkidWalletProvider extends _Provider.BaseProvider {
  static isInstalled() {
    return !!window.zkid;
  }
  constructor() {
    var _injectWindow$zkid$ev, _injectWindow$zkid$ev2, _injectWindow$zkid$ev3, _injectWindow$zkid$ev4, _injectWindow$zkid$ev5, _injectWindow$zkid$ev6;
    if (!injectWindow.zkid) throw new Error('Zkid Wallet not install');
    super(injectWindow.zkid.request);
    (_injectWindow$zkid$ev = (_injectWindow$zkid$ev2 = injectWindow.zkid.events).on) == null ? void 0 : _injectWindow$zkid$ev.call(_injectWindow$zkid$ev2, 'zkID_Wallet_didLoggedChanged', this.#didChanged);
    (_injectWindow$zkid$ev3 = (_injectWindow$zkid$ev4 = injectWindow.zkid.events).on) == null ? void 0 : _injectWindow$zkid$ev3.call(_injectWindow$zkid$ev4, 'zkID_Wallet_lock', this.#lock);
    (_injectWindow$zkid$ev5 = (_injectWindow$zkid$ev6 = injectWindow.zkid.events).on) == null ? void 0 : _injectWindow$zkid$ev5.call(_injectWindow$zkid$ev6, 'zkID_Wallet_unlock', this.#unlock);
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
    var _injectWindow$zkid;
    return (_injectWindow$zkid = injectWindow.zkid) == null ? void 0 : _injectWindow$zkid.request('credential_import', {
      credential: data
    });
  }
  generateZkp(option) {
    var _injectWindow$zkid2;
    return (_injectWindow$zkid2 = injectWindow.zkid) == null ? void 0 : _injectWindow$zkid2.request('proof_generate', option);
  }
}
exports.ZkidWalletProvider = ZkidWalletProvider;