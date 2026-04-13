import requests
import os

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def fetch_youtube_video(search_query, max_results=1):
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": search_query,
        "key": YOUTUBE_API_KEY,
        "maxResults": max_results,
        "type": "video",
        "videoEmbeddable": "true",
        "safeSearch": "strict"
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "items" not in data or not data["items"]:
        return None

    video = data["items"][0]
    video_id = video["id"]["videoId"]

    return {
        "title": video["snippet"]["title"],
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "description": video["snippet"]["description"]
    }