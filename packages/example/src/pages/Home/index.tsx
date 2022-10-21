// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from '@emotion/styled';

import Connect from './Connect';
import Hero from './Hero';
import Logins from './Logins';

const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
  padding: 100px 0;
`;

function Home() {
  return (
    <>
      <Hero />
      <Container>
        <Connect />
        <Logins />
      </Container>
    </>
  );
}

export default Home;
