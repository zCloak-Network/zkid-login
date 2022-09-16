import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { createRoot } from 'react-dom/client';

import Root from './Root';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

const root = createRoot(rootElement);

cryptoWaitReady().then(() =>
  root.render(
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Root />
    </StyledEngineProvider>
  )
);
