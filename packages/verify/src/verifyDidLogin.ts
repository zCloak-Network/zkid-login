import type { HexString } from '@zcloak/login-rpc';

import { signatureVerify } from '@polkadot/util-crypto';

/**
 * verify the signature obtained by [[did_login]] is correct,
 * did_login is the signature with did's authenticationKey, so the function is to check signature is valid
 * @param message the message to signed
 * @param signature the signature obtained by signing the message
 * @param publicKey publicKey used for signing
 * @returns `boolean` verify result
 */
export function verifyDidLogin(
  message: HexString | Uint8Array | string,
  signature: HexString,
  publicKey: Uint8Array | HexString
): boolean {
  return signatureVerify(message, signature, publicKey).isValid;
}
