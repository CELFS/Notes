const SKIPPED_NODE_TYPES = new Set(['code', 'inlineCode', 'html']);
const MARK_PATTERN = /==([^=\n]+)==/g;

function transformChildren(parent) {
  if (!Array.isArray(parent.children)) return;

  const children = [];

  for (const child of parent.children) {
    if (child.type === 'text' && MARK_PATTERN.test(child.value)) {
      MARK_PATTERN.lastIndex = 0;
      let cursor = 0;

      for (const match of child.value.matchAll(MARK_PATTERN)) {
        const index = match.index ?? 0;
        if (index > cursor) {
          children.push({ type: 'text', value: child.value.slice(cursor, index) });
        }
        children.push({
          type: 'mark',
          data: { hName: 'mark' },
          children: [{ type: 'text', value: match[1] }],
        });
        cursor = index + match[0].length;
      }

      if (cursor < child.value.length) {
        children.push({ type: 'text', value: child.value.slice(cursor) });
      }
      continue;
    }

    MARK_PATTERN.lastIndex = 0;
    if (!SKIPPED_NODE_TYPES.has(child.type)) transformChildren(child);
    children.push(child);
  }

  parent.children = children;
}

export default function remarkMark() {
  return (tree) => transformChildren(tree);
}
