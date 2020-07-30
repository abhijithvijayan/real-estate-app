import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): ReturnType<typeof ctx.renderPage> =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          enhanceApp: (App) => (props) =>
            // eslint-disable-next-line react/jsx-props-no-spreading
            sheet.collectStyles(<App {...props} />),
          // useful for wrapping in a per-page basis
          enhanceComponent: (Component) => Component,
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    return (
      <Html lang="en">
        {/* https://git.io/JJ2v4 */}
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
