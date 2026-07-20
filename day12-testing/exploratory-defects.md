# Exploratory Testing Report

## Project

CreatorBridge AI Assistant

## Testing Date

20/07/2026

## Tester

Pruthviraj Chavan

---

## Test Scenarios

### 1. Empty Question

**Action**
Submitted the request without entering a question.

**Expected**
An error message should appear informing the user that the question cannot be empty.

**Actual**
API returned:

"Question cannot be empty."

**Status**
✅ Passed

---

### 2. Very Long Question

**Action**
Submitted a question longer than 500 characters.

**Expected**
The request should be rejected.

**Actual**
API returned:

"Question is too long."

**Status**
✅ Passed

---

### 3. Valid Question

**Action**
Asked:

"How do creators apply?"

**Expected**
A relevant answer should be returned.

**Actual**
The request completed successfully, but the AI returned:

"I couldn't find that information in the CreatorBridge knowledge base."

The current RAG retrieval does not always provide useful context.

**Status**
⚠ Partial

---

### 4. Invalid JSON

**Action**
Sent an invalid request body.

**Expected**
The API should reject the request.

**Actual**
Express returned an error without crashing.

**Status**
✅ Passed

---

### 5. Double Request

**Action**
Clicked Send twice rapidly (or submitted two requests).

**Expected**
Only one request should be processed.

**Actual**
Both requests were processed independently.

No duplicate request prevention exists.

**Status**
❌ Improvement Needed

---

### 6. AI Failure

**Action**
Simulated an AI failure by using an invalid API key.

**Expected**
A friendly fallback message should be returned.

**Actual**
Fallback message returned successfully.

**Status**
✅ Passed

---

## Defects Found

- [ ] Duplicate requests are not prevented.
- [ ] RAG retrieval sometimes selects weak context.
- [ ] AI occasionally cannot answer valid questions because retrieved context is insufficient.

---

## Overall Result

The application handles validation and failures correctly. The primary improvement area is retrieval quality for the AI assistant.
