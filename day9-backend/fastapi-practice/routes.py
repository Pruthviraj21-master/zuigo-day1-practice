from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/requests", tags=["requests"])


class CollaborationRequestCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    budget: float = Field(..., gt=0)
    city: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1)


class CollaborationRequest(CollaborationRequestCreate):
    id: int


requests_db: List[CollaborationRequest] = []


@router.get("", response_model=List[CollaborationRequest])
def list_requests() -> List[CollaborationRequest]:
    return requests_db


@router.post("", response_model=CollaborationRequest, status_code=201)
def create_request(payload: CollaborationRequestCreate) -> CollaborationRequest:
    new_request = CollaborationRequest(id=len(requests_db) + 1, **payload.dict())
    requests_db.append(new_request)
    return new_request


@router.get("/{request_id}", response_model=CollaborationRequest)
def get_request(request_id: int) -> CollaborationRequest:
    for item in requests_db:
        if item.id == request_id:
            return item
    raise HTTPException(status_code=404, detail="Request not found")
