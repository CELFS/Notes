import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { loadEnv } from 'vite';
import remarkImageOrigin from './src/lib/markdown/remark-image-origin.mjs';
import remarkMark from './src/lib/markdown/remark-mark.mjs';
import remarkNoteLinks from './src/lib/markdown/remark-note-links.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = '/Notes';
  const imageSourceOrigins = (env.IMAGE_SOURCE_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    site: 'https://celfs.github.io',
    base,
    trailingSlash: 'always',
    output: 'static',
    markdown: {
      processor: unified({
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          remarkMark,
          [remarkNoteLinks, { base }],
          [remarkImageOrigin, {
            sources: imageSourceOrigins,
            target: env.PUBLIC_IMAGE_ORIGIN ?? '',
          }],
        ],
        rehypePlugins: [[rehypeKatex, { strict: false }]],
      }),
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark-default',
        },
        defaultColor: false,
      },
    },
  };
});
