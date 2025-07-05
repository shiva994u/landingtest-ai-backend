export const ingestInput = async ({ url, figmaFile }) => {
  if (url) {
    return { html: `<html><body>URL Snapshot from ${url}</body></html>` };
  }

  if (figmaFile) {
    return { html: `<html><body>Figma Mockup Render</body></html>` };
  }

  throw new Error("Invalid input");
};
