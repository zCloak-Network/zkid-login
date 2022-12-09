"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseProvider = void 0;
var _util = require("@polkadot/util");
var _Events = require("./Events");
// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

class BaseProvider extends _Events.Events {
  constructor(request) {
    super();
    this.request = request;
  }

  /**
   * Send request for auth.
   * @returns `Promise<boolean>`
   */
  requestAuth() {
    return this.request('wallet_requestAuth', undefined);
  }

  /**
   * Get if authed
   * @returns `Promise<boolean>`
   */
  isAuth() {
    return this.request('wallet_isAuth', undefined);
  }

  /**
   * Get the walelt is locked
   * @returns `Promise<boolean>`
   */
  isLocked() {
    return this.request('wallet_isLocked', undefined);
  }

  /**
   * Get current selected in wallet.
   * @returns `DidInfo` object.
   */
  getCurrentDid() {
    return this.request('did_getCurrent', undefined);
  }

  /**
   * request credential digest(login with credential digest).
   * @param challenge a random string
   * @param ctypehash the ctypehash of credential, if passed, wallet will only return the same credential with `ctypehash`
   * @param attester the attester of credential, if passed, wallet will only return the attested credential by `attester`
   * @returns `RequestCredentialDigestReponse`
   */
  requestCredentialDigest(challenge, ctypehash, attester) {
    return this.request('did_requestCredentialDigest', {
      challenge,
      ctypehash,
      attester
    });
  }
  requestCredentialContent(challenge, contentKeys, ctypehash, attester) {
    return this.request('did_requestCredentialContent', {
      challenge,
      contentKeys,
      ctypehash,
      attester
    });
  }
  didLogin(data) {
    const payload = (0, _util.isHex)(data) ? data : (0, _util.isU8a)(data) ? (0, _util.u8aToHex)(data) : (0, _util.isString)(data) ? (0, _util.stringToHex)(data) : (0, _util.numberToHex)(data);
    return this.request('did_login', {
      payload
    });
  }
  sign(data) {
    const payload = (0, _util.isHex)(data) ? data : (0, _util.isU8a)(data) ? (0, _util.u8aToHex)(data) : (0, _util.isString)(data) ? (0, _util.stringToHex)(data) : (0, _util.numberToHex)(data);
    return this.request('did_sign', {
      payload
    });
  }
  encrypt(data, peer) {
    const payload = (0, _util.isHex)(data) ? data : (0, _util.isU8a)(data) ? (0, _util.u8aToHex)(data) : (0, _util.isString)(data) ? (0, _util.stringToHex)(data) : (0, _util.numberToHex)(data);
    const peerPublicKey = (0, _util.isHex)(peer) ? peer : (0, _util.u8aToHex)(peer);
    return this.request('did_encrypt', {
      payload,
      peerPublicKey
    });
  }
  decrypt(data, peer) {
    const payload = (0, _util.isHex)(data) ? data : (0, _util.isU8a)(data) ? (0, _util.u8aToHex)(data) : (0, _util.isString)(data) ? (0, _util.stringToHex)(data) : (0, _util.numberToHex)(data);
    const peerPublicKey = (0, _util.isHex)(peer) ? peer : (0, _util.u8aToHex)(peer);
    return this.request('did_decrypt', {
      payload,
      peerPublicKey
    });
  }
}
exports.BaseProvider = BaseProvider;