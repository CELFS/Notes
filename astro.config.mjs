import { defineConfig } from 'astro/config';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { loadEnv } from 'vite';
import { SITE } from './src/config/site';
import rehypeTableWrap from './src/lib/markdown/rehype-table-wrap.mjs';
import remarkCodeLanguage from './src/lib/markdown/remark-code-language.mjs';
import remarkImageOrigin from './src/lib/markdown/remark-image-origin.mjs';
import rehypeInlineToc from './src/lib/markdown/rehype-inline-toc.mjs';
import remarkMark from './src/lib/markdown/remark-mark.mjs';
import remarkNoteLinks from './src/lib/markdown/remark-note-links.mjs';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');
const base = mode === 'production' ? '/Notes' : '/';
const imageSourceOrigins = (env.IMAGE_SOURCE_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export default defineConfig({
  site: 'https://celfs.github.io',
  base,
  trailingSlash: 'always',
  output: 'static',
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkCodeLanguage,
        remarkMark,
        [remarkNoteLinks, { base }],
        [remarkImageOrigin, {
          sources: imageSourceOrigins,
          target: env.PUBLIC_IMAGE_ORIGIN ?? '',
        }],
      ],
      rehypePlugins: [
        rehypeTableWrap,
        [rehypeKatex, { strict: false }],
        rehypeHeadingIds,
        [rehypeInlineToc, { label: SITE.contentsLabel }],
      ],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-default',
      },
      defaultColor: false,
    },
  },
});
