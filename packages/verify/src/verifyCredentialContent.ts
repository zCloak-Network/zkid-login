import type { DidUri } from '@kiltprotocol/types';
import type { RequestCredentialContentReponse } from '@zcloak/login-rpc';

import { Credential, init } from '@kiltprotocol/core';

import { KILT_ENDPOINT } from './defaults';

export async function verifyCredentialContent(
  credential: RequestCredentialContentReponse,
  challenge: string,
  owner: DidUri,
  opts?: { kiltEndpoint: string }
): Promise<boolean> {
  await init({ address: opts?.kiltEndpoint || KILT_ENDPOINT });

  return (
    credential.request.claim.owner === owner &&
    Credential.isICredential(credential) &&
    credential.request.claimerSignature?.challenge === challenge &&
    (await Credential.verify(credential))
  );
}
