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
