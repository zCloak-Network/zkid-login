import styled from '@emotion/styled';
import { docLink, githubLink, zkidWalletLink } from 'example/defaults';

const Wrapper = styled.div`
  height: 764px;
  max-height: 100vh;
  background: url('pic_bac.webp') no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0px 3px 10px #000000;
      margin: 0;
    }

    h2 {
      margin: 0;
      margin-top: 20px;
      font-size: 30px;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 3px 10px #000000;
    }
  }

  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    > div {
      margin: 0 20px;
      width: 180px;
      height: 50px;
      padding: 2px;
      background: linear-gradient(90deg, #4b45ff 0%, #25e98a 100%);
      cursor: pointer;

      > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        font-weight: 600;
        color: #fff;
        background: #000000;
      }
    }
  }
`;

function Hero() {
  return (
    <Wrapper>
      <div>
        <img src="logo_zkid_large.svg" />
        <h1>zkID Login</h1>
        <h2>Data and computation, keep both in your own hands.</h2>
        <div className="links">
          <div onClick={() => window.open(zkidWalletLink)}>
            <div>zkID Wallet</div>
          </div>
          <div onClick={() => window.open(docLink)}>
            <div>API Doc</div>
          </div>
          <div onClick={() => window.open(githubLink)}>
            <div>SDK</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Hero;
