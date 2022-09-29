import type { DidUri } from '@kiltprotocol/types';
import type {
  DidInfo,
  HexString,
  Request,
  RequestCredentialContentReponse,
  RequestCredentialDigestReponse
} from '@zcloak/login-rpc';

import { isHex, isString, isU8a, numberToHex, stringToHex, u8aToHex } from '@polkadot/util';

import { Events } from './Events';

export abstract class BaseProvider extends Events {
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
  public getCurrentDid(): Promise<DidInfo> {
    return this.request('did_getCurrent', undefined);
  }

  /**
   * request credential digest(login with credential digest).
   * @param challenge a random string
   * @param ctypehash the ctypehash of credential, if passed, wallet will only return the same credential with `ctypehash`
   * @param attester the attester of credential, if passed, wallet will only return the attested credential by `attester`
   * @returns `RequestCredentialDigestReponse`
   */
  public requestCredentialDigest(
    challenge: string,
    ctypehash?: HexString,
    attester?: DidUri
  ): Promise<RequestCredentialDigestReponse> {
    return this.request('did_requestCredentialDigest', { challenge, ctypehash, attester });
  }

  public requestCredentialContent(
    challenge: string,
    contentKeys?: string[],
    ctypehash?: HexString,
    attester?: DidUri
  ): Promise<RequestCredentialContentReponse> {
    return this.request('did_requestCredentialContent', {
      challenge,
      contentKeys,
      ctypehash,
      attester
    });
  }

  public didLogin(data: HexString | Uint8Array | string | number): Promise<HexString> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);

    return this.request('did_login', { payload });
  }

  public sign(data: HexString | Uint8Array | string | number): Promise<HexString> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);

    return this.request('did_sign', { payload });
  }

  public encrypt(
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
}
