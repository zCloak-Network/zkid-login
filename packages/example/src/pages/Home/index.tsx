import styled from '@emotion/styled';

import Connect from './Connect';
import Logins from './Logins';

const Wrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  padding: 100px 0;
`;

function Home() {
  return (
    <Wrapper>
      <Connect />
      <Logins />
    </Wrapper>
  );
}

export default Home;
