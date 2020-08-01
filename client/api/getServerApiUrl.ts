/**
 *  For SSR Rendering
 *  Next.js doesn't proxy SSR requests to correct url
 *  It proxies to http://127.0.0.1:80 by default
 *  This is a workaround
 */
function getServerApiUrl(url: string): string {
  return `http://0.0.0.0:${process.env.APP_PORT}${url}`;
}

export default getServerApiUrl;
