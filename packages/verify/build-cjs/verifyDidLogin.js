"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyDidLogin = verifyDidLogin;
var _did = require("@kiltprotocol/did");
var _types = require("@kiltprotocol/types");
var _util = require("@polkadot/util");
var _utils = require("@zcloak/did/cjs/utils");
var _verify = require("@zcloak/verify");
// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * verify the signature obtained by [[did_login]] is correct,
 * did_login is the signature with did's authenticationKey, so the function is to check signature is valid
 * @param message the message to signed
 * @param signature the signature obtained by signing the message
 * @param publicKey publicKey used for signing
 * @returns `boolean` verify result
 */
async function verifyDidLogin(message, _ref, resolver) {
  let {
    keyUri,
    signature
  } = _ref;
  if ((0, _utils.isDidUrl)(keyUri)) {
    return (0, _verify.didVerify)(message, (0, _util.u8aToU8a)(signature), keyUri, resolver);
  }
  const result = await (0, _did.verifyDidSignature)({
    message: (0, _util.u8aToU8a)(message),
    signature: {
      keyUri: keyUri,
      signature
    },
    expectedVerificationMethod: _types.KeyRelationship.authentication
  });
  return result.verified;
}