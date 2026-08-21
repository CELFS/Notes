import { formatPathSegment, notes } from '../lib/notes';

export const prerender = true;

export function GET() {
  const body = notes.map((note) => ({
    title: note.title,
    href: note.href,
    directory: note.directory.map(formatPathSegment).join(' / '),
    text: note.searchText,
  }));

  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
