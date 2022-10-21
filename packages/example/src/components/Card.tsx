// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from '@emotion/styled';
import React from 'react';

const Close = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  height: 28,

  background: '#555555',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1,
  color: '#A8A8A8',
  textDecoration: 'none',
  cursor: 'pointer'
});

const Wrapper = styled.div({
  background: '#000',
  border: '2px solid #7b7b7e',

  '.Card-title': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    padding: 20,
    borderBottom: '2px solid #7B7B7E',
    backgroundColor: '#1E1E27',
    fontWeight: 500,
    fontSize: '18px'
  }
});

function Card({
  bg,
  children,
  onClose,
  title,
  titleBg,
  titleHeight
}: {
  title: string;
  titleHeight?: number;
  children: React.ReactNode;
  onClose?: () => void;
  bg?: string;
  titleBg?: string;
}) {
  return (
    <Wrapper style={{ backgroundColor: bg }}>
      <div className="Card-title" style={{ height: titleHeight, backgroundColor: titleBg }}>
        <span style={{ textDecoration: 'underline' }}>{title}</span>
        {onClose && <Close>Close</Close>}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </Wrapper>
  );
}

export default React.memo(Card);
