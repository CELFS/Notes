const SKIPPED_NODE_TYPES = new Set(['code', 'inlineCode', 'html']);

function appendNode(target, node) {
  const previous = target.at(-1);

  if (previous?.type === 'text' && node.type === 'text') {
    previous.value += node.value;
    return;
  }

  target.push(node);
}

function wrapMarkedChildren(children) {
  const result = [];
  let markedChildren = null;

  const append = (node) => appendNode(markedChildren ?? result, node);
  const toggleMark = () => {
    if (markedChildren === null) {
      markedChildren = [];
      return;
    }

    if (markedChildren.length > 0) {
      result.push({
        type: 'mark',
        data: { hName: 'mark' },
        children: markedChildren,
      });
      markedChildren = null;
      return;
    }

    appendNode(result, { type: 'text', value: '==' });
  };

  for (const child of children) {
    if (child.type !== 'text' || !child.value.includes('==')) {
      append(child);
      continue;
    }

    let cursor = 0;
    let delimiterIndex = child.value.indexOf('==');

    while (delimiterIndex >= 0) {
      if (delimiterIndex > cursor) append({ type: 'text', value: child.value.slice(cursor, delimiterIndex) });
      toggleMark();
      cursor = delimiterIndex + 2;
      delimiterIndex = child.value.indexOf('==', cursor);
    }

    if (cursor < child.value.length) append({ type: 'text', value: child.value.slice(cursor) });
  }

  if (markedChildren !== null) {
    appendNode(result, { type: 'text', value: '==' });
    for (const child of markedChildren) appendNode(result, child);
  }

  return result;
}

function wrapStrongMarks(children) {
  const result = [];

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    const previous = result.at(-1);
    const next = children[index + 1];

    if (
      child.type === 'mark'
      && previous?.type === 'text'
      && previous.value.endsWith('**')
      && next?.type === 'text'
      && next.value.startsWith('**')
    ) {
      previous.value = previous.value.slice(0, -2);
      if (previous.value.length === 0) result.pop();

      next.value = next.value.slice(2);
      result.push({ type: 'strong', children: [child] });
      continue;
    }

    appendNode(result, child);
  }

  return result;
}

function transformChildren(parent) {
  if (!Array.isArray(parent.children)) return;

  for (const child of parent.children) {
    if (!SKIPPED_NODE_TYPES.has(child.type)) transformChildren(child);
  }

  parent.children = wrapStrongMarks(wrapMarkedChildren(parent.children));
}

export default function remarkMark() {
  return (tree) => transformChildren(tree);
}
