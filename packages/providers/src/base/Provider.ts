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
  #request: Request;

  constructor(request: Request) {
    super();
    this.#request = request;
  }

  public requestAuth(): Promise<boolean> {
    return this.#request.request('wallet_requestAuth', undefined);
  }

  public isAuth(): Promise<boolean> {
    return this.#request.request('wallet_isAuth', undefined);
  }

  public isLocked(): Promise<boolean> {
    return this.#request.request('wallet_isLocked', undefined);
  }

  public getCurrentDid(): Promise<DidInfo> {
    return this.#request.request('did_getCurrent', undefined);
  }

  public requestCredentialDigest(
    challenge: string,
    ctypehash?: HexString,
    attester?: DidUri
  ): Promise<RequestCredentialDigestReponse> {
    return this.#request.request('did_requestCredentialDigest', { challenge, ctypehash, attester });
  }

  public requestCredentialContent(
    challenge: string,
    contentKeys?: string[],
    ctypehash?: HexString,
    attester?: DidUri
  ): Promise<RequestCredentialContentReponse> {
    return this.#request.request('did_requestCredentialContent', {
      challenge,
      contentKeys,
      ctypehash,
      attester
    });
  }

  public sign(data: HexString | Uint8Array | string | number): Promise<HexString> {
    const payload: HexString = isHex(data)
      ? data
      : isU8a(data)
      ? u8aToHex(data)
      : isString(data)
      ? stringToHex(data)
      : numberToHex(data);

    return this.#request.request('did_sign', { payload });
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

    return this.#request.request('did_encrypt', { payload, peerPublicKey });
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

    return this.#request.request('did_decrypt', { payload, peerPublicKey });
  }
}
