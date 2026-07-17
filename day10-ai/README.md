# CreatorBridge AI Assistant

## Overview

This project demonstrates a simple Retrieval-Augmented Generation (RAG) chatbot for the CreatorBridge platform.

The chatbot retrieves information from local FAQ documents before generating answers using Google Gemini.

---

## Features

- Express REST API
- Google Gemini integration
- Retrieval-Augmented Generation (RAG)
- Keyword embedding
- Cosine similarity search
- Input validation
- Hallucination protection
- Static fallback responses
- Token usage logging

---

## Folder Structure

```
day10-ai/
│
├── docs/
├── services/
├── utils/
├── server.js
├── README.md
├── cost-estimate.md
└── ai-vs-rules-decision.md
```

---

## Run

Install dependencies

```
npm install
```

Start server

```
node server.js
```

Server

```
http://localhost:5010
```

API Endpoint

```
POST /api/ask
```
