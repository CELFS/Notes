import path from 'node:path';

const CONTENT_MARKER = '/src/content/notes/';
const EXTERNAL_PROTOCOL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

function routeFromMarkdownPath(markdownPath) {
  const withoutExtension = markdownPath.replace(/\.(?:md|markdown)$/i, '');
  const segments = withoutExtension.split('/').filter(Boolean);
  const leaf = segments.at(-1)?.toLowerCase();
  if (leaf === 'readme' || leaf === 'index') segments.pop();
  return segments
    .map((segment) => encodeURIComponent(segment).replace(/%2B/gi, '+'))
    .join('/');
}

function rewriteMarkdownUrl(url, sourcePath, base) {
  if (!url || url.startsWith('#') || EXTERNAL_PROTOCOL.test(url)) return url;

  const match = url.match(/^([^?#]+)([?#].*)?$/);
  if (!match || !/\.(?:md|markdown)$/i.test(match[1])) return url;

  const sourceDirectory = path.posix.dirname(sourcePath);
  const targetPath = match[1].startsWith('/')
    ? match[1].slice(1)
    : path.posix.normalize(path.posix.join(sourceDirectory, match[1]));
  const route = routeFromMarkdownPath(targetPath);
  const suffix = match[2] ?? '';
  return route ? `${base}${route}/${suffix}` : `${base}${suffix}`;
}

function transformNode(node, rewrite) {
  if (node.type === 'link' && typeof node.url === 'string') {
    node.url = rewrite(node.url);
  }

  if (node.type === 'html' && typeof node.value === 'string' && /<a\b/i.test(node.value)) {
    node.value = node.value.replace(
      /(<a\b[^>]*?\bhref\s*=\s*)(["'])([^"']+)(\2)/gi,
      (_match, prefix, quote, url, closingQuote) => `${prefix}${quote}${rewrite(url)}${closingQuote}`,
    );
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) transformNode(child, rewrite);
  }
}

export default function remarkNoteLinks(options = {}) {
  const base = `/${String(options.base ?? '').replace(/^\/+|\/+$/g, '')}/`;

  return (tree, file) => {
    const normalizedPath = String(file.path ?? '').replaceAll('\\', '/');
    const markerIndex = normalizedPath.lastIndexOf(CONTENT_MARKER);
    const sourcePath = markerIndex >= 0
      ? normalizedPath.slice(markerIndex + CONTENT_MARKER.length)
      : path.posix.basename(normalizedPath);
    const rewrite = (url) => rewriteMarkdownUrl(url, sourcePath, base);
    transformNode(tree, rewrite);
  };
}
