#!/usr/bin/env node
/**
 * validate-i18n.js
 *
 * CI guard for translation coverage. Compares every locale JSON file's
 * key set against the canonical en.json key set. Fails (exit 1) if any
 * locale is missing keys that en.json has, or has stray extra keys.
 *
 * Usage:
 *   node validate-i18n.js [--dir <path-to-locales>] [--source en.json]
 *
 * Defaults: --dir ./locales --source en.json (looked up inside --dir)
 *
 * Add to CI as a required step, e.g. in package.json:
 *   "scripts": { "i18n:check": "node ci/validate-i18n.js" }
 * and in your pipeline: `npm run i18n:check` before build/deploy.
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { dir: './locales', source: 'en.json' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--dir') args.dir = argv[++i];
    else if (argv[i] === '--source') args.source = argv[++i];
  }
  return args;
}

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(flattenKeys(v, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function main() {
  const { dir, source } = parseArgs(process.argv.slice(2));
  const sourcePath = path.join(dir, source);

  if (!fs.existsSync(sourcePath)) {
    console.error(`✖ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const sourceJson = loadJson(sourcePath);
  const sourceKeys = new Set(flattenKeys(sourceJson));

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== source);

  if (files.length === 0) {
    console.error(`✖ No locale files found in ${dir} (besides ${source})`);
    process.exit(1);
  }

  let hasFailure = false;
  const results = [];

  for (const file of files) {
    const locale = path.basename(file, '.json');
    let localeJson;
    try {
      localeJson = loadJson(path.join(dir, file));
    } catch (err) {
      results.push({ locale, ok: false, error: `Invalid JSON: ${err.message}` });
      hasFailure = true;
      continue;
    }

    const localeKeys = new Set(flattenKeys(localeJson));
    const missing = [...sourceKeys].filter((k) => !localeKeys.has(k));
    const extra = [...localeKeys].filter((k) => !sourceKeys.has(k));

    // A key "existing" but with an empty/placeholder string still counts
    // as missing coverage — catches keys that were added but left blank.
    const blank = [...sourceKeys].filter((k) => {
      if (!localeKeys.has(k)) return false;
      const val = k.split('.').reduce((o, p) => (o ? o[p] : undefined), localeJson);
      return typeof val === 'string' && val.trim() === '';
    });

    const ok = missing.length === 0 && extra.length === 0 && blank.length === 0;
    if (!ok) hasFailure = true;

    results.push({
      locale,
      ok,
      total: localeKeys.size,
      missing,
      extra,
      blank,
    });
  }

  console.log(`\ni18n coverage check — source: ${source} (${sourceKeys.size} keys)\n`);

  for (const r of results) {
    if (r.error) {
      console.log(`✖ ${r.locale}: ${r.error}`);
      continue;
    }
    if (r.ok) {
      console.log(`✔ ${r.locale}: ${r.total}/${sourceKeys.size} keys (100%)`);
    } else {
      const pct = (((sourceKeys.size - r.missing.length) / sourceKeys.size) * 100).toFixed(1);
      console.log(`✖ ${r.locale}: ${pct}% coverage`);
      if (r.missing.length) {
        console.log(`    missing (${r.missing.length}): ${r.missing.slice(0, 10).join(', ')}${r.missing.length > 10 ? ', …' : ''}`);
      }
      if (r.blank.length) {
        console.log(`    blank values (${r.blank.length}): ${r.blank.slice(0, 10).join(', ')}${r.blank.length > 10 ? ', …' : ''}`);
      }
      if (r.extra.length) {
        console.log(`    extra/stray keys (${r.extra.length}): ${r.extra.slice(0, 10).join(', ')}${r.extra.length > 10 ? ', …' : ''}`);
      }
    }
  }

  console.log('');

  if (hasFailure) {
    console.error('i18n check FAILED — one or more locales are incomplete.\n');
    process.exit(1);
  } else {
    console.log('i18n check passed — all locales at 100% coverage.\n');
    process.exit(0);
  }
}

main();
