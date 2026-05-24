const baseUrl =
  process.env.SMOKE_BASE_URL || "https://routine-cash-app.vercel.app";
const warmupEnabled = process.env.SMOKE_WARMUP !== "false";

type JsonRecord = Record<string, unknown>;

class TimeoutError extends Error {
  constructor(
    public readonly method: string,
    public readonly path: string,
    public readonly timeoutMs: number,
  ) {
    super(`${method} ${path} timeout after ${timeoutMs}ms`);
  }
}

async function fetchWithTimeout(
  method: string,
  path: string,
  timeoutMs: number,
  init?: RequestInit,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      method,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        ...(init?.headers || {}),
      },
    });

    const body = await response.text();
    let json: JsonRecord | null = null;
    try {
      json = JSON.parse(body) as JsonRecord;
    } catch {
      json = null;
    }

    return {
      method,
      path,
      durationMs: Date.now() - started,
      status: response.status,
      body,
      json,
      headers: response.headers,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new TimeoutError(method, path, timeoutMs);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function ensure(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function pass(message: string) {
  console.log(`[PASS] ${message}`);
}

function info(message: string) {
  console.log(`[INFO] ${message}`);
}

async function runPage(path: string, timeoutMs: number) {
  const result = await fetchWithTimeout("GET", path, timeoutMs, {
    headers: {
      accept: "text/html",
    },
  });

  ensure(result.status >= 200 && result.status < 300, `GET ${path} status=${result.status}`);
  ensure(result.body.length > 0, `GET ${path} returned empty body`);
  pass(`GET ${path} ${result.durationMs}ms`);
  return result;
}

async function runJson(path: string, timeoutMs: number) {
  const result = await fetchWithTimeout("GET", path, timeoutMs, {
    headers: {
      accept: "application/json",
    },
  });

  ensure(result.status >= 200 && result.status < 300, `GET ${path} status=${result.status}`);
  ensure(result.json, `GET ${path} did not return JSON`);
  pass(`GET ${path} ${result.durationMs}ms`);
  return result.json;
}

async function warmup(path: string, timeoutMs: number, asPage = false) {
  try {
    if (asPage) {
      await runPage(path, timeoutMs);
    } else {
      await runJson(path, timeoutMs);
    }
    info(`warmup ${path} complete`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    info(`warmup ${path} skipped: ${message}`);
  }
}

async function main() {
  try {
    if (warmupEnabled) {
      await warmup("/", 15000, true);
      await warmup("/manifest.webmanifest", 10000);
    }

    const page = await runPage("/", 5000);
    ensure(
      page.body.includes("루틴캐시") ||
        page.body.includes("돈 때문에 미뤘던 장면"),
      "Home page does not contain expected routine cash copy",
    );

    const manifest = await runJson("/manifest.webmanifest", 5000);
    ensure(manifest.name === "루틴캐시", "Manifest name mismatch");
    ensure(manifest.short_name === "루틴캐시", "Manifest short_name mismatch");

    const favicon = await fetchWithTimeout("GET", "/favicon.ico", 5000);
    ensure(favicon.status >= 200 && favicon.status < 300, `GET /favicon.ico status=${favicon.status}`);
    pass(`GET /favicon.ico ${favicon.durationMs}ms`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[FAIL] ${message}`);
    process.exit(1);
  }
}

main();
