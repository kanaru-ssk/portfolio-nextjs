import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#232C93" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6614120232391253"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
