// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { RequestCredentialDigestReponse } from '@zcloak/login-rpc';
import type { WrapperDidUrl } from '@zcloak/login-rpc/types';

import { Attestation } from '@kiltprotocol/core';
import { Utils, verifyDidSignature } from '@kiltprotocol/did';
import { type DidResourceUri, type DidUri, KeyRelationship } from '@kiltprotocol/types';
import { assert, u8aToU8a } from '@polkadot/util';

import { isDidUrl, isSameUri } from '@zcloak/did/utils';
import { isVP } from '@zcloak/vc/utils';
import { vpVerify } from '@zcloak/verify';

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
export async function verifyCredentialDigest(
  credentialDigest: RequestCredentialDigestReponse,
  challenge: string,
  owner: WrapperDidUrl,
  resolver?: DidResolver
): Promise<boolean> {
  if (isVP(credentialDigest)) {
    assert(isDidUrl(owner), 'expect owner to be zkid did url');

    return (
      challenge === credentialDigest.proof.challenge &&
      isSameUri(credentialDigest.proof.verificationMethod, owner) &&
      vpVerify(credentialDigest, resolver)
    );
  }

  const data = new Uint8Array([...u8aToU8a(credentialDigest.rootHash), ...u8aToU8a(challenge)]);

  return (
    Utils.isSameSubject(credentialDigest.owner, owner as DidUri),
    (await Attestation.checkValidity({
      claimHash: credentialDigest.rootHash,
      cTypeHash: credentialDigest.ctypeHash,
      owner: credentialDigest.attester,
      delegationId: null,
      revoked: credentialDigest.revoked
    })) &&
      (
        await verifyDidSignature({
          signature: {
            keyUri: credentialDigest.claimerSignature.keyUri as DidResourceUri,
            signature: credentialDigest.claimerSignature.signature
          },
          message: data,
          expectedVerificationMethod: KeyRelationship.authentication
        })
      ).verified
  );
}
