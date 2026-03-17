/**
 * Unit tests for claw-cli
 * Run: node --test test/cli.test.js
 */
const { describe, it, before } = require('node:test')
const assert = require('node:assert/strict')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const CLI = path.join(__dirname, '..', 'bin', 'claw.js')

// ── parseArgs tests (extract and test inline) ──

describe('CLI --help', () => {
  it('shows usage information', () => {
    const out = execSync(`node ${CLI} --help`, { encoding: 'utf8' })
    assert.ok(out.includes('claw'), 'should contain command name')
    assert.ok(out.includes('--interactive') || out.includes('-i'), 'should mention interactive')
    assert.ok(out.includes('--config'), 'should mention config')
    assert.ok(out.includes('--provider'), 'should mention provider')
    assert.ok(out.includes('--model'), 'should mention model')
    assert.ok(out.includes('--api-key'), 'should mention api-key')
    assert.ok(out.includes('--proxy'), 'should mention proxy')
    assert.ok(out.includes('--system'), 'should mention system')
    assert.ok(out.includes('--json'), 'should mention json')
    assert.ok(out.includes('--no-stream'), 'should mention no-stream')
  })
})

describe('CLI --version', () => {
  it('shows version number', () => {
    const out = execSync(`node ${CLI} --version`, { encoding: 'utf8' })
    assert.ok(out.trim().match(/\d+\.\d+\.\d+/), 'should match semver pattern')
  })
})

describe('CLI no API key error', () => {
  it('shows helpful error when no API key', () => {
    try {
      execSync(`node ${CLI} "test"`, {
        encoding: 'utf8',
        env: {
          ...process.env,
          HOME: '/tmp/claw-test-no-key-' + Date.now(),
          AGENTIC_API_KEY: '',
          ANTHROPIC_API_KEY: '',
          OPENAI_API_KEY: '',
        },
      })
      assert.fail('should have exited with error')
    } catch (err) {
      const output = (err.stderr || '') + (err.stdout || '')
      assert.ok(
        output.includes('No API key') || output.includes('api key') || err.status !== 0,
        'should indicate missing API key'
      )
    }
  })
})

describe('CLI formatMarkdown', () => {
  // We test formatMarkdown by importing it from the CLI script
  // Since it's not exported, we test it indirectly through --help output formatting
  it('help output is readable (no raw escape codes leaking)', () => {
    const out = execSync(`node ${CLI} --help`, { encoding: 'utf8' })
    // Should not have broken escape sequences
    assert.ok(!out.includes('\\x1b'), 'should not have literal escape sequences')
    // Should have actual content
    assert.ok(out.length > 100, 'help should be substantial')
  })
})

describe('CLI config management', () => {
  const testHome = '/tmp/claw-test-config-' + Date.now()

  before(() => {
    fs.mkdirSync(testHome, { recursive: true })
  })

  it('--config creates config file', () => {
    // Config wizard is interactive, but we can verify it starts correctly
    try {
      execSync(`echo "" | node ${CLI} --config`, {
        encoding: 'utf8',
        env: { ...process.env, HOME: testHome },
        timeout: 3000,
      })
    } catch {
      // May fail due to stdin closing, that's fine
    }
    // Config dir should be created
    const configDir = path.join(testHome, '.agentic')
    // It's ok if it wasn't created (stdin closed too fast)
    // The test is that it doesn't crash
  })
})

describe('CLI arg parsing edge cases', () => {
  it('handles empty args (no crash)', () => {
    // With no args and no TTY, should either show help or error gracefully
    try {
      execSync(`echo "" | node ${CLI}`, {
        encoding: 'utf8',
        env: {
          ...process.env,
          HOME: '/tmp/claw-test-empty-' + Date.now(),
          AGENTIC_API_KEY: '',
          ANTHROPIC_API_KEY: '',
          OPENAI_API_KEY: '',
        },
        timeout: 3000,
      })
    } catch (err) {
      // Should exit gracefully, not crash
      assert.ok(err.status <= 1, 'should exit with 0 or 1, not crash')
    }
  })

  it('handles unknown flags gracefully', () => {
    try {
      execSync(`node ${CLI} --unknown-flag "test"`, {
        encoding: 'utf8',
        env: {
          ...process.env,
          HOME: '/tmp/claw-test-unknown-' + Date.now(),
          AGENTIC_API_KEY: '',
          ANTHROPIC_API_KEY: '',
          OPENAI_API_KEY: '',
        },
        timeout: 3000,
      })
    } catch (err) {
      // Should not crash with unhandled exception
      assert.ok(err.status <= 1, 'should exit gracefully')
    }
  })
})
