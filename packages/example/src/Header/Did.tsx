// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from '@emotion/styled';
import React, { useContext } from 'react';

import { AppContext, DidName, IdentityIcon } from '../components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

function Did() {
  const { did } = useContext(AppContext);

  return (
    <Wrapper>
      <IdentityIcon diameter={20} value={did?.didUri} />
      <div style={{ marginLeft: 14 }}>
        <p>DID</p>
        <p>
          <DidName value={did?.didUri} />
        </p>
      </div>
    </Wrapper>
  );
}

export default React.memo(Did);
