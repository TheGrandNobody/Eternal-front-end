import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='img/fav-ic.png' type='image/x-icon' />
          <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.15.2/css/all.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap' />
          <link rel='stylesheet' href='/css/mdb.min.css' />
          <link rel='stylesheet' href='/css/style.css' />
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
