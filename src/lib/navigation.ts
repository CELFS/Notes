import { NAVIGATION_GROUPS } from '../config/navigation';
import { SITE } from '../config/site';
import { documentNotes, getNavigationTree, type NavigationGroup } from './notes';

export function getNavigationGroupLabel(group: NavigationGroup) {
  return SITE.home.topics[group.label as keyof typeof SITE.home.topics]?.name ?? group.label.replace(/[【】]/g, '');
}

// 展示分类与文件目录分离，原始目录树继续用于生成已有页面和链接。
export function getDisplayNavigationTree() {
  const tree = getNavigationTree();
  const groups = new Map<string, NavigationGroup>();
  const collect = (group: NavigationGroup) => {
    groups.set(group.route, group);
    group.children.forEach(collect);
  };
  collect(tree);

  const findGroup = (route: string) => {
    const group = groups.get(route);
    if (!group) throw new Error(`展示分类对应的目录不存在：${route}`);
    return group;
  };

  return {
    ...tree,
    children: NAVIGATION_GROUPS.map((config) => {
      const category = findGroup(config.route);
      const notes: NavigationGroup['notes'] = [];
      const children: NavigationGroup[] = [];

      for (const route of config.sources) {
        const source = findGroup(route);
        if (route === config.route) {
          notes.push(...source.notes);
          children.push(...source.children);
        } else {
          children.push(source);
        }
      }

      return { ...category, notes, children };
    }),
  };
}

export function getNavigationGroupNotes(group: NavigationGroup) {
  const ids = new Set<string>();
  const collect = (current: NavigationGroup) => {
    current.notes.forEach((note) => ids.add(note.id));
    current.children.forEach(collect);
  };
  collect(group);
  return documentNotes.filter((note) => ids.has(note.id));
}

export function containsNavigationItem(group: NavigationGroup, activeId?: string, activeRoute?: string): boolean {
  return group.route === activeRoute
    || group.notes.some((note) => note.id === activeId)
    || group.children.some((child) => containsNavigationItem(child, activeId, activeRoute));
}
