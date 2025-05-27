#!/usr/bin/env node
// scripts/listTree.js

const fs   = require('fs').promises;
const path = require('path');

/**
 * Rekurzivně projde `dir` a vrátí pole objektů
 * { name, type: 'file'|'directory', path, children? }
 */
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result  = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      result.push({
        name: e.name,
        type: 'directory',
        path: full,
        children: await walk(full)
      });
    } else if (e.isFile()) {
      result.push({
        name: e.name,
        type: 'file',
        path: full
      });
    }
  }

  return result;
}

const main = async () => {
  // první CLI argument je cílový adresář; default = cwd
  const targetDir = process.argv[2] || process.cwd();
  try {
    const tree = await walk(targetDir);
    // vypiš celý strom jako JSON
    console.log(JSON.stringify({
      directory: targetDir,
      children: tree
    }, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
