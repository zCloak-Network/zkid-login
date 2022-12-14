// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@zcloak/login-rpc-defines/defineZk';

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Request, RequestRpcs } from '@zcloak/login-rpc';
import type { SignKeys } from '@zcloak/login-rpc/types';
import type { VerifiablePresentation } from '@zcloak/vc/types';

import { isHex, isString, isU8a, numberToHex, stringToHex, u8aToHex } from '@polkadot/util';

import { Events } from './Events';

type HexString = `0x${string}`;

export class BaseProvider extends Events {
  protected request: Request;

  constructor(request: Request) {
    super();
    this.request = request;
  }

  /**
   * Send request for auth.
   * @returns `Promise<boolean>`
   */
  public requestAuth(): Promise<boolean> {
    return this.request('wallet_requestAuth', undefined);
  }

  /**
   * Send request for auth and request did login.
   * @returns `Promise<boolean>`
   */
  public requestAuthAndLogin(): Promise<
    RequestRpcs<'wallet_requestAuthAndLogin'>['wallet_requestAuthAndLogin'][1]
  > {
    return this.request('wallet_requestAuthAndLogin', undefined);
  }

  /**
   * Get if authed
   * @returns `Promise<boolean>`
   */
  public isAuth(): Promise<boolean> {
    return this.request('wallet_isAuth', undefined);
  }

  /**
   * Get the walelt is locked
   * @returns `Promise<boolean>`
   */
  public isLocked(): Promise<boolean> {
    return this.request('wallet_isLocked', undefined);
  }

  /**
   * Get current selected in wallet.
   * @returns `DidInfo` object.
   */
  public getCurrentDid(): Promise<RequestRpcs<'did_getCurrent'>['did_getCurrent'][1]> {
    return this.request('did_getCurrent', undefined);
  }

  /**
   * request credential digest(login with credential digest).
   * @param challenge a random string
   * @param ctypehash the ctypehash of credential, if passed, wallet will only return the same credential with `ctypehash`
   * @param attester the attester of credential, if passed, wallet will only return the attested credential by `attester`
   * @returns `VerifiablePresentation`
   */
  public requestCredentialDigest(
    challenge: string,
    ctypehash?: HexString,
    attester?: DidUrl
  ): Promise<VerifiablePresentation> {
    return this.request('did_requestCredentialDigest', { challenge, ctypehash, attester });
  }

  public requestCredentialContent(
    challenge: string,
    contentKeys?: string[],
    ctypehash?: HexString,
    attester?: DidUrl
  ): Promise<VerifiablePresentation> {
    return this.request('did_requestCredentialContent', {
      challenge,
      contentKeys,
      ctypehash,
      attester
    });
  }

  public didLogin(
    data: HexString | Uint8Array | string | number
  ): Promise<RequestRpcs<'did_login'>['did_login'][1]> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);

    return this.request('did_login', { payload });
  }

  public sign(
    data: HexString | Uint8Array | string | number,
    key?: SignKeys
  ): Promise<RequestRpcs<'did_sign'>['did_sign'][1]> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);

    return this.request('did_sign', { payload, key });
  }

  public encrypt(
    data: HexString | Uint8Array | string | number,
    peer: Uint8Array | HexString
  ): Promise<RequestRpcs<'did_encrypt'>['did_encrypt'][1]> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);
    const peerPublicKey: HexString = isHex(peer) ? peer : u8aToHex(peer);

    return this.request('did_encrypt', { payload, peerPublicKey });
  }

  public decrypt(
    data: HexString | Uint8Array | string | number,
    peer: Uint8Array | HexString
  ): Promise<HexString> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);
    const peerPublicKey: HexString = isHex(peer) ? peer : u8aToHex(peer);

    return this.request('did_decrypt', { payload, peerPublicKey });
  }

  public generateZkp(
    params: RequestRpcs<'proof_generate'>['proof_generate'][0]
  ): Promise<RequestRpcs<'proof_generate'>['proof_generate'][1]> {
    return this.request('proof_generate', params);
  }
}
