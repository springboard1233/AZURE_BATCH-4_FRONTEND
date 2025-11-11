const BASE_URL = "https://your-backend-api-url.com"; // replace with real backend

export async function fetchCpuUsage() {
  const res = await fetch(`${BASE_URL}/api/cpu-usage`);
  if (!res.ok) throw new Error("Failed to fetch CPU usage");
  return res.json();
}

export async function fetchComparison() {
  const res = await fetch(`${BASE_URL}/api/comparison`);
  if (!res.ok) throw new Error("Failed to fetch comparison data");
  return res.json();
}

export async function fetchSeasonal() {
  const res = await fetch(`${BASE_URL}/api/seasonal`);
  if (!res.ok) throw new Error("Failed to fetch seasonal data");
  return res.json();
}

export async function fetchInsights() {
  const res = await fetch(`${BASE_URL}/api/insights`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}
