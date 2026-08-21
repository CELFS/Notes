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
};

export type NavigationGroup = {
  label: string;
  path: string[];
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
  const encodedRoute = route.split('/').map(encodeURIComponent).join('/');
  return `${base}${encodedRoute}/`;
}

function plainText(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~=|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

    return {
      id,
      route,
      href: hrefFromRoute(route),
      title,
      description: typeof frontmatter.description === 'string' ? frontmatter.description : undefined,
      directory: segments.slice(0, -1),
      headings,
      Content: module.Content,
      searchText: plainText(rawModules[modulePath] ?? ''),
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
  const root: NavigationGroup = { label: '', path: [], notes: [], children: [] };

  for (const note of documentNotes) {
    let group = root;
    for (const segment of note.directory) {
      let child = group.children.find((item) => item.path.at(-1) === segment);
      if (!child) {
        child = {
          label: formatPathSegment(segment),
          path: [...group.path, segment],
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

export function getAdjacentNotes(current: Note) {
  const index = documentNotes.findIndex((note) => note.id === current.id);
  return {
    previous: index > 0 ? documentNotes[index - 1] : undefined,
    next: index >= 0 && index < documentNotes.length - 1 ? documentNotes[index + 1] : undefined,
  };
}
