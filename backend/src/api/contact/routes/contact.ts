export default {
    routes: [
        {
            method: "POST",
            path: "/contacts",
            handler: "contact.create",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
