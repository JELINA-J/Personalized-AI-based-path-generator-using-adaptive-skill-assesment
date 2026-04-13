import requests
import os

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def fetch_youtube_video(search_query):
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": search_query,
        "key": YOUTUBE_API_KEY,
        "maxResults": 1,
        "type": "video",
        "safeSearch": "strict"
    }

    res = requests.get(url, params=params).json()
    items = res.get("items", [])

    if not items:
        return None

    video = items[0]
    video_id = video["id"]["videoId"]

    return {
        "title": video["snippet"]["title"],
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "description": video["snippet"]["description"]
    }

def attach_youtube_urls(roadmap):
    for week in roadmap["milestones"]:
        for resource in week["resources"]:
            if resource.get("search_query") and not resource.get("url"):
                yt = fetch_youtube_video(resource["search_query"])
                if yt:
                    resource.update(yt)
    return roadmap