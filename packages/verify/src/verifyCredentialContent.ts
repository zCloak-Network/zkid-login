// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUri } from '@kiltprotocol/types';
import type { RequestCredentialContentReponse } from '@zcloak/login-rpc';

import { Credential, init } from '@kiltprotocol/core';

import { KILT_ENDPOINT } from './defaults';

/**
 * verify credential content, pass credential content, will check bellow.
 * check the data was not tampered with, by checking the data against hashes.
 * check claimerSignature is verified.
 * check that attestation is consistent with on-chain.
 * @param credential the `RequestCredentialContentReponse` of login-rpc, get it use `did_requestCredentialContent` method
 * @param challenge a random string, pass it when verify claimerSignature.
 * @param owner the credential owner
 * @param opts.kiltEndpoint kilt endpoint address, default is `KILT_ENDPOINT`
 * @returns `boolean` verify result
 */
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
