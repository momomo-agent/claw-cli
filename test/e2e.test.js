/**
 * E2E tests for claw-cli — real LLM integration
 * Run: AGENTIC_API_KEY=sk-... node --test test/e2e.test.js
 */
const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { execSync } = require('child_process')
const path = require('path')

const CLI = path.join(__dirname, '..', 'bin', 'claw.js')
const API_KEY = process.env.AGENTIC_API_KEY || process.env.ANTHROPIC_API_KEY

const skip = !API_KEY

describe('E2E: one-shot', { skip: skip ? 'No API key set' : false }, () => {
  it('gets response from LLM', () => {
    const out = execSync(`node ${CLI} "Reply with exactly one word: PONG"`, {
      encoding: 'utf8',
      env: { ...process.env, AGENTIC_API_KEY: API_KEY },
      timeout: 30000,
    })
    assert.ok(out.includes('PONG'), `should contain PONG, got: ${out.slice(0, 200)}`)
  })
})

describe('E2E: pipe mode', { skip: skip ? 'No API key set' : false }, () => {
  it('processes stdin', () => {
    const out = execSync(`echo "The capital of France is Paris" | node ${CLI} "What city is mentioned? Reply with just the city name."`, {
      encoding: 'utf8',
      env: { ...process.env, AGENTIC_API_KEY: API_KEY },
      timeout: 30000,
    })
    assert.ok(out.includes('Paris'), `should mention Paris, got: ${out.slice(0, 200)}`)
  })
})

describe('E2E: JSON mode', { skip: skip ? 'No API key set' : false }, () => {
  it('outputs valid JSON', () => {
    const out = execSync(`node ${CLI} --json "Reply with: hello"`, {
      encoding: 'utf8',
      env: { ...process.env, AGENTIC_API_KEY: API_KEY },
      timeout: 30000,
    })
    const parsed = JSON.parse(out.trim())
    assert.ok(parsed.answer, 'should have answer field')
  })
})

describe('E2E: no-stream mode', { skip: skip ? 'No API key set' : false }, () => {
  it('works without streaming', () => {
    const out = execSync(`node ${CLI} --no-stream "Reply with exactly: OK"`, {
      encoding: 'utf8',
      env: { ...process.env, AGENTIC_API_KEY: API_KEY },
      timeout: 30000,
    })
    assert.ok(out.includes('OK'), `should contain OK, got: ${out.slice(0, 200)}`)
  })
})
