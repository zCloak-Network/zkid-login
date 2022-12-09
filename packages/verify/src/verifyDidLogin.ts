// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResourceUri } from '@kiltprotocol/types';
import type { DidSignature, HexString } from '@zcloak/login-rpc/types';

import { verifyDidSignature } from '@kiltprotocol/did';
import { KeyRelationship } from '@kiltprotocol/types';
import { u8aToU8a } from '@polkadot/util';

import { isDidUrl } from '@zcloak/did/utils';
import { DidResolver } from '@zcloak/did-resolver';
import { didVerify } from '@zcloak/verify';

/**
 * verify the signature obtained by [[did_login]] is correct,
 * did_login is the signature with did's authenticationKey, so the function is to check signature is valid
 * @param message the message to signed
 * @param signature the signature obtained by signing the message
 * @param publicKey publicKey used for signing
 * @returns `boolean` verify result
 */
export async function verifyDidLogin(
  message: HexString | Uint8Array | string,
  { keyUri, signature }: DidSignature,
  resolver?: DidResolver
): Promise<boolean> {
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
