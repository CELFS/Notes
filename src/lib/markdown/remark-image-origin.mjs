function normalizeOrigin(value) {
  return value.replace(/\/+$/, '');
}

function createRewriter(sources, target) {
  const normalizedTarget = normalizeOrigin(target);
  const normalizedSources = sources.map(normalizeOrigin).filter(Boolean);

  return (url) => {
    const source = normalizedSources.find((origin) => url === origin || url.startsWith(`${origin}/`));
    if (!source || !normalizedTarget) return url;
    return `${normalizedTarget}${url.slice(source.length)}`;
  };
}

function transformNode(node, rewrite) {
  if (node.type === 'image' && typeof node.url === 'string') {
    node.url = rewrite(node.url);
  }

  if (node.type === 'html' && typeof node.value === 'string' && /<img\b/i.test(node.value)) {
    node.value = node.value.replace(
      /(<img\b[^>]*?\bsrc\s*=\s*)(["'])([^"']+)(\2)/gi,
      (_match, prefix, quote, url, closingQuote) => `${prefix}${quote}${rewrite(url)}${closingQuote}`,
    );
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) transformNode(child, rewrite);
  }
}

export default function remarkImageOrigin(options = {}) {
  const rewrite = createRewriter(options.sources ?? [], options.target ?? '');
  return (tree) => transformNode(tree, rewrite);
}
