export default [
    "strapi::logger",
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:"],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        "res.cloudinary.com",
                    ],
                    "media-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        "res.cloudinary.com",
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: "strapi::cors",
        config: {
            origin: [
                "http://localhost:5173", // frontend dev server
                "https://learn-language-app-w7rp.vercel.app", // staging
            ],
            methods: ["GET", "POST", "PUT", "DELETE"],
            headers: ["Content-Type", "Authorization"],
            credentials: true,
        },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
