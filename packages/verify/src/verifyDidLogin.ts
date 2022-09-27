import type { HexString } from '@zcloak/login-rpc';

import { hexToU8a, isHex } from '@polkadot/util';
import { signatureVerify } from '@polkadot/util-crypto';

export function verifyDidLogin(
  message: HexString | Uint8Array,
  signature: HexString,
  publicKey: Uint8Array | HexString
): boolean {
  return signatureVerify(isHex(message) ? hexToU8a(message) : message, signature, publicKey)
    .isValid;
}
