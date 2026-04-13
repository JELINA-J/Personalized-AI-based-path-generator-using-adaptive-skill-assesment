import os
import requests


def fetch_jobs_rapidapi(course, level, location):
    api_key = os.getenv("RAPIDAPI_KEY")

    if not api_key:
        print("RAPIDAPI_KEY missing")
        return []

    url = "https://jsearch.p.rapidapi.com/search"

    query = f"{course} {level}"

    headers = {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    }

    params = {
        "query": query,
        "page": 1,
        "num_pages": 1,
        "country": "in",   # India
    }

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)

        if response.status_code != 200:
            print("RapidAPI status:", response.status_code)
            return []

        data = response.json().get("data", [])

        jobs = []
        for item in data[:5]:
            jobs.append({
                "source": "RapidAPI",
                "title": item.get("job_title"),
                "company": item.get("employer_name"),
                "location": item.get("job_city") or item.get("job_country"),
                "link": item.get("job_apply_link"),
            })

        return jobs

    except Exception as e:
        print("RapidAPI error:", e)
        return []
