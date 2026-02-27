type EnvSource = Record<string, unknown>;

function ensureString(
  env: EnvSource,
  key: string,
  fallback?: string,
): string {
  const value = env[key];

  if (typeof value === "string" && value.trim() !== "") {
    return value.trim();
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`Missing required environment variable: ${key}`);
}

function ensurePort(env: EnvSource, key: string, fallback: number): number {
  const value = env[key];

  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid ${key}: expected an integer between 1 and 65535`);
  }

  return port;
}

export interface AppEnv {
  NODE_ENV: string;
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export function validateEnv(env: EnvSource): AppEnv {
  return {
    NODE_ENV: ensureString(env, "NODE_ENV", "development"),
    PORT: ensurePort(env, "PORT", 3333),
    CORS_ORIGIN: ensureString(env, "CORS_ORIGIN", "http://localhost:3000"),
    DATABASE_URL: ensureString(env, "DATABASE_URL"),
    JWT_SECRET: ensureString(env, "JWT_SECRET"),
  };
}
