// arquivo que serve para configurar qual é o formato
// do HTML que fica por volta da nossa aplicação

import Document, { Html, Head, Main, NextScript } from "next/document";

// o documente aqui do next so pode ser escrito em forma de classe
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
