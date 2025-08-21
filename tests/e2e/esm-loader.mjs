import { pathToFileURL } from 'url';
import { resolve as resolvePath } from 'path';

export async function resolve(specifier, context, defaultResolve) {
  // Handle @digitalbazaar packages by redirecting to CommonJS versions
  if (specifier.startsWith('@digitalbazaar/')) {
    const packageName = specifier.split('/')[1];
    const resolved = resolvePath(process.cwd(), `node_modules/@digitalbazaar/${packageName}/lib/index.js`);
    return {
      url: pathToFileURL(resolved).href,
      format: 'commonjs'
    };
  }
  
  // Handle base64url-universal and base58-universal
  if (specifier === 'base64url-universal' || specifier === 'base58-universal') {
    const resolved = resolvePath(process.cwd(), `node_modules/${specifier}/lib/index.js`);
    return {
      url: pathToFileURL(resolved).href,
      format: 'commonjs'
    };
  }
  
  return defaultResolve(specifier, context);
}
