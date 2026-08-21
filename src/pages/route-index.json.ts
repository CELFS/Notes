import { getNavigationGroups, notes } from '../lib/notes';

export const prerender = true;

export function GET() {
  const routes = new Map(notes.map((note) => [note.href, { href: note.href, type: 'note' }]));

  for (const group of getNavigationGroups()) {
    if (!routes.has(group.href)) routes.set(group.href, { href: group.href, type: 'directory' });
  }

  return new Response(JSON.stringify([...routes.values()]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
