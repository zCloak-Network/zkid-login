import type { RequestCredentialContentReponse } from '@zcloak/login-rpc';

import { Credential, init } from '@kiltprotocol/core';

import { KILT_ENDPOINT } from './defaults';

export async function verifyCredentialContent(
  credential: RequestCredentialContentReponse,
  challenge: string,
  opts?: { kiltEndpoint: string }
): Promise<boolean> {
  await init({ address: opts?.kiltEndpoint || KILT_ENDPOINT });

  return (
    Credential.isICredential(credential) &&
    credential.request.claimerSignature?.challenge === challenge &&
    (await Credential.verify(credential))
  );
}
