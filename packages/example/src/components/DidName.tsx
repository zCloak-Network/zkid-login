// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as Did from '@kiltprotocol/did';
import { DidUri } from '@kiltprotocol/types';
import React, { useEffect, useMemo, useState } from 'react';

import Address from './Address';

export const w3NameCachesPromise: Record<string, Promise<string | null> | undefined> = {};
export const w3NameCaches: Record<string, string | null | undefined> = {};

function isUri(str: unknown): str is DidUri {
  try {
    return Did.Utils.validateKiltDidUri(str);
  } catch {
    return false;
  }
}

export async function getW3Name(addressOrDidUri: DidUri | string): Promise<string | null> {
  const fromCache = w3NameCaches[addressOrDidUri];

  if (fromCache) {
    return fromCache;
  }

  const fromCachePromise = w3NameCachesPromise[addressOrDidUri];

  if (fromCachePromise) {
    return fromCachePromise;
  }

  if (isUri(addressOrDidUri)) {
    return (w3NameCachesPromise[addressOrDidUri] = Did.Web3Names.queryWeb3NameForDid(
      addressOrDidUri
    ).then((w3name) => {
      w3NameCaches[addressOrDidUri] = w3name;

      return w3name;
    }));
  } else {
    return (w3NameCachesPromise[addressOrDidUri] = Did.Web3Names.queryWeb3NameForDidIdentifier(
      addressOrDidUri
    ).then((w3name) => {
      w3NameCaches[addressOrDidUri] = w3name;

      return w3name;
    }));
  }
}

interface Props {
  value?: string | undefined | null;
  shorten?: boolean;
}

const DidName: React.FC<Props> = ({ shorten = true, value }) => {
  const [w3Name, setW3Name] = useState<string | null>(null);

  const identifier = useMemo(() => {
    if (!value) return null;

    if (!Did.Utils.isUri(value)) return 'Not Did uri';

    const { identifier, type } = Did.Utils.parseDidUri(value as any);

    if (type === 'light') {
      return identifier.slice(2);
    } else {
      return identifier;
    }
  }, [value]);

  useEffect(() => {
    if (!identifier) return;

    getW3Name(identifier).then(setW3Name);
  }, [identifier]);

  if (!value) return <></>;

  return w3Name ? (
    <>{w3Name}</>
  ) : identifier && w3NameCaches[identifier] ? (
    <>{w3NameCaches[identifier]}</>
  ) : (
    <>
      did:kilt:
      <Address shorten={shorten} value={identifier} />
    </>
  );
};

export default React.memo(DidName);
