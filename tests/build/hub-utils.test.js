'use strict';

// Unit coverage for scripts/hub-utils.js — the FAQ extraction that feeds
// FAQPage JSON-LD into built articles (#43). The extraction is the one place
// where generated schema could misrepresent page content, so its edge cases
// (short answers, markdown inline syntax, sentence clamping, the cap) are
// pinned here rather than trusted to eyeballing build output.

const test = require('node:test');
const assert = require('node:assert');

const {
  extractFaqPairs,
  renderFaqJsonLd,
  clampToSentences,
  inlinePlainText,
  wordCount,
} = require('../../scripts/hub-utils');

const words = (n, w = 'word') => Array.from({ length: n }, (_, i) => `${w}${i}`).join(' ');

test('extractFaqPairs: question-led H2s become pairs, statement H2s do not', () => {
  const md = [
    '## Why do AI pilots stall?',
    '',
    `${words(45)}.`,
    '',
    '## A statement heading',
    '',
    `${words(45)}.`,
    '',
    '## What happens next?',
    '',
    `${words(45)}.`,
  ].join('\n');

  const pairs = extractFaqPairs(md);
  assert.strictEqual(pairs.length, 2);
  assert.strictEqual(pairs[0].question, 'Why do AI pilots stall?');
  assert.strictEqual(pairs[1].question, 'What happens next?');
});

test('extractFaqPairs: returns [] when no question H2s exist', () => {
  const md = `## Heading one\n\n${words(50)}.\n\n## Heading two\n\n${words(50)}.`;
  assert.deepStrictEqual(extractFaqPairs(md), []);
});

test('extractFaqPairs: caps at 4 pairs by default', () => {
  const md = Array.from({ length: 6 }, (_, i) =>
    `## Question number ${i}?\n\n${words(45)}.`
  ).join('\n\n');
  assert.strictEqual(extractFaqPairs(md).length, 4);
});

test('extractFaqPairs: short first paragraph pulls in the second', () => {
  const md = [
    '## Is this a real question?',
    '',
    'A short opener sentence.',
    '',
    `A second paragraph that carries the substance of the answer. ${words(30)}.`,
  ].join('\n');

  const [pair] = extractFaqPairs(md);
  assert.ok(pair.answer.startsWith('A short opener sentence.'));
  assert.ok(pair.answer.includes('second paragraph'));
});

test('extractFaqPairs: a question H2 with no prose before the next heading is skipped', () => {
  const md = [
    '## An empty question?',
    '',
    '## A followed question?',
    '',
    `${words(45)}.`,
  ].join('\n');

  const pairs = extractFaqPairs(md);
  assert.strictEqual(pairs.length, 1);
  assert.strictEqual(pairs[0].question, 'A followed question?');
});

test('extractFaqPairs: strips markdown inline syntax from questions and answers', () => {
  const md = [
    '## Why does **bold** matter?',
    '',
    'Because [linked text](https://example.com) and *emphasis* and `code` must read as plain prose in an answer engine, with no markup artefacts surviving the extraction into the structured data block at all.',
  ].join('\n');

  const [pair] = extractFaqPairs(md);
  assert.strictEqual(pair.question, 'Why does bold matter?');
  assert.ok(pair.answer.includes('linked text'));
  assert.ok(!/[*`\[\]]/.test(pair.answer));
});

test('clampToSentences: keeps whole sentences under the cap, never cuts mid-sentence', () => {
  const s1 = `${words(30)}.`;
  const s2 = `${words(30, 'more')}.`;
  const s3 = `${words(30, 'extra')}.`;
  const clamped = clampToSentences(`${s1} ${s2} ${s3}`, 65);
  assert.strictEqual(clamped, `${s1} ${s2}`);
});

test('clampToSentences: a single overlong sentence is kept whole', () => {
  const long = `${words(120)}.`;
  assert.strictEqual(clampToSentences(long, 85), long);
});

test('renderFaqJsonLd: emits valid FAQPage JSON with all pairs', () => {
  const block = renderFaqJsonLd([
    { question: 'Q one?', answer: 'Answer one.' },
    { question: 'Q two?', answer: 'Answer two.' },
  ]);
  assert.ok(block.startsWith('<script type="application/ld+json">'));
  assert.ok(block.endsWith('</script>'));

  const json = JSON.parse(block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''));
  assert.strictEqual(json['@type'], 'FAQPage');
  assert.strictEqual(json.mainEntity.length, 2);
  assert.strictEqual(json.mainEntity[0].name, 'Q one?');
  assert.strictEqual(json.mainEntity[1].acceptedAnswer.text, 'Answer two.');
});

test('renderFaqJsonLd: empty input renders nothing', () => {
  assert.strictEqual(renderFaqJsonLd([]), '');
  assert.strictEqual(renderFaqJsonLd(null), '');
});

test('renderFaqJsonLd: "<" is escaped so answers cannot terminate the script block', () => {
  const block = renderFaqJsonLd([
    { question: 'Escaping?', answer: 'Text with </script> inside.' },
  ]);
  assert.ok(!block.slice('<script'.length).includes('</script>Text'));
  assert.ok(block.includes('\\u003c/script>'));

  const json = JSON.parse(block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''));
  assert.strictEqual(json.mainEntity[0].acceptedAnswer.text, 'Text with </script> inside.');
});

test('wordCount and inlinePlainText behave on empty input', () => {
  assert.strictEqual(wordCount(''), 0);
  assert.strictEqual(wordCount(null), 0);
  assert.strictEqual(inlinePlainText(null), '');
});

test('extractFaqPairs: real article shape — answer paragraph directly below the H2 is used', () => {
  const md = [
    'Intro paragraph before any heading, long enough to look like real prose.',
    '',
    '## Why do AI pilots stall in large organisations?',
    '',
    'Pilots stall because success was never given anywhere to go. The technology proves itself long before the organisation has decided who owns it, what it is worth, and what changes once it works, and by the time that gap becomes obvious, the pilot has already lost its momentum.',
    '',
    'A follow-on paragraph that should NOT be included because the first is long enough.',
  ].join('\n');

  const [pair] = extractFaqPairs(md);
  assert.strictEqual(pair.question, 'Why do AI pilots stall in large organisations?');
  assert.ok(pair.answer.startsWith('Pilots stall because success was never given anywhere to go.'));
  assert.ok(!pair.answer.includes('follow-on paragraph'));
});
