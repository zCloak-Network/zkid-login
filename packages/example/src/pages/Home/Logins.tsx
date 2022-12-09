// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
  DidLoginResponse,
  RequestCredentialContentReponse,
  RequestCredentialDigestReponse
} from '@zcloak/login-rpc';

import styled from '@emotion/styled';
import { randomAsHex } from '@polkadot/util-crypto';
import { useContext, useMemo, useState } from 'react';

import { HexString } from '@zcloak/login-rpc/types';
import {
  verifyCredentialContent,
  verifyCredentialDigest,
  verifyDidLogin
} from '@zcloak/login-verify';

import { AppContext, ButtonEnable, Card } from '../../components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  min-height: 424px;
  padding: 12px;
  margin: 40px auto;
  border: 2px dashed transparent;
  background: linear-gradient(black, black) padding-box,
    repeating-linear-gradient(-45deg, #4c9f7a 0, #4c9f7a 0.3em, black 0, black 0.7em);

  .desc {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 24px;
  }

  > .code {
    flex: 1;
    margin-left: 12px;
    padding: 20px;
    border: 2px solid #7b7b7e;
    background: #000;

    .code-tag {
      display: inline-block;
      background: #25e98a;
      border: 2px solid #4c9f7a;
      color: #000;
      font-size: 16px;
      padding: 2px 12px;
      margin-bottom: 14px;
      margin-top: 24px;
    }

    > p {
      word-break: break-all;
    }
  }
`;

function Container<T>({
  codes,
  desc,
  login,
  tip,
  title,
  verify
}: {
  title: string;
  desc: string;
  tip: string;
  codes: [React.ReactNode, React.ReactNode];
  login: (challenge: HexString) => Promise<T | null>;
  verify: (data: T, challenge: string) => Promise<boolean>;
}) {
  const challenge = useMemo(() => randomAsHex(), []);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<T | null>();
  const [verified, setVerified] = useState(false);

  return (
    <>
      <div style={{ flex: '0 0 auto', width: 460 }}>
        <Card bg="#1E1E27" title={title} titleHeight={44}>
          <div style={{ minHeight: 312, position: 'relative' }}>
            <p className="desc">{desc}</p>
            <p className="desc" style={{ color: '#fd811f' }}>
              {tip}
            </p>
            <ButtonEnable
              onClick={() =>
                login(challenge)
                  .then((data) => {
                    setResult(data);
                    setStep(1);

                    return data ? verify(data, challenge) : false;
                  })
                  .then((verified) => {
                    setVerified(verified);
                    setStep(2);
                  })
              }
              style={{ position: 'absolute', bottom: 0, width: '100%' }}
            >
              Login
            </ButtonEnable>
          </div>
        </Card>
      </div>
      <div className="code" style={{ width: 'calc(100% - 460px -12px)' }}>
        {step >= 0 && (
          <>
            <div className="code-tag" style={{ marginTop: 0 }}>
              Api request code
            </div>
            <p>{codes[0]}</p>
          </>
        )}
        {step >= 1 && (
          <>
            <div className="code-tag">Api request Result</div>
            <p>{JSON.stringify(result)}</p>
            <div className="code-tag">SDK Verification Code</div>
            <p>{codes[1]}</p>
          </>
        )}
        {step >= 2 && (
          <>
            <div className="code-tag">SDK Verification Result</div>
            <p>{JSON.stringify(verified)}</p>
          </>
        )}
      </div>
    </>
  );
}

function Logins() {
  const { did, loginWithCredentialContent, loginWithCredentialDigest, loginWithDid } =
    useContext(AppContext);

  return (
    <>
      <Wrapper>
        <Container<DidLoginResponse>
          codes={[
            'provider.didLogin(challenge)',
            'verifyDidLogin(challenge, data, did.authenticationKey)'
          ]}
          desc="Login this mockDAO website your DIDas your user identifier."
          login={loginWithDid}
          tip="Tips: this only brings with DID info."
          title="Login with DID"
          verify={(data, challenge) =>
            did ? Promise.resolve(verifyDidLogin(challenge, data)) : Promise.resolve(false)
          }
        />
      </Wrapper>
      <Wrapper>
        <Container<RequestCredentialDigestReponse>
          codes={[
            'provider.requestCredentialDigest(challenge, ctype.hash, attester)',
            'verifyCredentialDigest(data, challenge, did.didUri)'
          ]}
          desc="I can prove I am a verified member of this mockDAO."
          login={loginWithCredentialDigest}
          tip="Tips: this will not disclose any of your credential content, only the credential digest Will be shown."
          title="I am DAO member"
          verify={(data, challenge) =>
            did
              ? Promise.resolve(verifyCredentialDigest(data, challenge, did.didUri))
              : Promise.resolve(false)
          }
        />
      </Wrapper>
      <Wrapper>
        <Container<RequestCredentialContentReponse>
          codes={[
            "provider.requestCredentialContent(challenge,['Level'], ctypehash, attester)",
            'verifyCredentialContent(data, challenge, did.didUri)'
          ]}
          desc="Let’s vote on some proposals, only those whose member level>2 can vote."
          login={loginWithCredentialContent}
          tip="Tips: this will disclose the level info of your credential."
          title="I can vote"
          verify={(data, challenge) =>
            did
              ? Promise.resolve(verifyCredentialContent(data, challenge, did.didUri))
              : Promise.resolve(false)
          }
        />
      </Wrapper>
    </>
  );
}

export default Logins;
