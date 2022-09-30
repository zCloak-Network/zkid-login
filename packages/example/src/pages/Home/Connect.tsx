import 'react-datepicker/dist/react-datepicker.css';

import type { ICredential } from '@kiltprotocol/types';

import styled from '@emotion/styled';
import { Attestation, Claim, Credential, RequestForAttestation } from '@kiltprotocol/core';
import { FullDidDetails, LightDidDetails } from '@kiltprotocol/did';
import { Message } from '@kiltprotocol/messaging';
import { stringToHex } from '@polkadot/util';
import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { ZkidWalletProvider } from '@zcloak/login-providers';

import { AppContext, ButtonEnable, Card, DidName } from '../../components';
import { attester, ctype } from '../../defaults';
import { Keyring } from '../../signer';

const Wrapper = styled.div`
  > .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 900;

    > div {
      flex: 1 0 auto;
      height: 1px;
      margin-left: 32px;

      background: linear-gradient(90deg, #7b7b7e 0%, #25e98a 100%);
      opacity: 0.61;
    }
  }

  > p {
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
  }

  .card-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    > span {
      margin-left: 12px;
      text-decoration: underline;
    }
  }

  .form-item {
    margin-bottom: 30px;
    font-size: 18px;

    > p {
      margin-bottom: 12px;
    }
  }

  .level {
    display: inline-flex;
    align-items: center;
    border: 1px solid #fff;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 50px;
      border-right: 1px solid #fff;
      background: #329edc;
      height: 32px;
      font-size: 20px;

      &::nth-last-of-type(1) {
        border-right: none;
      }
    }
  }
`;

const Content = styled.div({
  width: 524,
  margin: '150px auto'
});

const key = 'zkid-login-credential';

const credentialText = localStorage.getItem(key);

function Connect() {
  const { authed, did, provider } = useContext(AppContext);
  const [credential, setCredential] = useState<ICredential | null>(
    credentialText ? JSON.parse(credentialText) : null
  );
  const [mading, setMading] = useState(false);
  const [attested, setAttested] = useState(false);
  const [contents, setContents] = useState<Record<string, any>>({});

  useEffect(() => {
    credential && Credential.verify(credential).then(setAttested);

    const interval = setInterval(() => {
      credential && Credential.verify(credential).then(setAttested);
    }, 6000);

    return () => clearInterval(interval);
  }, [credential]);

  const createCredential = useCallback(
    async (contents: any) => {
      if (!did || !provider) return;
      const keyring = new Keyring(provider);
      const claimer = LightDidDetails.fromUri(did.didUri);
      const receiver = await FullDidDetails.fromChainInfo(attester);

      if (!receiver || !claimer.encryptionKey || !receiver.encryptionKey) return;
      const claim = Claim.fromCTypeAndClaimContents(ctype, contents, did.didUri);
      const request = await RequestForAttestation.fromClaim(claim).signWithDidKey(
        keyring,
        claimer,
        claimer.authenticationKey.id
      );
      const message = new Message(
        {
          type: Message.BodyType.REQUEST_ATTESTATION,
          content: { requestForAttestation: request }
        },
        claimer.uri,
        receiver.uri
      );

      const encrypted = await message.encrypt(
        claimer.encryptionKey.id,
        claimer,
        keyring,
        receiver.assembleKeyUri(receiver.encryptionKey.id)
      );

      const res = await fetch('https://login-attestation-sdk.zkid.app/attestation/submit', {
        method: 'POST',
        body: JSON.stringify({
          ciphertext: encrypted.ciphertext,
          nonce: encrypted.nonce,
          senderKeyUri: encrypted.senderKeyUri,
          receiverKeyUri: encrypted.receiverKeyUri
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());

      if (res?.code !== 200) return;

      const attestation = Attestation.fromRequestAndDid(request, receiver.uri);

      const credential = Credential.fromRequestAndAttestation(request, attestation);

      setCredential(credential);
      localStorage.setItem(key, JSON.stringify(credential));
    },
    [did, provider]
  );

  return (
    <Wrapper>
      <div className="title">
        Use Case: mockDAO
        <div />
      </div>
      <p>
        Assume that you are a member of mockDAO and you can get a membership credential from mockDAO
        officials. Now let’s make the credential and use it to do further operations.
      </p>
      <Content>
        {!authed ? (
          <Card bg="#545454" title="Connect">
            <p style={{ marginBottom: 27, fontSize: 20, fontWeight: 500 }}>
              First, you need to connect to your zkID Wallet.
            </p>
            <ButtonEnable />
          </Card>
        ) : credential ? (
          <Card title="Credential type- Membership Card">
            <div className="card-item">
              Attester:{' '}
              <span>
                <DidName value={credential.attestation.owner} />
              </span>
            </div>
            <div className="card-item">
              Attested:{' '}
              <span style={{ color: attested ? '#25E98A' : undefined }}>
                [{attested ? 'Passed' : 'Verifing'}]
              </span>
            </div>
            <div className="card-item">
              Membership level: <span>{credential.request.claim.contents.Level as any}</span>
            </div>
            <div className="card-item">
              Name: <span>{credential.request.claim.contents.Name as any}</span>
            </div>
            <div className="card-item">
              Birthday:{' '}
              <span>
                {moment(credential.request.claim.contents.Birthday as any).format('YYYY-MM-DD')}
              </span>
            </div>
            <ButtonEnable
              onClick={() => {
                (provider as ZkidWalletProvider).importCredential(
                  stringToHex(JSON.stringify(credential))
                );
              }}
            >
              Import to zkID Wallet
            </ButtonEnable>
          </Card>
        ) : !mading ? (
          <Card title="Credential type- Membership Card">
            <div className="form-item">
              <p>Membership level:</p>
              <div className="level">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setContents({ ...contents, Level: index + 1 })}
                    style={
                      contents.Level === index + 1 ? { background: '#fff', color: '#329edc' } : {}
                    }
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-item">
              <p>Name:</p>
              <div>
                <input onChange={(e) => setContents({ ...contents, Name: e.target.value })} />
              </div>
            </div>
            <div className="form-item">
              <p>Birthday:</p>
              <DatePicker
                onChange={(date: Date) => setContents({ ...contents, Birthday: date.valueOf() })}
                selected={contents.Birthday}
              />
            </div>
            <ButtonEnable onClick={() => createCredential(contents)}>Submit</ButtonEnable>
          </Card>
        ) : (
          <Card bg="#545454" title="Made Credential">
            <p style={{ marginBottom: 27, fontSize: 20, fontWeight: 500 }}>
              Second, you need to prepare a credential.
            </p>
            <ButtonEnable onClick={() => setMading(true)}>Made Credential</ButtonEnable>
          </Card>
        )}
      </Content>
    </Wrapper>
  );
}

export default Connect;
