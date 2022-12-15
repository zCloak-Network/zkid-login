// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@zcloak/login-rpc/types';

import type { DidDocument, DidUrl, VerificationMethodType } from '@zcloak/did-resolver/types';
import type { VerifiablePresentation } from '@zcloak/vc/types';

export type HexString = `0x${string}`;

export type DidSignature = {
  id: DidUrl;
  type: VerificationMethodType;
  signature: string;
};

export type DidInfo = {
  didUri: DidUrl;
  document: DidDocument;
  authenticationKey: HexString;
  encryptionKey: HexString[];
  attestationKey?: HexString;
  delegationKey?: HexString;
};

export type DidEncrypted = {
  senderUrl: DidUrl;
  receiverUrl: DidUrl;
  type: VerificationMethodType;
  data: HexString;
};

export type ZkpGenResponse = {
  outputs: number[];
  starkproof: unknown;
  programHash: HexString;
  ctype: HexString;
  attester: DidUrl;
};

export type RequestCredentialDigestParams = {
  challenge: string;
  ctypehash?: HexString;
  attester?: DidUrl;
};

export type RequestCredentialContentParams = {
  challenge: string;
  contentKeys?: string[];
  ctypehash?: HexString;
  attester?: DidUrl;
};

export type DidLoginParams = {
  payload: HexString;
};

export type DidSignParams = {
  keyId?: DidUrl;
  payload: HexString;
};

export type DidEncryptParams = {
  receiver: DidUrl;
  message: HexString;
};

export type DidDecryptParams = {
  sender: DidUrl;
  message: HexString;
};

export type ZkpGenRequest = {
  ctype?: HexString;
  attester?: DidUrl;
  program: string;
};

declare module '@zcloak/login-rpc/types' {
  interface RpcRequests {
    wallet_requestAuth: undefined;
    wallet_requestAuthAndLogin: undefined;
    wallet_isAuth: undefined;
    wallet_isLocked: undefined;
    did_getCurrent: undefined;
    did_requestCredentialDigest: RequestCredentialDigestParams;
    did_requestCredentialContent: RequestCredentialContentParams;
    did_login: DidLoginParams;
    did_sign: DidSignParams;
    did_encrypt: DidEncryptParams;
    did_decrypt: DidDecryptParams;
    proof_generate: ZkpGenRequest;
  }

  interface RpcResponses {
    wallet_requestAuth: boolean;
    wallet_requestAuthAndLogin: DidSignature;
    wallet_isAuth: boolean;
    wallet_isLocked: boolean;
    did_getCurrent: DidInfo;
    did_requestCredentialDigest: VerifiablePresentation;
    did_requestCredentialContent: VerifiablePresentation;
    did_login: DidSignature;
    did_sign: DidSignature;
    did_encrypt: DidEncrypted;
    did_decrypt: HexString;
    proof_generate: ZkpGenResponse;
  }
}
