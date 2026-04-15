/**
 * Site-wide copy, centraal — in De Brouwmeester-stem.
 * Alle teksten volgen `.claude/skills/brand-voice/SKILL.md`.
 */

export const site = {
  hero: {
    eyebrow: "Financieel. Zonder gedoe.",
    titel: "Brouw aan je financiële vrijheid.",
    subtitel:
      "47% van Nederland is financieel kwetsbaar. Niet omdat ze te weinig verdienen. Maar omdat ze geen systeem hebben. Het Brouwproces™ geeft je dat systeem — in vijf stappen.",
    primaryCta: "Gooi je cijfers in de Brouwketel",
    secondaryCta: "Bekijk Het Brouwproces",
    reassurance: "Gratis. 5 minuten. Geen account nodig.",
  },

  brouwproces: {
    eyebrow: "Het Brouwproces™",
    titel: "Vijf stappen van chaos naar rust.",
    subtitel:
      "De meeste mensen houden hun geld achteraf bij. Dat werkt niet. Net zomin als je achteraf ontdekt wat er in je ketel zat. Het Brouwproces draait het om: je beslist vooraf, je automatiseert, en dan laat je de tijd het werk doen.",
    stappen: [
      {
        nr: 1,
        naam: "De Proeverij",
        regel: "Proef eerlijk waar je staat. Je geldstroom, je lekken, je startpunt.",
      },
      {
        nr: 2,
        naam: "Het Recept",
        regel: "Verdeel je geld vooraf in potjes. Vaste Lasten. Leven. Brouwen.",
      },
      {
        nr: 3,
        naam: "De Automatische Brouwerij",
        regel: "Stel het in en vergeet het. Elke salarisdag rolt je systeem door.",
      },
      {
        nr: 4,
        naam: "De Rijping",
        regel: "Laat de tijd het werk doen. Compound interest is je stille medewerker.",
      },
      {
        nr: 0,
        naam: "De Schuimkraag-check",
        regel: "Doorlopend: herken verleidingen, reclame, impulsen en AI-scams.",
      },
    ] as const,
  },

  brouwketel: {
    eyebrow: "Gratis",
    titel: "De Brouwketel — je financiële röntgenfoto.",
    subtitel:
      "In 5 minuten zie je je geldstroom, je Brouw-score van 1 tot 100, en wat er over 30 jaar van je geld wordt als je niks verandert. Geen IBAN, geen wachtwoord, geen account.",
    bullets: [
      "5 minuten invullen",
      "Direct je Brouw-score",
      "Drie concrete acties op maat",
    ],
    cta: "Gooi je cijfers in de Brouwketel",
  },

  diensten: {
    eyebrow: "Diensten",
    titel: "Wat we voor je brouwen.",
    subtitel:
      "Van een kennismakings-avond voor €29 tot een platform voor een tientje per maand. Kies de variant die bij jou past — en je kunt altijd opschalen.",
    items: [
      {
        key: "brouwavond",
        naam: "De Brouwavond",
        prijs: "€29 p.p.",
        duur: "2 uur, online",
        beschrijving:
          "Live groepsworkshop. We leren je het potjessysteem en hoe je je geld op de automaat zet. Eindigt met één concreet actiepunt voor morgen.",
        cta: "Reserveer je kruk",
        href: "/brouwavond",
      },
      {
        key: "brouwavond_gezin",
        naam: "Brouwavond Gezinseditie",
        prijs: "€39 per huishouden",
        duur: "90 min, online",
        beschrijving:
          "Voor ouders met kinderen (8-16). Mini-potjessysteem, zakgeldcontract en hoe je over online verleidingen praat zonder preken.",
        cta: "Boek de Gezinseditie",
        href: "/brouwavond",
      },
      {
        key: "check_up",
        naam: "De Check-up",
        prijs: "€97",
        duur: "1-op-1 · 90 min",
        beschrijving:
          "Samen door je cijfers. We lichten je vaste lasten door, zetten het potjessysteem op maat en geven je drie concrete acties mee.",
        cta: "Boek een Check-up",
        href: "/diensten#check-up",
      },
      {
        key: "brouwtraject",
        naam: "Het Brouwtraject",
        prijs: "€197/mnd",
        duur: "3 maanden",
        beschrijving:
          "Maandelijks videogesprek, chat-bereikbaarheid en we bouwen samen jouw systeem. Na 3 maanden draait het — of je geld terug.",
        cta: "Start het traject",
        href: "/diensten#brouwtraject",
      },
      {
        key: "platform",
        naam: "Het Brouwplatform",
        prijs: "€1 proef · €19,95/mnd",
        duur: "30 dagen voor €1",
        beschrijving:
          "De cursus (Het Brouwrecept), de Brouwketel Pro, de Tapkamer-community en elke maand een live sessie. Opzegbaar wanneer je wilt.",
        cta: "Probeer 30 dagen voor €1",
        href: "/diensten#platform",
        featured: true,
      },
      {
        key: "werkgevers",
        naam: "Werkgeversworkshop",
        prijs: "€597",
        duur: "90 min · op locatie of online",
        beschrijving:
          "Financiële stress kost je team €13.000+ per werknemer per jaar. In 90 minuten leren we je mensen een systeem — inclusief anoniem rapport voor HR.",
        cta: "Bespreek met je HR",
        href: "/diensten#werkgevers",
      },
    ],
  },

  socialProof: {
    eyebrow: "Proost-momenten",
    titel: "Brouwmaatjes vertellen.",
    items: [
      {
        naam: "Lisa",
        plaats: "Barneveld",
        rol: "Teamleider · 2 kinderen",
        quote:
          "We verdienen samen €4.500 en hielden niks over. Na één Brouwavond wist ik waar onze €370 per maand naartoe lekt. Eerste keer in jaren dat ik rust voelde.",
      },
      {
        naam: "Mark",
        plaats: "Voorthuizen",
        rol: "ZZP · bouw",
        quote:
          "Ik had niks voor mijn pensioen, ‘te druk’. Na de Check-up stond het recept. Nu gisten de potjes op de achtergrond en hoef ik er niet meer over te piekeren.",
      },
      {
        naam: "Sanne",
        plaats: "Amersfoort",
        rol: "Starter · eerste huis",
        quote:
          "Instagram was zo verwarrend dat ik niks deed. De Brouwketel gaf me één score en drie stappen. Ik beleg nu €200 per maand — zonder het te missen.",
      },
    ],
  },

  brouwmeester: {
    eyebrow: "De Brouwmeester",
    titel: "Hey, ik ben Roy.",
    paragraaf:
      "Ondernemer, geen financieel adviseur. Geen MBA, geen pak, geen spreadsheets met 47 tabbladen. Wel iemand die het zelf heeft uitgezocht. Ik heet Brouwer. En vermogen opbouwen is precies als bier brouwen: de juiste ingrediënten, een goed recept, en geduld. Proost.",
    cta: "Lees mijn verhaal",
  },

  newsletter: {
    titel: "Elke vrijdag een slok wijsheid.",
    subtitel:
      "Het Brouwboek. Eén mail per week. Nuchter, bruikbaar, geen geneuzel. En je kunt altijd weer aftappen.",
    cta: "Schenk mij ook maar in",
    reassurance: "Geen spam. Geen verkooptrucs. Altijd uit te schrijven.",
  },

  faq: [
    {
      vraag: "Geef je financieel advies?",
      antwoord:
        "Nee. Ik geef coaching en educatie. Ik ben geen geregistreerd financieel adviseur en sta niet onder toezicht van de AFM. Voor specifieke beleggings- of hypotheekbeslissingen stuur ik je door naar een gekwalificeerd adviseur. Ik help je het systeem bouwen — jij houdt de regie.",
    },
    {
      vraag: "Ik verdien niet genoeg om te sparen. Heeft dit zin?",
      antwoord:
        "Juist dan. Het Brouwproces is geen budget. Het is een systeem dat werkt op elk inkomen. Eerst stoppen de lekken, daarna begint het sparen — ook al is dat €25 per maand. Die €25 is €25 meer dan vorige maand.",
    },
    {
      vraag: "Hoeveel tijd kost dit?",
      antwoord:
        "De Brouwketel: 5 minuten. De Brouwavond: 2 uur. Het systeem opzetten: 1-2 uur. Daarna 10 minuten per maand om te checken. De rest doet de automaat.",
    },
    {
      vraag: "Is dit iets voor ZZP'ers of voor particulieren?",
      antwoord:
        "Voor allebei. De basis is hetzelfde: potjes, automatisering, laten rijpen. In het Brouwplatform is er een aparte bonusmodule voor ondernemers (box 1/2/3, pensioen ZZP, holding).",
    },
    {
      vraag: "Wat als het niet werkt voor mij?",
      antwoord:
        "Het Brouwtraject heeft een ‘brouw opnieuw of geld terug’-garantie. Het Brouwplatform kun je 30 dagen proberen voor €1 en daarna elk moment stoppen. Geen gedoe.",
    },
  ],
} as const;

export type SiteContent = typeof site;
