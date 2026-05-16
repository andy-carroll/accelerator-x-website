'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, '_templates/components');

let _registry = null;

function buildRegistry() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return {};
  }

  const registry = {};
  const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const name = path.basename(file, '.html');
    registry[name] = path.join(COMPONENTS_DIR, file);
  }

  return registry;
}

function getRegistry() {
  if (!_registry) {
    _registry = buildRegistry();
  }
  return _registry;
}

function getRegisteredComponents() {
  return Object.keys(getRegistry());
}

function renderComponent(name) {
  const registry = getRegistry();

  if (!registry[name]) {
    const available = Object.keys(registry).join(', ') || '(none yet)';
    throw new Error(
      `Component '${name}' not found in _templates/components/. Available: ${available}`
    );
  }

  return fs.readFileSync(registry[name], 'utf8');
}

function resolveComponentTokens(html) {
  const registry = getRegistry();
  const TOKEN_PATTERN = /\{\{component:([A-Za-z0-9_-]+)\}\}/g;

  const missingComponents = [];
  const resolved = html.replace(TOKEN_PATTERN, (match, name) => {
    if (!registry[name]) {
      missingComponents.push(name);
      return match;
    }
    return fs.readFileSync(registry[name], 'utf8');
  });

  if (missingComponents.length > 0) {
    const available = Object.keys(registry).join(', ') || '(none yet)';
    throw new Error(
      `Unknown component tokens: ${missingComponents.join(', ')}. Available: ${available}`
    );
  }

  return resolved;
}

function validateComponentTokens(html, context) {
  const TOKEN_PATTERN = /\{\{component:([A-Za-z0-9_-]+)\}\}/g;
  const registry = getRegistry();
  const missing = [];
  let match;

  while ((match = TOKEN_PATTERN.exec(html)) !== null) {
    if (!registry[match[1]]) {
      missing.push(match[1]);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `${context || 'Template'} references unknown components: ${missing.join(', ')}`
    );
  }
}

module.exports = {
  getRegisteredComponents,
  renderComponent,
  resolveComponentTokens,
  validateComponentTokens,
};
