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
