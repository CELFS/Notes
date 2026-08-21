/**
 * 管理本机明确选中的公开笔记，并单向复制到站点发布目录。
 * Typora 源目录始终只读；脚本不会移动、重命名、删除或改写任何源文件。
 *
 * 使用方法：
 * 1. 预览新增文件或目录：pnpm notes:add:dry -- "/path/to/note-or-directory"
 * 2. 确认并新增：pnpm notes:add -- "/path/to/note-or-directory" --write
 * 3. 预览已有笔记更新：pnpm notes:update:dry
 * 4. 确认并同步更新：pnpm notes:update -- --write
 * 5. 查看发布清单：pnpm notes:list
 */

import { constants } from 'node:fs';
import {
  access,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const destinationRoot = path.join(projectRoot, 'src/content/notes');
const args = process.argv.slice(2).filter((argument) => argument !== '--');
const writeChanges = args.includes('--write');
const explicitDryRun = args.includes('--dry');
const manifestFlagIndex = args.indexOf('--manifest');
const manifestArgument = manifestFlagIndex >= 0 ? args[manifestFlagIndex + 1] : undefined;
const manifestPath = path.resolve(projectRoot, manifestArgument ?? '.notes-publish.local.json');
const mode = args.includes('--add') ? 'add' : args.includes('--list') ? 'list' : 'update';

function fail(message) {
  throw new Error(message);
}

function normalizeRelativeMarkdown(value, label) {
  if (typeof value !== 'string' || value.trim() === '') fail(`${label} 必须是非空字符串`);
  if (path.isAbsolute(value)) fail(`${label} 不能是绝对路径：${value}`);

  const normalized = path.normalize(value);
  const segments = normalized.split(path.sep);
  if (segments.includes('..')) fail(`${label} 不能离开配置的根目录：${value}`);
  if (segments.includes('.backup')) fail(`${label} 不能发布 .backup 中的文件：${value}`);
  if (!normalized.toLowerCase().endsWith('.md')) fail(`${label} 只允许 Markdown 文件：${value}`);
  return normalized;
}

function normalizeEntry(entry, index) {
  if (typeof entry === 'string') {
    const relativePath = normalizeRelativeMarkdown(entry, `entries[${index}]`);
    return { from: relativePath, to: relativePath };
  }

  if (!entry || typeof entry !== 'object') fail(`entries[${index}] 格式无效`);
  return {
    from: normalizeRelativeMarkdown(entry.from, `entries[${index}].from`),
    to: normalizeRelativeMarkdown(entry.to, `entries[${index}].to`),
  };
}

function serializeEntry(entry) {
  return entry.from === entry.to ? entry.from : { from: entry.from, to: entry.to };
}

function isInside(root, candidate) {
  return candidate === root || candidate.startsWith(`${root}${path.sep}`);
}

function isPrivatePath(relativePath) {
  return relativePath
    .split(path.sep)
    .some((segment) => segment === '.backup' || segment.startsWith('.'));
}

function getPositionalArguments() {
  const positional = [];
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--manifest') {
      index += 1;
      continue;
    }
    if (['--add', '--list', '--update', '--write', '--dry'].includes(argument)) continue;
    positional.push(argument);
  }
  return positional;
}

async function readManifest() {
  let source;
  try {
    source = await readFile(manifestPath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      fail(`找不到本机发布清单：${manifestPath}\n请参考 .notes-publish.example.json 创建清单。`);
    }
    throw error;
  }

  let manifest;
  try {
    manifest = JSON.parse(source);
  } catch {
    fail(`发布清单不是有效 JSON：${manifestPath}`);
  }

  if (typeof manifest.sourceRoot !== 'string' || manifest.sourceRoot.trim() === '') {
    fail('sourceRoot 必须是 Typora 笔记目录的绝对路径');
  }
  if (!path.isAbsolute(manifest.sourceRoot)) fail('sourceRoot 必须使用绝对路径');
  if (!Array.isArray(manifest.entries)) fail('entries 必须是数组');

  return {
    sourceRoot: manifest.sourceRoot,
    entries: manifest.entries.map(normalizeEntry),
  };
}

async function writeManifest(manifest) {
  const temporaryPath = `${manifestPath}.notes-syncing`;
  const output = `${JSON.stringify({
    sourceRoot: manifest.sourceRoot,
    entries: manifest.entries.map(serializeEntry),
  }, null, 2)}\n`;

  await rm(temporaryPath, { force: true });
  try {
    await writeFile(temporaryPath, output, { flag: 'wx' });
    JSON.parse(await readFile(temporaryPath, 'utf8'));
    await rename(temporaryPath, manifestPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

async function inspectEntry(entry, sourceRootReal, seenTargets) {
  const sourcePath = path.resolve(sourceRootReal, entry.from);
  const destinationPath = path.resolve(destinationRoot, entry.to);

  if (!isInside(sourceRootReal, sourcePath)) fail(`源文件越过 sourceRoot：${entry.from}`);
  if (!isInside(destinationRoot, destinationPath)) fail(`发布文件越过目标目录：${entry.to}`);
  if (seenTargets.has(destinationPath)) fail(`多个条目写入同一发布路径：${entry.to}`);
  seenTargets.add(destinationPath);

  let sourceReal;
  try {
    sourceReal = await realpath(sourcePath);
  } catch (error) {
    if (error?.code === 'ENOENT') fail(`源文件不存在：${entry.from}`);
    throw error;
  }

  if (!isInside(sourceRootReal, sourceReal)) fail(`源文件通过链接越过 sourceRoot：${entry.from}`);
  const sourceStat = await stat(sourceReal);
  if (!sourceStat.isFile()) fail(`源路径不是文件：${entry.from}`);
  await access(sourceReal, constants.R_OK);

  const sourceBuffer = await readFile(sourceReal);
  let destinationBuffer;
  try {
    destinationBuffer = await readFile(destinationPath);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const status = destinationBuffer
    ? (sourceBuffer.equals(destinationBuffer) ? 'unchanged' : 'changed')
    : 'new';

  return {
    ...entry,
    sourceReal,
    sourceBuffer,
    destinationPath,
    status,
  };
}

async function writeEntry(entry) {
  if (entry.status === 'unchanged') return;

  await mkdir(path.dirname(entry.destinationPath), { recursive: true });
  const temporaryPath = `${entry.destinationPath}.notes-syncing`;
  await rm(temporaryPath, { force: true });

  try {
    await writeFile(temporaryPath, entry.sourceBuffer, { flag: 'wx' });
    const writtenBuffer = await readFile(temporaryPath);
    if (!writtenBuffer.equals(entry.sourceBuffer)) fail(`复制校验失败：${entry.to}`);
    await rename(temporaryPath, entry.destinationPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

async function collectMarkdownFiles(directoryReal, sourceRootReal, collected) {
  const children = await readdir(directoryReal, { withFileTypes: true });
  children.sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'));

  for (const child of children) {
    if (child.name.startsWith('.') || child.name === '.backup') continue;
    const childPath = path.join(directoryReal, child.name);
    if (child.isSymbolicLink()) fail(`目录中存在符号链接，请单独确认后再处理：${childPath}`);
    if (child.isDirectory()) {
      await collectMarkdownFiles(childPath, sourceRootReal, collected);
      continue;
    }
    if (!child.isFile() || !child.name.toLowerCase().endsWith('.md')) continue;

    const relativePath = path.relative(sourceRootReal, childPath);
    if (isPrivatePath(relativePath)) continue;
    collected.add(normalizeRelativeMarkdown(relativePath, '新增文档'));
  }
}

async function expandAddInputs(inputs, sourceRootReal) {
  const collected = new Set();

  for (const input of inputs) {
    const requestedPath = path.isAbsolute(input)
      ? path.resolve(input)
      : path.resolve(sourceRootReal, input);
    let requestedReal;
    try {
      requestedReal = await realpath(requestedPath);
    } catch (error) {
      if (error?.code === 'ENOENT') fail(`新增路径不存在：${input}`);
      throw error;
    }

    if (!isInside(sourceRootReal, requestedReal)) fail(`新增路径不在 Typora 根目录中：${input}`);
    const relativePath = path.relative(sourceRootReal, requestedReal);
    if (isPrivatePath(relativePath)) fail(`不能添加隐藏目录或 .backup 中的内容：${input}`);

    const requestedStat = await stat(requestedReal);
    if (requestedStat.isDirectory()) {
      await collectMarkdownFiles(requestedReal, sourceRootReal, collected);
      continue;
    }
    if (!requestedStat.isFile()) fail(`新增路径不是文件或目录：${input}`);
    collected.add(normalizeRelativeMarkdown(relativePath, '新增文档'));
  }

  return [...collected];
}

function printChanges(inspected) {
  const counts = { new: 0, changed: 0, unchanged: 0 };
  for (const entry of inspected) {
    counts[entry.status] += 1;
    if (entry.status !== 'unchanged') {
      console.log(`${entry.status === 'new' ? '新增' : '更新'}  ${entry.from} -> ${entry.to}`);
    }
  }
  console.log(`\n共 ${inspected.length} 篇：新增 ${counts.new}，更新 ${counts.changed}，未变化 ${counts.unchanged}`);
}

async function runUpdate(manifest, sourceRootReal) {
  const seenTargets = new Set();
  const inspected = [];
  for (const entry of manifest.entries) {
    inspected.push(await inspectEntry(entry, sourceRootReal, seenTargets));
  }

  printChanges(inspected);
  if (!writeChanges) {
    console.log('DRY RUN：没有写入。确认后运行：pnpm notes:update -- --write');
    return;
  }

  for (const entry of inspected) await writeEntry(entry);
  console.log(`已完成单向更新，Typora 源目录没有被修改：${sourceRootReal}`);
}

async function runAdd(manifest, sourceRootReal) {
  const inputs = getPositionalArguments();
  if (inputs.length === 0) fail('请提供要新增的 Markdown 文件或目录路径');

  const candidates = await expandAddInputs(inputs, sourceRootReal);
  const existingSources = new Set(manifest.entries.map((entry) => entry.from));
  const additions = candidates
    .filter((relativePath) => !existingSources.has(relativePath))
    .map((relativePath) => ({ from: relativePath, to: relativePath }));
  const skippedCount = candidates.length - additions.length;

  console.log(`扫描到 ${candidates.length} 篇 Markdown；待加入 ${additions.length} 篇，清单中已有 ${skippedCount} 篇。`);
  if (additions.length === 0) {
    console.log('没有需要加入发布清单的新文档。');
    return;
  }

  const seenTargets = new Set(manifest.entries.map((entry) => path.resolve(destinationRoot, entry.to)));
  const inspected = [];
  for (const entry of additions) {
    inspected.push(await inspectEntry(entry, sourceRootReal, seenTargets));
  }
  printChanges(inspected);

  if (!writeChanges) {
    console.log('DRY RUN：没有修改清单，也没有复制。确认后在相同命令末尾添加 --write');
    return;
  }

  const updatedManifest = {
    sourceRoot: manifest.sourceRoot,
    entries: [...manifest.entries, ...additions],
  };
  await writeManifest(updatedManifest);
  for (const entry of inspected) await writeEntry(entry);
  console.log(`已加入 ${additions.length} 篇并完成单向复制，Typora 源目录没有被修改：${sourceRootReal}`);
}

async function main() {
  if (writeChanges && explicitDryRun) fail('--dry 与 --write 不能同时使用');

  const manifest = await readManifest();
  if (mode === 'list') {
    console.log(`发布清单：${manifestPath}`);
    console.log(`Typora 根目录：${manifest.sourceRoot}`);
    for (const entry of manifest.entries) {
      console.log(entry.from === entry.to ? entry.from : `${entry.from} -> ${entry.to}`);
    }
    console.log(`\n共 ${manifest.entries.length} 篇。`);
    return;
  }

  const sourceRootReal = await realpath(manifest.sourceRoot);
  const sourceRootStat = await stat(sourceRootReal);
  if (!sourceRootStat.isDirectory()) fail('sourceRoot 不是目录');

  if (mode === 'add') {
    await runAdd(manifest, sourceRootReal);
    return;
  }
  await runUpdate(manifest, sourceRootReal);
}

main().catch((error) => {
  console.error(`同步失败：${error.message}`);
  process.exitCode = 1;
});
