// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Home from './pages/Home';
import { AppProvider, ScrollProvider } from './components';
import GlobalStyle from './GlobalStyle';
import Header from './Header';

function Root() {
  return (
    <AppProvider>
      <GlobalStyle />
      <ScrollProvider>
        <Header />
        <Home />
      </ScrollProvider>
    </AppProvider>
  );
}

export default Root;
