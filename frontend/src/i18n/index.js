import { createI18n } from "vue-i18n";

const messages = {
    lt: {
        headingServices: "Mokymai ir paslaugos",
        headingAbout: "Apie mus",
        headingContact: "Kontaktai",
        servicesTitle: "Paslaugos",
        infoTitle: "Informacija",
        contactTitle: "Susisiekite",
        contactMe: "Susisiekime",
        name: "Vardas",
        email: "El. paštas",
        telnum: "Telefono nr.",
        message: "Žinutė",
        send: "Siųsti",
        thankYou: "Ačiū!",
        contactSuccess: "Ačiū! Jūsų žinutė buvo sėkmingai išsiųsta.",
    },
    "nn-NO": {
        headingServices: "Opplæring og tjenester",
        headingAbout: "Om oss",
        headingContact: "Kontakter",
        servicesTitle: "Tjenester",
        infoTitle: "Informasjon",
        contactTitle: "Kontakt oss",
        contactMe: "Kontakt",
        name: "Navn",
        email: "E-post",
        telnum: "Telefonnummer",
        message: "Beskjed",
        send: "Sende",
        thankYou: "Takk skal du ha!",
        contactSuccess: "Takk skal du ha! Meldingen din er sendt.",
    },
};

export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("language") || "lt",
    fallbackLocale: "lt",
    messages,
});
