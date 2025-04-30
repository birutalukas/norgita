import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::contact.contact",
    ({ strapi }) => ({
        async create(ctx) {
            const { name, email, tel, message } = ctx.request.body;

            if (!name || !email || !tel || !message) {
                return ctx.badRequest("All fields are required");
            }

            // Optional: Save to DB
            const entry = await strapi.entityService.create(
                "api::contact.contact",
                {
                    data: { name, email, tel, message },
                }
            );

            // Optional: Send email using Strapi Email plugin
            try {
                const { email } = strapi.plugins["email"];

                await email.send({
                    to: process.env.EMAIL_TO,
                    from: process.env.EMAIL_FROM,
                    subject: "New Contact Form Submission",
                    text: `${name} (Email: ${email} || Tel: ${tel}) Žinutė: ${message}`,
                });
            } catch (error) {
                console.error("Email send error:", error);
                ctx.throw(500, "Failed to send message");
            }

            return ctx.send({ message: "Message sent successfully", entry });
        },
    })
);
