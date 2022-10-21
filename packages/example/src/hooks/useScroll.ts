// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ScrollContextState } from '../components/types';

import { useContext } from 'react';

import { ScrollContext } from '../components';

export const useScroll = (): ScrollContextState => {
  const context = useContext(ScrollContext);

  if (context === undefined) {
    throw new Error('useScroll must provide by ScrollProvider');
  }

  return context;
};
