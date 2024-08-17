from fastapi import APIRouter, HTTPException
from app.models import TimerInput, TimerOutput
from app import crud
from app.api import get_current_user
from sqlmodel import insert

router = APIRouter()

@router.post("/timers")
def add_timer_to_user(
    session: SessionDep, form_data: TimerInput
) -> TimerInput:
    """
    Create a timer for a user
    """
    user = get_current_user()
    input = TimerInput()
    input.limitInSeconds = form_data.limitInSeconds
    input.user = user.id
    session.exec(insert(input))
    session.commit()
    return form_data