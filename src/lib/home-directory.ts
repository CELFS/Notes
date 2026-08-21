import type { MarkdownHeading } from 'astro';
import type { NavigationGroup } from './notes';

export type HomeDirectoryNode = {
  group: NavigationGroup;
  depth: number;
  slug: string;
  children: HomeDirectoryNode[];
};

export function getHomeDirectoryNodes(tree: NavigationGroup) {
  const buildNodes = (groups: NavigationGroup[], parentIndexes: number[]): HomeDirectoryNode[] => groups.map((group, index) => {
    const indexes = [...parentIndexes, index + 1];
    const depth = indexes.length;

    return {
      group,
      depth,
      slug: `directory-${indexes.join('-')}`,
      children: buildNodes(group.children, indexes),
    };
  });

  return buildNodes(tree.children, []);
}

export function getHomeDirectoryHeadings(nodes: HomeDirectoryNode[]) {
  const headings: MarkdownHeading[] = [];

  const collect = (items: HomeDirectoryNode[]) => {
    for (const item of items) {
      headings.push({
        depth: Math.min(item.depth + 2, 6),
        slug: item.slug,
        text: item.group.label,
      });
      collect(item.children);
    }
  };

  collect(nodes);
  return headings;
}
