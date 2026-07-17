# AI vs Rules Decision

## Feature

Answer user questions about CreatorBridge collaborations, campaigns, creators, and businesses.

## Could plain rules/code do this?

Partially.

Simple rules can answer fixed questions such as:

- Login help
- Navigation
- Contact information

However, they cannot understand different ways users ask the same question or combine information from multiple documents.

## Why AI is justified

AI understands natural language, allowing users to ask questions in different ways without following fixed formats.

Using Retrieval-Augmented Generation (RAG), the assistant answers only from the available CreatorBridge documents instead of guessing.

## Why RAG instead of Fine-tuning

RAG is a better choice because CreatorBridge information changes frequently. Updating documents is much easier and cheaper than retraining an AI model every time business information changes.
