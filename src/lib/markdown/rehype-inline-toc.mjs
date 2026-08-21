function createList() {
  return {
    type: 'element',
    tagName: 'ul',
    properties: {},
    children: [],
  };
}

function createTocList(headings) {
  const root = createList();
  const stack = [{ depth: 1, list: root }];

  for (const heading of headings) {
    while (stack.length > 1 && stack.at(-1).depth >= heading.depth) stack.pop();

    const parent = stack.at(-1);
    let list = parent.list;

    if (parent.item) {
      if (!parent.childList) {
        parent.childList = createList();
        parent.item.children.push(parent.childList);
      }
      list = parent.childList;
    }

    const item = {
      type: 'element',
      tagName: 'li',
      properties: {},
      children: [{
        type: 'element',
        tagName: 'a',
        properties: { href: `#${heading.slug}` },
        children: [{ type: 'text', value: heading.text }],
      }],
    };

    list.children.push(item);
    stack.push({ depth: heading.depth, list, item });
  }

  return root;
}

function isTocPlaceholder(node) {
  return node.type === 'element'
    && node.tagName === 'p'
    && node.children.length === 1
    && node.children[0].type === 'text'
    && node.children[0].value.trim().toUpperCase() === '[TOC]';
}

function replacePlaceholders(parent, replacement) {
  if (!Array.isArray(parent.children)) return;

  parent.children = parent.children.map((child) => {
    if (isTocPlaceholder(child)) return structuredClone(replacement);
    replacePlaceholders(child, replacement);
    return child;
  });
}

export default function rehypeInlineToc({ label } = {}) {
  return (tree, file) => {
    const headings = (file.data.astro?.headings ?? [])
      .filter((heading) => heading.depth >= 2 && heading.depth <= 4);

    const toc = {
      type: 'element',
      tagName: 'details',
      properties: { className: ['inline-toc'] },
      children: [
        {
          type: 'element',
          tagName: 'summary',
          properties: { className: ['inline-toc__summary'] },
          children: [{ type: 'text', value: label }],
        },
        {
          type: 'element',
          tagName: 'nav',
          properties: { className: ['inline-toc__nav'], ariaLabel: label },
          children: [createTocList(headings)],
        },
      ],
    };

    replacePlaceholders(tree, toc);
  };
}
