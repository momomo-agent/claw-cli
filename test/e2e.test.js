/**
 * E2E tests for claw-cli — real LLM integration
 * Run: node --test test/e2e.test.js
 * 
 * Uses Subrouter with claude-opus-4-6
 */
const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { execSync } = require('child_process')
const path = require('path')

const CLI = path.join(__dirname, '..', 'bin', 'claw.js')
const API_KEY = process.env.AGENTIC_API_KEY || 'sk-ghmxEJX3PJ0hWZpy0COZUbEk2f6aTiyUu4zrbz0ZhRoQvgV2'
const BASE_URL = 'https://www.subrouter.ai'
const MODEL = 'claude-opus-4-6'

function claw(args, opts = {}) {
  return execSync(
    `node ${CLI} --provider anthropic --base-url "${BASE_URL}" --model "${MODEL}" --no-stream ${args}`,
    {
      encoding: 'utf8',
      env: { ...process.env, AGENTIC_API_KEY: API_KEY },
      timeout: opts.timeout || 60000,
    }
  )
}

describe('E2E: one-shot', () => {
  it('gets response from LLM', () => {
    const out = claw('"Reply with exactly one word: PONG"')
    assert.ok(out.includes('PONG'), `should contain PONG, got: ${out.slice(0, 200)}`)
  })
})

describe('E2E: pipe mode', () => {
  it('processes stdin', () => {
    const out = execSync(
      `echo "The capital of France is Paris" | node ${CLI} --provider anthropic --base-url "${BASE_URL}" --model "${MODEL}" --no-stream "What city is mentioned? Reply with just the city name."`,
      {
        encoding: 'utf8',
        env: { ...process.env, AGENTIC_API_KEY: API_KEY },
        timeout: 60000,
      }
    )
    assert.ok(out.includes('Paris'), `should mention Paris, got: ${out.slice(0, 200)}`)
  })
})

describe('E2E: JSON output', () => {
  it('outputs valid JSON with answer field', () => {
    const out = claw('--json "Reply with exactly: hello"')
    const parsed = JSON.parse(out.trim())
    assert.ok(parsed.answer, 'should have answer field')
    assert.ok(parsed.answer.toLowerCase().includes('hello'), `answer should contain hello, got: ${parsed.answer}`)
    assert.ok(typeof parsed.rounds === 'number', 'should have rounds field')
  })
})

describe('E2E: streaming mode', () => {
  it('gets response with streaming', () => {
    const out = execSync(
      `node ${CLI} --provider anthropic --base-url "${BASE_URL}" --model "${MODEL}" "Reply with exactly one word: PING"`,
      {
        encoding: 'utf8',
        env: { ...process.env, AGENTIC_API_KEY: API_KEY },
        timeout: 60000,
      }
    )
    assert.ok(out.includes('PING'), `should contain PING, got: ${out.slice(0, 200)}`)
  })
})
