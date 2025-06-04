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
        registrationTitle: "Registracija",

        name: "Vardas",
        email: "El. paštas",
        telnum: "Telefono nr.",
        message: "Žinutė",
        send: "Siųsti",
        thankYou: "Ačiū!",
        contactSuccess: "Jūsų žinutė buvo sėkmingai išsiųsta.",
        faqTitle: "Dažniausiai užduodami klausimai",

        scheduleTitle: "Pamokų tvarkaraštis",
        scheduleLevel: "Lygis",
        scheduleDate: "Laikotarpis",
        scheduleTime: "Pamokų laikas",
        scheduleDays: "Pamokų dienos",
        scheduleDuration: "Trukmė",
        schedulePrice: "Kaina",

        showMore: "Rodyti daugiau",
    },
    "nn-NO": {
        headingServices: "Opplæring og tjenester",
        headingAbout: "Om oss",
        headingContact: "Kontakter",
        servicesTitle: "Tjenester",
        infoTitle: "Informasjon",
        contactTitle: "Kontakt oss",
        contactMe: "Kontakt",
        registrationTitle: "Registrering",
        name: "Navn",
        email: "E-post",
        telnum: "Telefonnummer",
        message: "Beskjed",
        send: "Sende",
        thankYou: "Takk skal du ha!",
        contactSuccess: "Meldingen din er sendt.",
        faqTitle: "Ofte stilte spørsmål",

        scheduleTitle: "Timeplan for leksjoner",
        scheduleLevel: "Nivå",
        scheduleDate: "Periode",
        scheduleTime: "Leksjonstid",
        scheduleDays: "Leksjonsdager",
        scheduleDuration: "Varighet",
        schedulePrice: "Pris",

        showMore: "Vis mer",
    },
};

export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("language") || "lt",
    fallbackLocale: "lt",
    messages,
});
