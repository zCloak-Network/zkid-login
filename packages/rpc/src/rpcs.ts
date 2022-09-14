// [RpcMethod]: [Params, Returns]
export interface Rpcs {
  wallet_requestAuth: [undefined, boolean];
  wallet_isAuth: [undefined, boolean];
  did_getCurrent: [undefined];
  did_requestCredentialDigest: [];
  did_requestCredentialContent: [];
  did_sign: [];
  did_encrypt: [];
  did_decrypt: [];
}

type HexString = `0x${string}`;

export type DidInfo = {};
