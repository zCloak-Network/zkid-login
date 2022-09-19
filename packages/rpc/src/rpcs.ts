import type { DidSignature, DidUri, ICredential } from '@kiltprotocol/types';

// [RpcRequestMethod]: [Params, Returns]
export interface RequestRpcs {
  wallet_requestAuth: [undefined, boolean];
  wallet_isAuth: [undefined, boolean];
  // get lock status in wallet
  wallet_isLocked: [undefined, boolean];
  // get activity did in wallet
  did_getCurrent: [undefined, DidInfo];
  did_requestCredentialDigest: [RequestCredentialDigestParams, RequestCredentialDigestReponse];
  did_requestCredentialContent: [RequestCredentialContentParams, RequestCredentialContentReponse];
  did_sign: [DidSignParams, DidSignResponse];
  did_encrypt: [DidEncryptParams, DidEncryptResponse];
  did_decrypt: [DidDecryptParams, DidDecryptResponse];
}

// [RpcSubscriptionMethod]: [Params, Subsciption]
export interface SubscriptionRpcs {
  // subscription lock status in wallet
  wallet_subLocked: [undefined, string, boolean];
  // subscription lock status in wallet
  wallet_unsubLocked: [UnsubParams, boolean];
  // subscript did when wallet internal did changed
  did_subCurrent: [undefined, string, DidInfo];
  // subscript did when wallet internal did changed
  did_unsubCurrent: [UnsubParams, DidInfo];
}

export type Rpcs = RequestRpcs & SubscriptionRpcs;

export type RequestMethods = keyof RequestRpcs;
export type SubscriptionMethods = keyof SubscriptionRpcs;
export type Methods = RequestMethods | SubscriptionMethods;

export type HexString = `0x${string}`;

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
  contentKeys?: string[];
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

export type UnsubParams = {
  subscriptionId: number;
};
