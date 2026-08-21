const LANGUAGE_ALIASES = new Map([
  ['assembly', 'asm'],
  ['c', 'c'],
  ['c++', 'cpp'],
  ['css', 'css'],
  ['mysql', 'sql'],
  ['octave', 'matlab'],
  ['perl', 'perl'],
  ['pseudocode', 'text'],
]);

function transformNode(node) {
  if (node.type === 'code' && typeof node.lang === 'string') {
    const normalized = node.lang.trim().toLowerCase();
    node.lang = LANGUAGE_ALIASES.get(normalized) ?? node.lang;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) transformNode(child);
  }
}

export default function remarkCodeLanguage() {
  return (tree) => transformNode(tree);
}
