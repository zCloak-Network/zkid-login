// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
  DidSignature,
  HexString,
  WrapperCredential,
  WrapperCredentialDigest,
  WrapperDidUrl
} from './types';

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
  did_login: [DidLoginParams, DidLoginResponse];
  did_sign: [DidSignParams, DidSignResponse];
  did_encrypt: [DidEncryptParams, DidEncryptResponse];
  did_decrypt: [DidDecryptParams, DidDecryptResponse];
  proof_generate: [ZkpGenRequest, ZkpGenResponse];
}

export type RequestMethods = keyof RequestRpcs;

export type DidInfo = {
  didUri: WrapperDidUrl;
  authenticationKey: HexString;
  encryptionKey: HexString[];
  attestationKey?: HexString;
  delegationKey?: HexString;
};

// method did_requestCredentialDigest params
export type RequestCredentialDigestParams = {
  challenge: string;
  ctypehash?: HexString;
  attester?: WrapperDidUrl;
};
// method did_requestCredentialDigest returns
export type RequestCredentialDigestReponse = WrapperCredentialDigest;

// method did_requestCredentialContent params
export type RequestCredentialContentParams = {
  challenge: string;
  contentKeys?: string[];
  ctypehash?: HexString;
  attester?: WrapperDidUrl;
};
// method did_requestCredentialContent returns
export type RequestCredentialContentReponse = WrapperCredential;

export type DidLoginParams = {
  payload: HexString;
};
export type DidLoginResponse = DidSignature;

export type DidSignParams = {
  payload: HexString;
};
export type DidSignResponse = DidSignature;

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

export type ZkpGenRequest = {
  ctype: `0x${string}`;
  attester: WrapperDidUrl;
  program: string;
};

export type ZkpGenResponse = {
  outputs: number[];
  starkproof: unknown;
  programHash: `0x${string}`;
  ctype: `0x${string}`;
  attester: WrapperDidUrl;
};
