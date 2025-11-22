// Retry utility with exponential backoff for idempotent operations (GET).
// Example exported function has the required signature and is used for GETs.

// Exposed function name must match:
// fetchWithRetry(url, options = {}, retries = 3)

export async function fetchWithRetry(url, options = {}, retries = 3) {
  let attempt = 0;
  const baseDelay = 300; // ms

  while (true) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        const error = new Error(`HTTP ${res.status}: ${res.statusText}`);
        error.status = res.status;
        error.body = errText;
        throw error;
      }
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) return res.json();
      return res.text();
    } catch (err) {
      attempt++;
      // Only retry for network errors or idempotent GET calls; caller ensures usage.
      if (attempt > retries) throw err;
      const backoff = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 100;
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
}
