import type { HexString } from '@zcloak/login-rpc';

import { signatureVerify } from '@polkadot/util-crypto';

export function verifyDidLogin(
  message: HexString | Uint8Array | string,
  signature: HexString,
  publicKey: Uint8Array | HexString
): boolean {
  return signatureVerify(message, signature, publicKey).isValid;
}
