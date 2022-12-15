// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResourceUri, DidUri } from '@kiltprotocol/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { RequestRpcs } from '@zcloak/login-rpc';
import type { DidSignature as DidSignatureKilt } from '@zcloak/login-rpc-defines/defineKilt';
import type { DidSignature as DidSignatureZk } from '@zcloak/login-rpc-defines/defineZk';

import { verifyDidSignature } from '@kiltprotocol/did';
import { KeyRelationship } from '@kiltprotocol/types';
import { u8aToU8a } from '@polkadot/util';

import { isDidUrl } from '@zcloak/did/utils';
import { DidResolver } from '@zcloak/did-resolver';
import { didVerify } from '@zcloak/verify';

type HexString = `0x${string}`;

/**
 * verify the signature obtained by [[did_login]] is correct,
 * did_login is the signature with did's authenticationKey, so the function is to check signature is valid
 * @param message the message to signed
 * @param signature the signature obtained by signing the message
 * @param publicKey publicKey used for signing
 * @returns `boolean` verify result
 */
export async function verifyDidLogin<T extends 'did_login' | 'did_login$Kilt' = 'did_login'>(
  message: HexString | Uint8Array | string,
  data: RequestRpcs<T>[T][1],
  resolver?: DidResolver
): Promise<boolean> {
  let keyUri: DidUri | DidUrl;
  const signature = data.signature;

  if ((data as DidSignatureZk).id) {
    keyUri = (data as DidSignatureZk).id;
  } else if ((data as DidSignatureKilt).keyUri) {
    keyUri = (data as DidSignatureKilt).keyUri;
  } else {
    throw new Error('Not keyUri or id found');
  }

  if (isDidUrl(keyUri)) {
    return didVerify(message, u8aToU8a(signature), keyUri, resolver);
  }

  const result = await verifyDidSignature({
    message: u8aToU8a(message),
    signature: {
      keyUri: keyUri as DidResourceUri,
      signature
    },
    expectedVerificationMethod: KeyRelationship.authentication
  });

  return result.verified;
}
