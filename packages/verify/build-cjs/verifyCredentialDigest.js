"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCredentialDigest = verifyCredentialDigest;
var _core = require("@kiltprotocol/core");
var _did = require("@kiltprotocol/did");
var _types = require("@kiltprotocol/types");
var _util = require("@polkadot/util");
var _utils = require("@zcloak/did/cjs/utils");
var _utils2 = require("@zcloak/vc/cjs/utils");
var _verify = require("@zcloak/verify");
// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * verify credential digest, pass credential content, will check bellow.
 * check owner is same.
 * check claimerSignature is verified.
 * check that attestation is consistent with on-chain.
 * @param credentialDigest the `RequestCredentialDigestReponse` of login-rpc, get it use `did_requestCredentialDigest` method
 * @param challenge a random string, pass it when verify claimerSignature.
 * @param owner the credential owner
 * @returns `boolean` verify result
 */
async function verifyCredentialDigest(credentialDigest, challenge, owner, resolver) {
  if ((0, _utils2.isVP)(credentialDigest)) {
    (0, _util.assert)((0, _utils.isDidUrl)(owner), 'expect owner to be zkid did url');
    return challenge === credentialDigest.proof.challenge && (0, _utils.isSameUri)(credentialDigest.proof.verificationMethod, owner) && (0, _verify.vpVerify)(credentialDigest, resolver);
  }
  const data = new Uint8Array([...(0, _util.u8aToU8a)(credentialDigest.rootHash), ...(0, _util.u8aToU8a)(challenge)]);
  return _did.Utils.isSameSubject(credentialDigest.owner, owner), (await _core.Attestation.checkValidity({
    claimHash: credentialDigest.rootHash,
    cTypeHash: credentialDigest.ctypeHash,
    owner: credentialDigest.attester,
    delegationId: null,
    revoked: credentialDigest.revoked
  })) && (await (0, _did.verifyDidSignature)({
    signature: {
      keyUri: credentialDigest.claimerSignature.keyUri,
      signature: credentialDigest.claimerSignature.signature
    },
    message: data,
    expectedVerificationMethod: _types.KeyRelationship.authentication
  })).verified;
}