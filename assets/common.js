const CORE_STATUS_URL = "https://mrknight2006.github.io/midnight-core/status.json";

async function fetchCoreStatus() {
  try {
    const res = await fetch(CORE_STATUS_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("status.json not found");
    return await res.json();
  } catch (err) {
    console.warn("fetchCoreStatus failed", err);
    return null;
  }
}
