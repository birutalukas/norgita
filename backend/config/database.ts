import path from "path";

interface DatabaseConfig {
    connection: {
        connectionString?: string;
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
        ssl:
            | boolean
            | {
                  key?: string;
                  cert?: string;
                  ca?: string;
                  capath?: string;
                  cipher?: string;
                  rejectUnauthorized?: boolean;
              };
        schema: string;
    };
    pool?: {
        min: number;
        max: number;
    };
}

export default ({
    env,
}: {
    env: (key: string, defaultValue?: any) => string | undefined;
}) => {
    // Helper functions to parse env variables correctly
    const parseIntEnv = (key: string, defaultValue: number): number => {
        const value = env(key);
        return value ? parseInt(value, 10) : defaultValue;
    };

    const parseBoolEnv = (key: string, defaultValue: boolean): boolean => {
        const value = env(key);
        return value === "true"
            ? true
            : value === "false"
              ? false
              : defaultValue;
    };

    const client: string = "postgres"; // Hardcode to PostgreSQL since we are using Railway

    const connections: Record<string, DatabaseConfig> = {
        postgres: {
            connection: {
                connectionString: env("DATABASE_URL"), // Should be set in Railway
                host: env("DATABASE_HOST", "localhost") as string, // Can be left to Railway's value if it’s in DATABASE_URL
                port: parseIntEnv("DATABASE_PORT", 5432),
                database: env("DATABASE_NAME", "strapi") as string, // Get from DATABASE_URL if available
                user: env("DATABASE_USERNAME", "strapi") as string,
                password: env("DATABASE_PASSWORD", "strapi") as string,
                ssl: parseBoolEnv("DATABASE_SSL", false) && {
                    key: env("DATABASE_SSL_KEY"),
                    cert: env("DATABASE_SSL_CERT"),
                    ca: env("DATABASE_SSL_CA"),
                    capath: env("DATABASE_SSL_CAPATH"),
                    cipher: env("DATABASE_SSL_CIPHER"),
                    rejectUnauthorized: parseBoolEnv(
                        "DATABASE_SSL_REJECT_UNAUTHORIZED",
                        true
                    ),
                },
                schema: env("DATABASE_SCHEMA", "public") as string,
            },
            pool: {
                min: parseIntEnv("DATABASE_POOL_MIN", 2),
                max: parseIntEnv("DATABASE_POOL_MAX", 10),
            },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: parseIntEnv(
                "DATABASE_CONNECTION_TIMEOUT",
                60000
            ),
        },
    };
};
