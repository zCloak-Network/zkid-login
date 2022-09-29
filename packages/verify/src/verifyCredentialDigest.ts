import type { RequestCredentialDigestReponse } from '@zcloak/login-rpc';

import { Attestation, init } from '@kiltprotocol/core';
import { verifyDidSignature } from '@kiltprotocol/did';
import { type DidUri, KeyRelationship } from '@kiltprotocol/types';
import { u8aToU8a } from '@polkadot/util';

import { KILT_ENDPOINT } from './defaults';

/**
 * verify credential digest, pass credential content, will check bellow.
 * check owner is same.
 * check claimerSignature is verified.
 * check that attestation is consistent with on-chain.
 * @param credentialDigest the `RequestCredentialDigestReponse` of login-rpc, get it use `did_requestCredentialDigest` method
 * @param challenge a random string, pass it when verify claimerSignature.
 * @param owner the credential owner
 * @param opts.kiltEndpoint kilt endpoint address, default is `KILT_ENDPOINT`
 * @returns `boolean` verify result
 */
export async function verifyCredentialDigest(
  credentialDigest: RequestCredentialDigestReponse,
  challenge: string,
  owner: DidUri,
  opts?: { kiltEndpoint: string }
): Promise<boolean> {
  await init({ address: opts?.kiltEndpoint || KILT_ENDPOINT });

  const data = new Uint8Array([...u8aToU8a(credentialDigest.rootHash), ...u8aToU8a(challenge)]);

  return (
    credentialDigest.owner === owner,
    (await Attestation.checkValidity({
      claimHash: credentialDigest.rootHash,
      cTypeHash: credentialDigest.ctypeHash,
      owner: credentialDigest.attester,
      delegationId: null,
      revoked: credentialDigest.revoked
    })) &&
      (
        await verifyDidSignature({
          signature: credentialDigest.claimerSignature,
          message: data,
          expectedVerificationMethod: KeyRelationship.authentication
        })
      ).verified
  );
}
