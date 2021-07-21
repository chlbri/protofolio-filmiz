/** @format */

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
          <title>Filmiz 2.0</title>
          <meta
            name='description'
            content='A place to find a great film to watch'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
