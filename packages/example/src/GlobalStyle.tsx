// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'normalize.css';

import { css, Global } from '@emotion/react';

function GlobalStyle() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 100;
          src: url('fonts/SourceCodePro-Thin.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 100;
          src: url('fonts/SourceCodePro-ThinItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 200;
          src: url('fonts/SourceCodePro-ExtraLight.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 200;
          src: url('fonts/SourceCodePro-ExtraLightItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: url('fonts/SourceCodePro-Light.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 300;
          src: url('fonts/SourceCodePro-LightItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('fonts/SourceCodePro-Regular.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 400;
          src: url('fonts/SourceCodePro-Italic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url('fonts/SourceCodePro-Medium.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 500;
          src: url('fonts/SourceCodePro-MediumItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url('fonts/SourceCodePro-SemiBold.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 600;
          src: url('fonts/SourceCodePro-SemiBoldItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url('fonts/SourceCodePro-Bold.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 700;
          src: url('fonts/SourceCodePro-BoldItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src: url('fonts/SourceCodePro-ExtraBold.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 800;
          src: url('fonts/SourceCodePro-ExtraBoldItalic.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: normal;
          font-display: swap;
          font-weight: 900;
          src: url('fonts/SourceCodePro-Black.ttf');
        }
        @font-face {
          font-family: 'SourceCodePro';
          font-style: italic;
          font-display: swap;
          font-weight: 900;
          src: url('fonts/SourceCodePro-BlackItalic.ttf');
        }

        body {
          font-family: SourceCodePro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol', 'Noto Color Emoji';
          background-color: #000;
          color: #fff;
          font-size: 14px;
          line-height: 1.5;
        }

        a {
          text-decoration: none;
        }

        p {
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
  );
}

export default GlobalStyle;
