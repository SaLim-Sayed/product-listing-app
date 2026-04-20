/** Fake Store URLs should be HTTPS; normalize if an edge case returns `http:`. */
export function safeImageSrc(url: string): string {
  if (url.startsWith("http://")) {
    return `https://${url.slice("http://".length)}`;
  }
  return url;
}
