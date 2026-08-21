import type { MarkdownHeading } from 'astro';

type MarkdownModule = {
  Content: unknown;
  frontmatter?: Record<string, unknown>;
  getHeadings?: () => MarkdownHeading[];
};

export type Note = {
  id: string;
  route: string;
  href: string;
  title: string;
  description?: string;
  directory: string[];
  headings: MarkdownHeading[];
  Content: unknown;
  searchText: string;
  wordCount: number;
};

export type NavigationGroup = {
  label: string;
  path: string[];
  route: string;
  href: string;
  notes: Note[];
  children: NavigationGroup[];
};

const markdownModules = import.meta.glob<MarkdownModule>('../content/notes/**/*.md', {
  eager: true,
});

const rawModules = import.meta.glob<string>('../content/notes/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const collator = new Intl.Collator('zh-Hans-CN', {
  numeric: true,
  sensitivity: 'base',
});

export function formatPathSegment(value: string) {
  const decoded = decodeURIComponent(value)
    .replace(/^\d+[._-]*/, '')
    .replace(/[_-]+/g, ' ')
    .trim();
  return decoded || value;
}

function pathFromModule(modulePath: string) {
  return modulePath
    .replace(/^\.\.\/content\/notes\//, '')
    .replace(/\.md$/i, '');
}

function routeFromId(id: string) {
  const segments = id.split('/');
  const leaf = segments.at(-1)?.toLowerCase();
  if (leaf === 'readme' || leaf === 'index') segments.pop();
  return segments.join('/');
}

function hrefFromRoute(route: string) {
  const base = import.meta.env.BASE_URL;
  if (!route) return base;
  const encodedRoute = route
    .split('/')
    .map((segment) => encodeURIComponent(segment).replace(/%2B/gi, '+'))
    .join('/');
  return `${base}${encodedRoute}/`;
}

function plainText(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/(```|~~~)[\s\S]*?\1/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~=|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text: string) {
  const hanCharacters = text.match(/\p{Script=Han}/gu)?.length ?? 0;
  const remainingText = text.replace(/\p{Script=Han}/gu, ' ');
  const words = remainingText.match(/[\p{Letter}\p{Number}]+(?:[’'-][\p{Letter}\p{Number}]+)*/gu)?.length ?? 0;
  return hanCharacters + words;
}

export const notes: Note[] = Object.entries(markdownModules)
  .map(([modulePath, module]) => {
    const id = pathFromModule(modulePath);
    const route = routeFromId(id);
    const segments = id.split('/');
    const filename = segments.at(-1) ?? id;
    const frontmatter = module.frontmatter ?? {};
    const headings = module.getHeadings?.() ?? [];
    const title = typeof frontmatter.title === 'string'
      ? frontmatter.title
      : headings[0]?.text ?? formatPathSegment(filename);
    const searchText = plainText(rawModules[modulePath] ?? '');

    return {
      id,
      route,
      href: hrefFromRoute(route),
      title,
      description: typeof frontmatter.description === 'string' ? frontmatter.description : undefined,
      directory: segments.slice(0, -1),
      headings,
      Content: module.Content,
      searchText,
      wordCount: countWords(searchText),
    };
  })
  .sort((left, right) => collator.compare(left.id, right.id));

const routeOwners = new Map<string, string>();
for (const note of notes) {
  const previousOwner = routeOwners.get(note.route);
  if (previousOwner) {
    throw new Error(`发布路径冲突：${previousOwner} 与 ${note.id} 都会生成 /${note.route}`);
  }
  routeOwners.set(note.route, note.id);
}

export const homeNote = notes.find((note) => note.route === '');
export const documentNotes = notes.filter((note) => note.route !== '');

export function getNavigationTree() {
  const root: NavigationGroup = {
    label: '',
    path: [],
    route: '',
    href: import.meta.env.BASE_URL,
    notes: [],
    children: [],
  };

  for (const note of documentNotes) {
    let group = root;
    for (const segment of note.directory) {
      let child = group.children.find((item) => item.path.at(-1) === segment);
      if (!child) {
        const childPath = [...group.path, segment];
        const childRoute = childPath.join('/');
        child = {
          label: formatPathSegment(segment),
          path: childPath,
          route: childRoute,
          href: hrefFromRoute(childRoute),
          notes: [],
          children: [],
        };
        group.children.push(child);
      }
      group = child;
    }
    group.notes.push(note);
  }

  const sortGroup = (group: NavigationGroup) => {
    group.notes.sort((left, right) => collator.compare(left.id, right.id));
    group.children.sort((left, right) => collator.compare(left.path.at(-1) ?? '', right.path.at(-1) ?? ''));
    group.children.forEach(sortGroup);
  };

  sortGroup(root);
  return root;
}

export function getNavigationGroups() {
  const groups: NavigationGroup[] = [];

  const collect = (group: NavigationGroup) => {
    for (const child of group.children) {
      groups.push(child);
      collect(child);
    }
  };

  collect(getNavigationTree());
  return groups;
}

export function getGroupLandingNote(group: NavigationGroup) {
  return group.notes.find((note) => note.route === group.route);
}

export function isCollapsibleNavigationGroup(group: NavigationGroup) {
  return group.notes.length === 0 && group.children.length === 1;
}

export function getNavigationGroupContents(group: NavigationGroup) {
  let content = group;
  while (isCollapsibleNavigationGroup(content)) content = content.children[0];

  return {
    notes: content.notes.filter((note) => note.route !== group.route),
    children: content.children,
  };
}

export function getBreadcrumbGroups(path: string[]) {
  const groups: NavigationGroup[] = [];
  let current = getNavigationTree();

  for (const segment of path) {
    const parent = current;
    const child = parent.children.find((group) => group.path.at(-1) === segment);
    if (!child) break;
    if (parent.path.length === 0 || !isCollapsibleNavigationGroup(parent)) groups.push(child);
    current = child;
  }

  return groups;
}

export function getAdjacentNotes(current: Note) {
  const index = documentNotes.findIndex((note) => note.id === current.id);
  return {
    previous: index > 0 ? documentNotes[index - 1] : undefined,
    next: index >= 0 && index < documentNotes.length - 1 ? documentNotes[index + 1] : undefined,
  };
}
