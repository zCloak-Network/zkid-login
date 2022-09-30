import styled from '@emotion/styled';
import { AppContext } from 'example/components';
import React, { useContext, useMemo } from 'react';

import { useScroll } from '../hooks';
import Did from './Did';

const Wrapper = styled.div`
  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;

  transition: all 0.3s;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  width: 1160px;

  .logo {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: white;

    > img {
      margin-right: 10px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    > div {
      margin-left: 32px;
      :nth-of-type(1) {
        margin-left: 0;
      }
    }
  }
`;

function Header() {
  const { scrollTop, scrollTopOffset } = useScroll();
  const { credentialContent, credentialDigest } = useContext(AppContext);

  const layout = useMemo(() => {
    let top: number;
    let backgroundColor: string;
    let borderBottom: string;

    if (scrollTop > 100) {
      if (scrollTopOffset > 0) {
        top = -80;
      } else {
        top = 0;
      }

      backgroundColor = '#000';
      borderBottom = '1px solid #fff';
    } else {
      top = 0;
      backgroundColor = 'transparent';
      borderBottom = 'none';
    }

    return { top, backgroundColor, borderBottom };
  }, [scrollTop, scrollTopOffset]);

  return (
    <Wrapper
      style={{
        top: layout.top,
        backgroundColor: layout.backgroundColor,
        borderBottom: layout.borderBottom
      }}
    >
      <HeaderContainer>
        <a className="logo" href=".">
          <img src="logo_zkid.svg" />
          <span>zkID Login</span>
        </a>
        <div className="right">
          <Did />
          <div style={{ width: 1, height: 32, background: '#fff' }} />
          <div>
            <p>Roothash</p>
            <p
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 150
              }}
            >
              {credentialContent?.attestation.claimHash ?? credentialDigest?.rootHash ?? 'None'}
            </p>
          </div>
          <div>
            <p>Membership Level</p>
            <p>{(credentialContent?.request.claim.contents.Level as number) || 'None'}</p>
          </div>
        </div>
      </HeaderContainer>
    </Wrapper>
  );
}

export default React.memo(Header);
