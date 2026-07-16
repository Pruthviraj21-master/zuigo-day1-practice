# FastAPI vs Express notes

## FastAPI pattern

- FastAPI uses decorators like `@router.get` and `@router.post`.
- Pydantic models validate request bodies.
- A route returns a Python object, and FastAPI serializes it to JSON.

## Express pattern

- Express uses `router.get`, `router.post`, and `res.json`.
- Validation is handled manually or with middleware.
- The route function receives `req` and `res`, then returns JSON.

## Side-by-side example

### FastAPI

```python
@router.post("", response_model=CollaborationRequest, status_code=201)
def create_request(payload: CollaborationRequestCreate):
    new_request = CollaborationRequest(id=1, **payload.dict())
    return new_request
```

### Express

```js
router.post("/", (req, res) => {
  const request = { id: 1, ...req.body };
  res.status(201).json(request);
});
```

## Key takeaway

Both frameworks can implement the same REST resource pattern, but FastAPI leans on type hints and automatic validation while Express leans on middleware and explicit code.
