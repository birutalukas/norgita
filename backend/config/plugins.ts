export default ({ env }) => ({
    upload: {
        config: {
            provider: "cloudinary",
            providerOptions: {
                cloud_name: env("CLOUDINARY_NAME"),
                api_key: env("CLOUDINARY_KEY"),
                api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
                upload: {},
                delete: {},
            },
            baseUrl: `https://res.cloudinary.com/${env("CLOUDINARY_NAME")}/`,
        },
    },
    email: {
        config: {
            provider: "nodemailer", // We will use Nodemailer as the email providers
            providerOptions: {
                host: process.env.SMTP_HOST, // SMTP server host
                port: parseInt(process.env.SMTP_PORT), // SMTP port (587 for TLS)
                auth: {
                    user: process.env.SMTP_USER, // SMTP username
                    pass: process.env.SMTP_PASS, // SMTP password
                },
            },
            settings: {
                defaultFrom: process.env.EMAIL_FROM, // Sender email
                defaultReplyTo: process.env.EMAIL_FROM, // Default reply-to email
            },
        },
    },
});
