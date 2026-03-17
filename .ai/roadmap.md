# F001: claw-cli 完整测试

## Phase 1: Unit Tests
- [ ] parseArgs — flags (--help, --version, -i, --provider, --model, --api-key, --proxy, --system, --json, --no-stream)
- [ ] parseArgs — positional arguments
- [ ] formatMarkdown — bold, italic, code, headers, lists
- [ ] loadConfig/saveConfig — read/write ~/.agentic/config.json
- [ ] --help — shows help text
- [ ] --version — shows version
- [ ] No API key — shows error message

## Phase 2: DBB Scenarios
- [ ] First-time user: `claw --config` → config wizard prompts
- [ ] One-shot: `claw "question"` → gets answer, exits
- [ ] REPL: `claw -i` → interactive mode, /quit exits
- [ ] Pipe: `echo "text" | claw "summarize"` → processes stdin
- [ ] No API key: helpful error + instructions
- [ ] Multi-turn REPL: memory persists across turns
- [ ] /clear: resets conversation
- [ ] /info: shows token count

## Phase 3: E2E Integration Tests
- [ ] One-shot with real LLM → response received
- [ ] REPL multi-turn → context preserved
- [ ] Stream mode → tokens arrive incrementally
- [ ] JSON output → valid JSON

## Phase 4: Evidence
- [ ] All unit tests pass — log saved
- [ ] All DBB verified — log saved
- [ ] All E2E pass — log saved
