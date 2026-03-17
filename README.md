# claw-cli

AI agent in your terminal. Powered by [agentic-claw](https://github.com/momomo-agent/agentic-claw).

## Install

```bash
npm i -g claw-cli
```

## Usage

```bash
# One-shot
claw "What is quantum computing?"

# Interactive REPL
claw -i

# Pipe mode
cat report.md | claw "summarize in 3 bullets"

# JSON output
claw --json "Hello"

# Custom provider
claw --provider openai --model gpt-4 "Hello"
```

## Configuration

```bash
claw --config
```

Or set environment variables:
- `AGENTIC_API_KEY` — API key
- `ANTHROPIC_API_KEY` — Anthropic key (fallback)
- `OPENAI_API_KEY` — OpenAI key (fallback)

## Options

| Flag | Description |
|------|-------------|
| `-i, --interactive` | Interactive REPL mode |
| `--config` | Configure API key + provider |
| `--provider <name>` | LLM provider (anthropic/openai) |
| `--model <name>` | Model name |
| `--api-key <key>` | API key |
| `--base-url <url>` | Custom API base URL |
| `--proxy <url>` | Proxy URL |
| `--system <prompt>` | System prompt |
| `--json` | JSON output |
| `--no-stream` | Disable streaming |
| `--version` | Show version |

## REPL Commands

| Command | Description |
|---------|-------------|
| `/quit` | Exit |
| `/clear` | Clear conversation |
| `/info` | Show token count |

## Part of [agentic](https://momomo-agent.github.io/agentic/)

MIT License
