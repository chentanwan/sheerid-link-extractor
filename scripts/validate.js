#!/usr/bin/env node
/**
 * SheerID Link Extractor — CI validation script
 *
 * Checks the userscript for:
 *   1. Valid JavaScript syntax         (node --check)
 *   2. Required userscript metadata    (@name, @match, @grant, ...)
 *   3. No accidental large files       (> 50 MB guardrail)
 *
 * Exits non-zero on failure so CI can report the build as broken.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_FILE = 'SheerID-Link-Extractor.js';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

let failures = 0;

function ok(msg) { console.log('✅ ' + msg); }
function warn(msg) { console.log('⚠️ ' + msg); }
function fail(msg) { console.error('❌ ' + msg); failures++; }

/* ------------------------------------------------------------------ */
/* 1. Syntax check                                                     */
/* ------------------------------------------------------------------ */
try {
  execSync(`node --check "${SCRIPT_FILE}"`, { stdio: 'pipe' });
  ok(`Syntax check passed (${SCRIPT_FILE})`);
} catch (e) {
  fail(`Syntax error in ${SCRIPT_FILE}:\n${e.stderr ? e.stderr.toString() : e.message}`);
}

/* ------------------------------------------------------------------ */
/* 2. Metadata header validation                                       */
/* ------------------------------------------------------------------ */
const src = fs.readFileSync(SCRIPT_FILE, 'utf8');
const headerMatch = src.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/);
if (!headerMatch) {
  fail(`Missing // ==UserScript== header block in ${SCRIPT_FILE}`);
} else {
  const header = headerMatch[1];
  const required = ['@name', '@namespace', '@version', '@description', '@match', '@run-at', '@grant'];
  for (const field of required) {
    if (!header.includes(field)) {
      fail(`Missing required userscript metadata field: ${field}`);
    }
  }
  if (failures === 0) ok('Userscript metadata header is complete');

  // Sanity warnings (non-fatal)
  const version = header.match(/@version\s+(\S+)/);
  if (!version || /^0\.0\.0$/.test(version[1])) {
    warn('Version looks like a placeholder: ' + (version ? version[1] : 'missing'));
  }

  const grants = header.match(/@grant\s+(\S+)/g) || [];
  if (!grants.some((g) => g.includes('setClipboard'))) {
    warn('No @grant GM_setClipboard found — copy may fall back to document.execCommand.');
  }
}

/* ------------------------------------------------------------------ */
/* 3. Large-file guardrail                                             */
/* ------------------------------------------------------------------ */
try {
  const files = execSync('git ls-files').toString().trim().split('\n').filter(Boolean);
  const big = [];
  for (const f of files) {
    try {
      const stat = fs.statSync(f);
      if (stat.size > MAX_FILE_SIZE) big.push(`${f} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
    } catch (e) {
      /* unreadable file — ignore */
    }
  }
  if (big.length) warn('Files over 50 MB: ' + big.join(', '));
  else ok('No files over 50 MB');
} catch (e) {
  // git ls-files not available locally (e.g. not a git repo) — non-fatal
  warn('Could not run git ls-files (local only, skipping size check).');
}

/* ------------------------------------------------------------------ */
/* Summary                                                             */
/* ------------------------------------------------------------------ */
console.log('');
if (failures > 0) {
  console.error(`✖ Validation failed with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log('✔ All checks passed.');
  process.exit(0);
}
