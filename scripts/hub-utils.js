'use strict';

// scripts/hub-utils.js — pure helpers for the Content Hub build (build-hub.js).
//
// Lives in its own module (rather than inside build-hub.js) because requiring
// build-hub.js executes the build — these functions need to be unit-testable
// without side effects (tests/build/hub-utils.test.js).

const { marked } = require('marked');

// Answer sizing follows the AEO convention this repo adopted from the
// ax-seo-aeo-layer skill (#43): 40–80 word answers, complete sentences,
// taken verbatim from the prose directly below a question-led H2. The
// articles were written with that structure (question H2 + direct-answer
// first paragraph), so extraction — not authoring — keeps the JSON-LD
// incapable of drifting from the visible page content.
const ANSWER_MIN_WORDS = 25;
const ANSWER_MAX_WORDS = 85;
const FAQ_CAP = 4;

function wordCount(str) {
  const trimmed = String(str || '').trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

// Reduce markdown inline syntax to plain text — schema.org Answer.text must not
// carry markup the page renders differently.
function inlinePlainText(mdInline) {
  return String(mdInline || '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Never cut mid-sentence: an Answer that trails off unfinished reads as broken
// in answer engines. Keeps whole sentences up to maxWords (always at least one).
function clampToSentences(text, maxWords) {
  const sentences = String(text || '').split(/(?<=[.!?])\s+/);
  let out = '';
  for (const sentence of sentences) {
    const candidate = out ? `${out} ${sentence}` : sentence;
    if (out && wordCount(candidate) > maxWords) break;
    out = candidate;
  }
  return out.trim();
}

/**
 * Extract Q&A pairs from an article's markdown body: every H2 that is phrased
 * as a question, answered by the paragraph(s) immediately below it.
 * @param {string} markdownBody - Article body (frontmatter already stripped)
 * @param {Object} [opts]
 * @param {number} [opts.cap] - Maximum pairs to return (default 4)
 * @returns {{question: string, answer: string}[]}
 */
function extractFaqPairs(markdownBody, { cap = FAQ_CAP } = {}) {
  const tokens = marked.lexer(String(markdownBody || ''));
  const pairs = [];

  for (let i = 0; i < tokens.length && pairs.length < cap; i++) {
    const tok = tokens[i];
    if (tok.type !== 'heading' || tok.depth !== 2) continue;

    const question = inlinePlainText(tok.text);
    if (!/\?$/.test(question)) continue;

    const paragraphs = [];
    for (let j = i + 1; j < tokens.length && paragraphs.length < 2; j++) {
      const next = tokens[j];
      if (next.type === 'heading') break;
      if (next.type === 'paragraph') paragraphs.push(inlinePlainText(next.text));
    }
    if (paragraphs.length === 0) continue;

    let answer = paragraphs[0];
    if (wordCount(answer) < ANSWER_MIN_WORDS && paragraphs[1]) {
      answer = `${answer} ${paragraphs[1]}`;
    }
    answer = clampToSentences(answer, ANSWER_MAX_WORDS);
    if (!answer) continue;

    pairs.push({ question, answer });
  }

  return pairs;
}

/**
 * Render a FAQPage JSON-LD script block from extracted Q&A pairs.
 * @param {{question: string, answer: string}[]} pairs
 * @returns {string} Complete <script type="application/ld+json"> block, or '' when no pairs
 */
function renderFaqJsonLd(pairs) {
  if (!Array.isArray(pairs) || pairs.length === 0) return '';

  const doc = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  // <-escape so no answer text can ever contain a sequence the HTML parser
  // would read as </script> and terminate the block early.
  const json = JSON.stringify(doc, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}

module.exports = {
  extractFaqPairs,
  renderFaqJsonLd,
  // exported for direct unit coverage
  clampToSentences,
  inlinePlainText,
  wordCount,
};
