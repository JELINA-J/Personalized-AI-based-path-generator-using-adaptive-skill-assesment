export async function fetchRecommendedJobs(
  course: string,
  level: string,
  location: string
) {
  const res = await fetch('http://localhost:8000/jobs/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course, level, location }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return res.json();
}
