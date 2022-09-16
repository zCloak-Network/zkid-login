import type {
  DidInfo,
  DidSignResponse,
  RequestCredentialContentReponse,
  RequestCredentialDigestReponse
} from '@zcloak/login-rpc';

import { Check, LockSharp } from '@mui/icons-material';
import { Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { stringToHex } from '@polkadot/util';
import { randomAsHex } from '@polkadot/util-crypto';
import { useEffect, useMemo, useState } from 'react';

import { Request } from '@zcloak/login-rpc';

const request: Request = (window as any).zkid.request;

function Root() {
  const [enabled, setEnabled] = useState(false);
  const [did, setDid] = useState<DidInfo>();
  const [signature, setSignature] = useState<DidSignResponse>();
  const [credentialDigest, setCredentialDigest] = useState<RequestCredentialDigestReponse>();
  const [credential, setCredential] = useState<RequestCredentialContentReponse>();

  useEffect(() => {
    request.request('wallet_isAuth', undefined).then((res) => setEnabled(res));
  }, []);

  const attester = useMemo(
    () => credential?.attestation.owner ?? credentialDigest?.attester,
    [credentialDigest, credential]
  );
  const revoked = useMemo(
    () => credential?.attestation.revoked ?? credentialDigest?.revoked,
    [credentialDigest, credential]
  );

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            request.request('wallet_requestAuth', undefined).then(setEnabled);
          }}
          variant="contained"
        >
          Enable
        </Button>
        <Button
          onClick={() => {
            request.request('did_getCurrent', undefined).then(setDid);
          }}
          variant="contained"
        >
          Get Did
        </Button>
        <Button
          onClick={() => {
            request
              .request('did_sign', {
                payload: stringToHex(`${window.location.host} wants you to sign in with your did:
${did?.didUri}

I accept the ServiceOrg Terms of Service: ${window.location.host}

URI: ${window.location.href}
Nonce: ${randomAsHex()}
Issued At: ${new Date().toString()})`)
              })
              .then(setSignature);
          }}
          variant="contained"
        >
          Did login(Sign with did)
        </Button>
        <Button
          onClick={() => {
            request
              .request('did_requestCredentialDigest', {
                challenge: `${randomAsHex}-${Date.now()}`
              })
              .then(setCredentialDigest);
          }}
          variant="contained"
        >
          Login with credential digest
        </Button>
        <Button
          onClick={() => {
            request
              .request('did_requestCredentialContent', {
                challenge: `${randomAsHex}-${Date.now()}`
              })
              .then(setCredential);
          }}
          variant="contained"
        >
          Login with credential content
        </Button>
      </Stack>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Enabled</TableCell>
            <TableCell>
              {enabled ? <Typography color="success.main">Success</Typography> : <LockSharp />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Did</TableCell>
            <TableCell>{did ? did.didUri : <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Authentication Key</TableCell>
            <TableCell>{did ? did.authenticationKey : <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Encryption Key</TableCell>
            <TableCell>{did ? did.encryptionKey.join('\n') : <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Attestation Key</TableCell>
            <TableCell>{did ? did.attestationKey : <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Delegation Key</TableCell>
            <TableCell>{did ? did.delegationKey : <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Did login info</TableCell>
            <TableCell>{signature || <LockSharp />}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Credential status</TableCell>
            <TableCell>
              {credential || credentialDigest ? (
                revoked ? (
                  <Typography color="error.main">revoked</Typography>
                ) : (
                  <Typography color="success.main">attested by {attester}</Typography>
                )
              ) : (
                <LockSharp />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Your Name</TableCell>
            <TableCell>
              {credential ? <>{credential?.request.claim.contents.name}</> : <LockSharp />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Your Age</TableCell>
            <TableCell>
              {credential ? <>{credential?.request.claim.contents.age}</> : <LockSharp />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Age ≥ 18</TableCell>
            <TableCell>
              {credential ? (
                credential?.request.claim.contents.age >= 18 ? (
                  <Typography color="success.main">Your age ≥ 18</Typography>
                ) : (
                  <Typography color="error.main">
                    Your age ≤ 18, <Check />
                  </Typography>
                )
              ) : (
                <LockSharp />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default Root;
