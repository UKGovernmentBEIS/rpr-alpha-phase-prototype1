import Document, { Html, Head, Main, NextScript } from 'next/document'

class GdsDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="govuk-template app-html-class">
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta name="theme-color" content="blue" />

            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/images/favicon.ico" type="image/x-icon" />
            <link rel="mask-icon" href="/images/govuk-mask-icon.svg" color="blue" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/govuk-apple-touch-icon-180x180.png" />
            <link rel="apple-touch-icon" sizes="167x167" href="/images/govuk-apple-touch-icon-167x167.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/govuk-apple-touch-icon-152x152.png" />
            <link rel="apple-touch-icon" href="/images/govuk-apple-touch-icon.png" />

            <meta property="og:image" content="/images/govuk-opengraph-image.png" />
        </Head>
        <body className="govuk-template__body app-body-class">
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: 
              "document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');"
            }} />

            <a href="#main-content" className="govuk-skip-link">Skip to main content</a>

            <Main />
            <script src="/scripts/govuk.js"></script>
            <NextScript />
        </body>
      </Html>
    )
  }
}

export default GdsDocument