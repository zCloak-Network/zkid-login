"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCredentialContent = verifyCredentialContent;
var _core = require("@kiltprotocol/core");
var _did = require("@kiltprotocol/did");
var _util = require("@polkadot/util");
var _utils = require("@zcloak/did/cjs/utils");
var _utils2 = require("@zcloak/vc/cjs/utils");
var _verify = require("@zcloak/verify");
// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * verify credential content, pass credential content, will check bellow.
 * check the data was not tampered with, by checking the data against hashes.
 * check claimerSignature is verified.
 * check that attestation is consistent with on-chain.
 * @param credential the `RequestCredentialContentReponse` of login-rpc, get it use `did_requestCredentialContent` method
 * @param challenge a random string, pass it when verify claimerSignature.
 * @param owner the credential owner
 * @returns `boolean` verify result
 */
async function verifyCredentialContent(credential, challenge, owner, resolver) {
  var _credential$request$c;
  if ((0, _utils2.isVP)(credential)) {
    (0, _util.assert)((0, _utils.isDidUrl)(owner), 'expect owner to be zkid did url');
    return challenge === credential.proof.challenge && (0, _utils.isSameUri)(credential.proof.verificationMethod, owner) && (0, _verify.vpVerify)(credential, resolver);
  }
  return _did.Utils.isSameSubject(credential.request.claim.owner, owner) && _core.Credential.isICredential(credential) && ((_credential$request$c = credential.request.claimerSignature) == null ? void 0 : _credential$request$c.challenge) === challenge && (await _core.Credential.verify(credential));
}