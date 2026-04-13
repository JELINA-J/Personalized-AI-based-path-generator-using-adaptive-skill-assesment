from fastapi import APIRouter, Query
from jobs.services import fetch_jobs_rapidapi

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/recommendations")
def get_job_recommendations(
    course: str = Query(...),
    level: str = Query(...),
    location: str = Query("India"),
):
    jobs = fetch_jobs_rapidapi(course, level, location)

    return {
        "course": course,
        "level": level,
        "total_jobs": len(jobs),
        "jobs": jobs,
    }
