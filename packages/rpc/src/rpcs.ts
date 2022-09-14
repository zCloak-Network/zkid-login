import type { DidSignature, DidUri, ICredential } from '@kiltprotocol/types';

// [RpcMethod]: [Params, Returns | Subsciption]
export interface Rpcs {
  wallet_requestAuth: [undefined, boolean];
  wallet_isAuth: [undefined, boolean];
  wallet_isLocked: [undefined, boolean];
  did_getCurrent: [undefined, DidInfo];
  did_requestCredentialDigest: [RequestCredentialDigestParams, RequestCredentialDigestReponse];
  did_requestCredentialContent: [RequestCredentialContentParams, RequestCredentialContentReponse];
  did_sign: [DidSignParams, DidSignResponse];
  did_encrypt: [DidEncryptParams, DidEncryptResponse];
  did_decrypt: [DidDecryptParams, DidDecryptResponse];
  rpc_unsub: [RpcUnsubParams, boolean];
}

type HexString = `0x${string}`;

export type DidInfo = {
  didUri: DidUri;
  authenticationKey: HexString;
  encryptionKey: HexString[];
  attestationKey: HexString;
  delegationKey: HexString;
};

// method did_requestCredentialDigest params
export type RequestCredentialDigestParams = {
  challenge: string;
  ctypehash?: HexString;
  attester?: DidUri;
};
// method did_requestCredentialDigest returns
export type RequestCredentialDigestReponse = {
  rootHash: HexString;
  ctypeHash: HexString;
  attested: boolean;
  revoked: boolean;
  owner: DidUri;
  attester: DidUri;
  claimerSignature: DidSignature;
  challenge: string;
};

// method did_requestCredentialContent params
export type RequestCredentialContentParams = {
  challenge: string;
  ctypehash?: HexString;
  attester?: DidUri;
};
// method did_requestCredentialContent returns
export type RequestCredentialContentReponse = ICredential;

export type DidSignParams = {
  payload: HexString;
};
export type DidSignResponse = HexString;

export type DidEncryptParams = {
  peerPublicKey: HexString;
  payload: HexString;
};
export type DidEncryptResponse = HexString;

export type DidDecryptParams = {
  peerPublicKey: HexString;
  payload: HexString;
};
export type DidDecryptResponse = HexString;

export type RpcUnsubParams = {
  method: keyof Rpcs;
  subscriptionId: number | string;
};