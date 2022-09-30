import type {
  DidInfo,
  DidLoginResponse,
  HexString,
  RequestCredentialContentReponse,
  RequestCredentialDigestReponse
} from '@zcloak/login-rpc';

import { init } from '@kiltprotocol/core';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { ZkidWalletProvider } from '@zcloak/login-providers';
import { BaseProvider } from '@zcloak/login-providers/base/Provider';

import { attester, ctype } from '../defaults';

export interface AppState {
  provider?: BaseProvider | null;
  authed: boolean;
  did?: DidInfo;
  signature?: DidLoginResponse;
  credentialDigest?: RequestCredentialDigestReponse;
  credentialContent?: RequestCredentialContentReponse;
  auth(): Promise<void>;
  loginWithDid(challenge: HexString): Promise<DidLoginResponse | null>;
  loginWithCredentialDigest(challenge: HexString): Promise<RequestCredentialDigestReponse | null>;
  loginWithCredentialContent(challenge: HexString): Promise<RequestCredentialContentReponse | null>;
}

export const AppContext = createContext<AppState>({} as any);

init({ address: 'wss://testnet.kilt.zkid.app/' });

function AppProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const provider = useMemo(
    () => (ZkidWalletProvider.isInstalled() ? new ZkidWalletProvider() : null),
    []
  );
  const [did, setDid] = useState<DidInfo>();
  const [signature, setSignature] = useState<DidLoginResponse>();
  const [credentialDigest, setCredentialDigest] = useState<RequestCredentialDigestReponse>();
  const [credentialContent, setCredentialContent] = useState<RequestCredentialContentReponse>();

  useEffect(() => {
    if (provider) provider.isAuth().then(setAuthed);
  }, [provider]);

  useEffect(() => {
    if (provider && authed) provider.getCurrentDid().then(setDid);
  }, [authed, provider]);

  const auth = useCallback(async () => {
    await provider
      ?.requestAuth()
      .then(() => provider.isAuth())
      .then(setAuthed);
  }, [provider]);

  const loginWithDid = useCallback(
    async (challenge: HexString) => {
      if (provider && authed) {
        const data = await provider.didLogin(challenge);

        setSignature(data);

        return data;
      }

      return null;
    },
    [authed, provider]
  );

  const loginWithCredentialDigest = useCallback(
    async (challenge: HexString) => {
      if (provider && authed) {
        const data = await provider.requestCredentialDigest(challenge, ctype.hash, attester);

        setCredentialDigest(data);

        return data;
      }

      return null;
    },
    [authed, provider]
  );

  const loginWithCredentialContent = useCallback(
    async (challenge: HexString) => {
      if (provider && authed) {
        const data = await provider.requestCredentialContent(
          challenge,
          ['Name', 'Birthday', 'Level'],
          ctype.hash,
          attester
        );

        setCredentialContent(data);

        return data;
      }

      return null;
    },
    [authed, provider]
  );

  const state = useMemo(
    () => ({
      provider,
      authed,
      did,
      signature,
      credentialDigest,
      credentialContent,
      auth,
      loginWithDid,
      loginWithCredentialDigest,
      loginWithCredentialContent
    }),
    [
      auth,
      authed,
      credentialContent,
      credentialDigest,
      did,
      loginWithCredentialContent,
      loginWithCredentialDigest,
      loginWithDid,
      provider,
      signature
    ]
  );

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export default AppProvider;
