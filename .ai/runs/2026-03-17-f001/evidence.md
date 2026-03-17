# F001 Test Evidence — 2026-03-17

## ✅ ALL TESTS PASS — 11/11

### Unit Tests: 7/7 PASS
```
✔ CLI --help — shows usage information
✔ CLI --version — shows version number
✔ CLI no API key error — shows helpful error
✔ CLI formatMarkdown — no raw escape codes
✔ CLI config management — --config starts wizard
✔ CLI arg parsing — handles empty args
✔ CLI arg parsing — handles unknown flags
```

### E2E Tests: 4/4 PASS (claude-opus-4-6 via Subrouter)
```
✔ E2E: one-shot — gets response from LLM (3047ms)
✔ E2E: pipe mode — processes stdin (1781ms)
✔ E2E: JSON output — valid JSON with answer field (2025ms)
✔ E2E: streaming mode — gets response with streaming (2313ms)
```

### Gate Checklist
- [x] Unit tests all pass
- [x] E2E tests all pass with real LLM
- [x] JSON mode outputs clean JSON (debug logs redirected to stderr)
- [x] Streaming mode works
- [x] Pipe mode works
- [x] Error handling: no API key shows clear message
- [x] Evidence logs saved

### Full output
See `full-tests.log` in this directory.
