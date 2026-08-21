function transformChildren(parent) {
  if (!Array.isArray(parent.children)) return;

  parent.children = parent.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap', 'custom-scrollbar'] },
        children: [child],
      };
    }

    transformChildren(child);
    return child;
  });
}

export default function rehypeTableWrap() {
  return (tree) => transformChildren(tree);
}
