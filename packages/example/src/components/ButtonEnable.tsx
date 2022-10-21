// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';

import { AppContext } from './AppProvider';
import Button, { ButtonProps } from './Button';

function ButtonEnable(props: ButtonProps) {
  const { auth, authed } = useContext(AppContext);

  return authed ? (
    <Button {...props} />
  ) : (
    <Button {...props} onClick={auth}>
      Enable
    </Button>
  );
}

export default React.memo(ButtonEnable);
