/**
 * 通过 HTTP 逐一验证当前站点的全部公开笔记与目录路由。
 * 脚本只读取路由索引和本地 Markdown 数量，不会启动服务或修改任何文件。
 *
 * 使用方法：
 * 1. 检查本地开发站点：pnpm notes:check-routes
 * 2. 指定站点根地址：pnpm notes:check-routes -- --base-url https://celfs.github.io/Notes/
 */

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const notesRoot = path.join(projectRoot, 'src/content/notes');
const args = process.argv.slice(2);
const baseFlagIndex = args.indexOf('--base-url');
const baseArgument = baseFlagIndex >= 0 ? args[baseFlagIndex + 1] : undefined;
const defaultBaseUrl = 'http://localhost:33881/';
const concurrency = 8;
const timeoutMilliseconds = 10_000;

function fail(message) {
  throw new Error(message);
}

function normalizeBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`站点根地址无效：${value}`);
  }
  if (!['http:', 'https:'].includes(url.protocol)) fail('站点根地址只允许 HTTP 或 HTTPS');
  url.hash = '';
  url.search = '';
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url;
}

async function countMarkdownFiles(directory) {
  const children = await readdir(directory, { withFileTypes: true });
  let count = 0;
  for (const child of children) {
    if (child.name.startsWith('.')) continue;
    if (child.isDirectory()) {
      count += await countMarkdownFiles(path.join(directory, child.name));
    } else if (child.isFile() && child.name.toLowerCase().endsWith('.md')) {
      count += 1;
    }
  }
  return count;
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    redirect: 'manual',
    ...options,
    signal: AbortSignal.timeout(timeoutMilliseconds),
  });
}

async function checkPage(url) {
  try {
    let response = await fetchWithTimeout(url, { method: 'HEAD' });
    if (response.status === 405) response = await fetchWithTimeout(url, { method: 'GET' });
    return response.status >= 200 && response.status < 300
      ? undefined
      : `${response.status} ${url.href}`;
  } catch (error) {
    return `请求失败 ${url.href}：${error.message}`;
  }
}

async function checkPages(urls) {
  const failures = [];
  let cursor = 0;

  async function worker() {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      const failure = await checkPage(urls[index]);
      if (failure) failures.push(failure);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
  return failures;
}

async function main() {
  if (baseFlagIndex >= 0 && !baseArgument) fail('--base-url 后必须提供站点根地址');
  const baseUrl = normalizeBaseUrl(baseArgument ?? defaultBaseUrl);
  const indexUrl = new URL('route-index.json', baseUrl);

  let response;
  try {
    response = await fetchWithTimeout(indexUrl);
  } catch (error) {
    fail(`无法读取路由索引 ${indexUrl.href}：${error.message}`);
  }
  if (!response.ok) fail(`路由索引返回 ${response.status}：${indexUrl.href}`);

  let entries;
  try {
    entries = await response.json();
  } catch {
    fail(`路由索引不是有效 JSON：${indexUrl.href}`);
  }
  if (!Array.isArray(entries)) fail('路由索引必须是数组');

  const markdownCount = await countMarkdownFiles(notesRoot);
  const indexedNoteCount = entries.filter((entry) => entry?.type === 'note').length;
  if (indexedNoteCount !== markdownCount) {
    fail(`文档数量不一致：本地 ${markdownCount} 篇，索引 ${indexedNoteCount} 篇`);
  }

  const seen = new Set();
  const pageUrls = [];
  for (const [index, entry] of entries.entries()) {
    if (!entry || typeof entry.href !== 'string' || entry.href.trim() === '') {
      fail(`路由索引第 ${index + 1} 项缺少 href`);
    }
    const pageUrl = new URL(entry.href, baseUrl);
    if (pageUrl.origin !== baseUrl.origin || !pageUrl.pathname.startsWith(baseUrl.pathname)) {
      fail(`路由越过站点根地址：${entry.href}`);
    }
    const key = pageUrl.href;
    if (seen.has(key)) fail(`路由重复：${entry.href}`);
    seen.add(key);
    pageUrls.push(pageUrl);
  }
  if (!seen.has(baseUrl.href)) fail(`路由索引缺少站点首页：${baseUrl.href}`);

  console.log(`站点：${baseUrl.href}`);
  console.log(`文档：${markdownCount} 篇；目录：${pageUrls.length - markdownCount} 个；待检查页面：${pageUrls.length} 个`);
  const failures = await checkPages(pageUrls);
  if (failures.length > 0) {
    console.error(`\n失败 ${failures.length} 个：`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(`通过：${pageUrls.length}/${pageUrls.length} 个页面均可访问。`);
}

main().catch((error) => {
  console.error(`路由检查失败：${error.message}`);
  process.exitCode = 1;
});
