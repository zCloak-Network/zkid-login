// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { cryptoWaitReady } from '@polkadot/util-crypto';
import { createRoot } from 'react-dom/client';

import Root from './Root';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

const root = createRoot(rootElement);

cryptoWaitReady().then(() => root.render(<Root />));
