// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@zcloak/login-rpc/types';

import type { DidUri, ICredential } from '@kiltprotocol/types';

type HexString = `0x${string}`;

export type DidSignature = {
  keyUri: DidUri;
  signature: string;
};

export type DidInfo = {
  didUri: DidUri;
  authenticationKey: HexString;
  encryptionKey: HexString[];
  attestationKey?: HexString;
  delegationKey?: HexString;
};

export type CredentialDigest = {
  rootHash: HexString;
  ctypeHash: HexString;
  attested: boolean;
  revoked: boolean;
  owner: DidUri;
  attester: DidUri;
  claimerSignature: DidSignature;
  challenge: string;
};

export type ZkpGenResponse = {
  outputs: number[];
  starkproof: unknown;
  programHash: HexString;
  ctype: HexString;
  attester: DidUri;
};

export type RequestCredentialDigestParams = {
  challenge: string;
  ctypehash?: HexString;
  attester?: DidUri;
};

export type RequestCredentialContentParams = {
  challenge: string;
  contentKeys?: string[];
  ctypehash?: HexString;
  attester?: DidUri;
};

export type DidLoginParams = {
  payload: HexString;
};

export type DidSignParams = {
  keyId?: string;
  payload: HexString;
};

export type DidEncryptParams = {
  receiver: DidUri;
  message: HexString;
};

export type DidDecryptParams = {
  sender: DidUri;
  message: HexString;
};

export type ZkpGenRequest = {
  ctype?: HexString;
  attester?: DidUri;
  program: string;
};

declare module '@zcloak/login-rpc/types' {
  interface RpcRequests {
    wallet_requestAuth$Kilt: undefined;
    wallet_requestAuthAndLogin$Kilt: undefined;
    wallet_isAuth$Kilt: undefined;
    wallet_isLocked$Kilt: boolean;
    did_getCurrent$Kilt: undefined;
    did_requestCredentialDigest$Kilt: RequestCredentialDigestParams;
    did_requestCredentialContent$Kilt: RequestCredentialContentParams;
    did_login$Kilt: DidLoginParams;
    did_sign$Kilt: DidSignParams;
    did_encrypt$Kilt: DidEncryptParams;
    did_decrypt$Kilt: DidDecryptParams;
    proof_generate$Kilt: ZkpGenResponse;
  }

  interface RpcResponses {
    wallet_requestAuth$Kilt: boolean;
    wallet_requestAuthAndLogin$Kilt: DidSignature;
    wallet_isAuth$Kilt: boolean;
    wallet_isLocked$Kilt: boolean;
    did_getCurrent$Kilt: DidInfo;
    did_requestCredentialDigest$Kilt: CredentialDigest;
    did_requestCredentialContent$Kilt: ICredential;
    did_login$Kilt: DidSignature;
    did_sign$Kilt: DidSignature;
    did_encrypt$Kilt: Uint8Array;
    did_decrypt$Kilt: Uint8Array;
    proof_generate$Kilt: ZkpGenResponse;
  }
}
