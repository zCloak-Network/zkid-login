"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

class Events {
  #eventemitter = new _eventemitter.default();
  emit(type) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return this.#eventemitter.emit(type, ...args);
  }
  on(type, handler) {
    this.#eventemitter.on(type, handler);
    return this;
  }
  off(type, handler) {
    this.#eventemitter.removeListener(type, handler);
    return this;
  }
  once(type, handler) {
    this.#eventemitter.once(type, handler);
    return this;
  }
}
exports.Events = Events;