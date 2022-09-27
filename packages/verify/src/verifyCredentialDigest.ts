import type { RequestCredentialDigestReponse } from '@zcloak/login-rpc';

import { Attestation, init } from '@kiltprotocol/core';
import { verifyDidSignature } from '@kiltprotocol/did';
import { KeyRelationship } from '@kiltprotocol/types';
import { u8aToU8a } from '@polkadot/util';

import { KILT_ENDPOINT } from './defaults';

export async function verifyCredentialDigest(
  credentialDigest: RequestCredentialDigestReponse,
  challenge: string,
  opts?: { kiltEndpoint: string }
): Promise<boolean> {
  await init({ address: opts?.kiltEndpoint || KILT_ENDPOINT });

  const data = new Uint8Array([...u8aToU8a(credentialDigest.rootHash), ...u8aToU8a(challenge)]);

  return (
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
