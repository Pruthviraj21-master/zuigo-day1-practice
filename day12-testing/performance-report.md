# Performance Report

## Tool Used

Autocannon

Command

```bash
npx autocannon -c 10 -d 10 -m POST \
-H "Content-Type: application/json" \
-b "{\"question\":\"How do creators apply?\"}" \
http://localhost:5010/api/ask
```

---

## Results

Concurrent Connections:
10

Duration:
10 seconds

┌─────────┬────────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat │ 2.5% │ 50% │ 97.5% │ 99% │ Avg │ Stdev │ Max │
├─────────┼────────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 174 ms │ 288 ms │ 1612 ms │ 2656 ms │ 393.47 ms │ 406.48 ms │ 3080 ms │
└─────────┴────────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat │ 1% │ 2.5% │ 50% │ 97.5% │ Avg │ Stdev │ Min │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec │ 0 │ 0 │ 26 │ 41 │ 24.7 │ 11.56 │ 12 │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B │ 36.7 kB │ 57.9 kB │ 34.1 kB │ 16.1 kB │ 15.8 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴─────────┘

---

## Observations

- Server remained responsive.
- No crashes occurred.
- AI responses increased response time compared to validation-only requests.

---

## Recommendations

- Cache repeated questions.
- Improve RAG retrieval speed.
- Add rate limiting.
- Optimize prompt size to reduce latency and token usage.

---

## Overall Result

🟢 Server remained stable under light load.
