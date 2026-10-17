"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<null | {
    id: string;
    title: string;
    category: string;
    client: string;
    industry: string;
    services: string;
    year: string;
    about: string;
    overview: string;
    coverImg: string;
    gallery: {
      subtitle: string;
      desc: string;
      images?: string[];
      bellitaliaCarousels?: {
        slides: { type: "image" | "video"; src: string }[];
      }[];
      vitaMotionCarousels?: {
        slides: { type: "image" | "video"; src: string }[];
      }[];
      metaCarousel?: string[];
      metaCarousel2?: string[];
      gifBanner?: string;
      halfPageBanner?: string;
      mastheadBanner?: string;
      singleImage?: string;
      placeholder?: string;
      bgImage?: string;
      sourceNote?: string;
    }[];
  }>(null);

  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // STATI PER IL PROGRESSO DEL VIDEO ATTIVO
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const { scrollY } = useScroll();

  // PARALLASSE / FLUTTUAZIONE TITOLI HERO
  const heroTitleY = useTransform(scrollY, [0, 500], [0, -120]);
  const heroSubtitleY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroFooterY = useTransform(scrollY, [0, 500], [0, -180]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // NAVBAR SCROLL ANIMATIONS
  const homeY = useTransform(scrollY, [0, 80], [0, -30]);
  const homeOpacity = useTransform(scrollY, [0, 60], [1, 0]);

  const aboutY = useTransform(scrollY, [15, 100], [0, -30]);
  const aboutOpacity = useTransform(scrollY, [15, 80], [1, 0]);

  const workY = useTransform(scrollY, [30, 120], [0, -30]);
  const workOpacity = useTransform(scrollY, [30, 100], [1, 0]);

  const contactY = useTransform(scrollY, [45, 140], [0, -30]);
  const contactOpacity = useTransform(scrollY, [45, 120], [1, 0]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const scrollCarousel = (key: string, direction: "left" | "right") => {
    const container = carouselRefs.current[key];
    if (container) {
      const scrollAmount = container.clientWidth * 0.7;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const projects = [
    {
      id: "vita",
      title: "VITA SOCIETÀ EDITORIALE",
      category: "01 / OMNICHANNEL CAMPAIGN & EDITORIAL DESIGN",
      client: "Vita Società Editoriale S.p.A. Impresa Sociale",
      industry: "Media & Publishing",
      services: "Visual Design, Social Identity & Display ADV",
      year: "06/2025 — IN CORSO",
      about: "VITA è il punto di riferimento editoriale e multipiattaforma in Italia per l’innovazione sociale, l’attivismo civico e il Terzo Settore. Una realtà storica che unisce giornalismo d’impatto e comunicazione strategica per dare voce al cambiamento.",
      overview: "Sviluppo integrato della direzione visiva e traduzione operativa di concept creativi in asset multipiattaforma per VITA Società Editoriale SpA.\nL'intervento comprende l'ideazione di format per i canali social (post statici, caroselli di approfondimento, video), la progettazione di suite Display ADV statiche e animate, e lo sviluppo della grafica promozionale per DEM e newsletter.\nOgni deliverable garantisce totale coerenza di marca, rigore tipografico e una gerarchia visiva immediata su tutti i touchpoint digitali ed editoriali.",
      coverImg: "/vita.png",
      gallery: [
        {
          subtitle: "01 / EDITORIAL PRINT & CAMPAIGN LAYOUTS",
          desc: "Direzione grafica e impaginazione per la campagna 5x1000 “5 per mille MA PER DAVVERO”, pianificata su tre uscite consecutive del magazine cartaceo VITA.\nCurata nei minimi dettagli: dalla definizione della gerarchia tipografica al bilanciamento dei pesi visivi, fino alla declinazione dei layout per le edizioni speciali della rivista.",
          bgImage: "/vita-print-bg.png",
          images: [
            "/vita-print-1.png",
            "/vita-print-2.png",
            "/vita-print-3.png"
          ]
        },
        {
          subtitle: "02 / LANDING PAGE VISUALS & DIGITAL ASSETS",
          desc: "Progettazione dei visual per la landing page web della campagna.\nDall'ideazione dell'Hero banner “Appello” all'ottimizzazione dei singoli asset per ambienti desktop e mobile, per garantire massima coerenza visiva e un'esperienza di navigazione fluida su ogni dispositivo.",
          singleImage: "/vita-web.png"
        },
        {
          subtitle: "03 / DIGITAL CONTENT, CAROUSELS & DISPLAY ADV",
          desc: "Sviluppo integrato dell'ecosistema visivo digitale per VITA Società Editoriale SpA. Progettazione dei layout social orientati alla conversion e gestione completa della suite Display ADV.",
          bgImage: "/vita-print-bg.png",
          images: [
            "/vita-carousel-1.png",
            "/vita-carousel-2.png",
            "/vita-carousel-3.png"
          ],
          metaCarousel: [
            "/vita-meta-1.png",
            "/vita-meta-2.png",
            "/vita-meta-3.png",
            "/vita-meta-4.png",
            "/vita-meta-5.png",
            "/vita-meta-6.png"
          ],
          metaCarousel2: [
            "/vita-meta2-1.png",
            "/vita-meta2-2.png",
            "/vita-meta2-3.png",
            "/vita-meta2-4.png",
            "/vita-meta2-5.png",
            "/vita-meta2-6.png",
            "/vita-meta2-7.png"
          ],
          gifBanner: "/vita-banner-desktop.gif",
          halfPageBanner: "/vita-banner-halfpage.gif",
          mastheadBanner: "/vita-banner-masthead.gif"
        },
        {
          subtitle: "04 / MOTION GRAPHICS & ANIMATED INFOGRAPHICS",
          desc: "Progettazione di infografiche dinamiche e caroselli animati per i canali social. Integrazione di tecniche di motion design per trasformare dati complessi e tematiche d'impatto sociale in contenuti visivi immediati, chiari e ad alto ingaggio",
          bgImage: "/vita-print-bg.png",
          vitaMotionCarousels: [
            {
              slides: [
                { type: "video" as const, src: "/vita-c1-1.mp4" },
                { type: "image" as const, src: "/vita-c1-2.png" },
                { type: "video" as const, src: "/vita-c1-3.mp4" }
              ]
            },
            {
              slides: [
                { type: "video" as const, src: "/vita-c2-1.mp4" },
                { type: "image" as const, src: "/vita-c2-2.png" },
                { type: "video" as const, src: "/vita-c2-3.mp4" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "factanza",
      title: "FACTANZA MEDIA",
      category: "02 / SOCIAL FORMATS & PODCAST IDENTITY",
      client: "FACTANZA MEDIA",
      industry: "Digital Media & Publishing",
      services: "Art Direction, Brand Identity & Social Formats",
      year: "2026",
      about: "Factanza è tra i media brand digitali di riferimento in Italia per l’informazione e la divulgazione. Un punto di contatto chiave per le nuove generazioni, focalizzato sulla semplificazione di tematiche complesse attraverso linguaggi nativi digitali.",
      overview: "Progettazione di un format a carosello ad alto ingaggio, fondato sullo studio della psicologia del colore e su un flusso narrativo continuo.\nSviluppo integrale dell'identità visiva per il podcast “Sarò felice quando”: dall'ideazione del logotipo (microfono vintage con icona ambivalente) fino alla declinazione per la campagna Guerrilla OOH in metropolitana e al merchandising ufficiale.",
      coverImg: "/factanza.png",
      gallery: [
        {
          subtitle: "01 / CAROUSEL NARRATIVE SPLITTING (10 SLIDES)",
          desc: "Uso strategico del colore: tonalità di blu per rappresentare l'ansia da prestazione e sfumature di giallo per i picchi di euforia.\nL'integrazione di texture materiche rallenta lo scrolling, mentre il linguaggio della memetica pop e la tecnica dello splitting visivo accompagnano l'utente in un flusso di lettura continuo fino all'ultima slide.",
          bgImage: "/factanza-bg.png",
          images: [
            "/factanza-carousel-1.png",
            "/factanza-carousel-2.png",
            "/factanza-carousel-3.png",
            "/factanza-carousel-4.png",
            "/factanza-carousel-5.png",
            "/factanza-carousel-6.png",
            "/factanza-carousel-7.png",
            "/factanza-carousel-8.png",
            "/factanza-carousel-9.png",
            "/factanza-carousel-10.png"
          ]
        },
        {
          subtitle: "02 / PODCAST BRAND IDENTITY, GUERRILLA & MERCH",
          desc: "Identità visiva costruita attorno a un logotipo a forma di microfono vintage con tipografia condensed. Il box grafico sulla parola “FELICE” evoca uno sticker applicato sulla routine, mentre la lettera “C” rielaborata rappresenta il loop tra insoddisfazione e ricerca della felicità.\nIl sistema grafico si declina sull'interfaccia Spotify, su una campagna Guerrilla OOH con messaggi provocatori nel circuito metropolitano di Milano (Duomo / M1) e su una linea di merchandising coordinata (Tote Bag, Phone Cover e Water Bottle con stickering).",
          bgImage: "/factanza-bg.png",
          images: [
            "/factanza-podcast-1.png",
            "/factanza-podcast-2.png",
            "/factanza-podcast-3.png"
          ]
        }
      ]
    },
    {
      id: "bellitalia",
      title: "BELL'ITALIA",
      category: "03 / SOCIAL REDESIGN & EDITORIAL FORMATS",
      client: "CAIRO EDITORE",
      industry: "Editorial & Travel Media",
      services: "Social Redesign, Editorial Layouts & Visual Strategy",
      year: "08/2026 — IN CORSO",
      about: "Bell'Italia è la testata di riferimento per la valorizzazione del patrimonio artistico, culturale e paesaggistico italiano. Un brand editoriale storico focalizzato sul racconto delle eccellenze del territorio.",
      overview: "Progetto di restyling visivo e riprogettazione tipografica per i canali social di Bell'Italia.\nPartendo dall'archivio iconografico e dai contenuti redazionali, l'intervento ottimizza l'impostazione grafica precedente riorganizzando la struttura del layout: posizionamento sistematico del brand logo, integrazione di tag di rubrica tematiche (es. Food & Wine) e sviluppo di una nuova architettura tipografica basata sull'equilibrio tra serif contemporanei e dettagli in corsivo.\nIl nuovo sistema visivo definisce uno standard editoriale coerente per le copertine e per i caroselli di approfondimento.",
      coverImg: "/bellitalia.png",
      gallery: [
        {
          subtitle: "01 / INSTAGRAM REDESIGN & CAROUSEL FORMATS",
          desc: "Riprogettazione completa del sistema grafico per i caroselli e le rubriche social del profilo.\nEvoluzione da un layout tradizionale a una composizione editoriale dinamica: uso di tipografia ad alto contrasto, architettura ordinata per le tag geografiche e integrazione di sottotitoli in lingua inglese per la fruizione internazionale.",
          bgImage: "/bellitalia-bg.svg",
          bellitaliaCarousels: [
            {
              slides: [
                { type: "image" as const, src: "/bellitalia-c1-1.png" },
                { type: "image" as const, src: "/bellitalia-c1-2.png" },
                { type: "image" as const, src: "/bellitalia-c1-3.png" },
                { type: "image" as const, src: "/bellitalia-c1-4.png" },
                { type: "image" as const, src: "/bellitalia-c1-5.png" }
              ]
            },
            {
              slides: [
                { type: "image" as const, src: "/bellitalia-c2-1.png" },
                { type: "image" as const, src: "/bellitalia-c2-2.png" },
                { type: "image" as const, src: "/bellitalia-c2-3.png" },
                { type: "video" as const, src: "/bellitalia-c2-4.mp4" },
                { type: "image" as const, src: "/bellitalia-c2-5.png" },
                { type: "video" as const, src: "/bellitalia-c2-6.mp4" },
                { type: "video" as const, src: "/bellitalia-c2-7.mp4" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "amynah",
      title: "AMYNAH JEWELLERY",
      category: "04 / BRAND IDENTITY & LUXURY SOCIAL STRATEGY",
      client: "AMYNAH X GREENTOSA",
      industry: "Fine Jewellery & Luxury",
      services: "Brand Identity, Social Strategy & Video Editing",
      year: "2025",
      about: "Amynah è un brand di alta gioielleria con base a Dubai. Una realtà del lusso focalizzata sul racconto di eleganza, preziosità ed estetica contemporanea attraverso un linguaggio visivo raffinato e avvolgente.",
      overview: "Progetto pitch sviluppato in collaborazione con Greentosa Communication.\nA partire dal materiale fotografico e video originale, l'intervento ha riguardato la definizione delle linee guida visive: selezione della palette cromatica luxury e della combinazione tipografica (font Lora), progettazione della griglia del feed Instagram a 9 post, sviluppo del carosello promozionale e video editing dei Reel dedicati al brand.",
      coverImg: "/amynah-cover.png",
      gallery: [
        {
          subtitle: "01 / BRAND DIRECTION, PALETTE & TYPOGRAPHY",
          desc: "Definizione dell'impostazione visiva del brand: selezione della famiglia tipografica Lora e creazione di una palette cromatica d'ispirazione luxury, sviluppata su tonalità calde ed avvolgenti (rame, cioccolato, verde bosco, salvia e sabbia).",
          singleImage: "/amynah-identity.png"
        },
        {
          subtitle: "02 / INSTAGRAM FEED & 9-GRID CURATION",
          desc: "Progettazione dell'architettura visiva del canale Instagram.\nSviluppo di un sistema a 9 post pensato per definire il ritmo del feed, bilanciando contenuti di prodotto, dettagli materici e composizioni tipografiche per un posizionamento di marca immediato e coerente.",
          bgImage: "/amynah-bg.png",
          images: [
            "/amynah-feed-9.png",
            "/amynah-phone.png"
          ]
        },
        {
          subtitle: "03 / CAROUSEL CONTENT FORMAT",
          desc: "Progettazione di un carosello a tre slide per la comunicazione social del brand.\nUna composizione visiva studiata per esaltare la lavorazione e i dettagli delle collezioni, bilanciando immagini d'impatto ed elementi tipografici per guidare l'interesse del pubblico.",
          bgImage: "/amynah-bg.png",
          images: [
            "/amynah-c1-1.png",
            "/amynah-c1-2.png",
            "/amynah-c1-3.png"
          ]
        }
      ]
    }
  ];

  const videoShowcase = [
    {
      id: "natural-4",
      client: "NATURAL STYLE",
      category: "EDITORIAL STORY",
      note: "Live shooting e video editing in real-time per la copertura del format di brunch domenicali presso l'hotel 21 House of Stories Navigli.",
      src: "/natural-brunch-21house.MOV"
    },
    {
      id: "amynah-1",
      client: "AMYNAH JEWELLERY",
      category: "LUXURY BRAND REEL",
      note: "Video editing, montaggio ritmico e motion design per il pitch di alta gioielleria (Greentosa Communication).",
      src: "/amynah-reel-1.mov"
    },
    {
      id: "greentosa-1",
      client: "GREENTOSA COMMUNICATION",
      category: "SOCIAL TREND REEL #1",
      note: "Produzione video on-set e editing per contenuti social ad alto ingaggio.",
      src: "/greentosa-trend-1.mov"
    },
    {
      id: "greentosa-2",
      client: "GREENTOSA COMMUNICATION",
      category: "SOCIAL TREND REEL #2",
      note: "Produzione video on-set e editing per contenuti social ad alto ingaggio.",
      src: "/greentosa-trend-2.mov"
    },
    {
      id: "scrambled-1",
      client: "SCRAMBLED EGGS X GREENTOSA",
      category: "STOP-MOTION REEL",
      note: "Composizione fotografica, animazione stop-motion e video editing per la campagna promozionale dei corsi di lingua.",
      src: "/scrambled-stopmotion.mov"
    },
    {
      id: "vita-1",
      client: "VITA SOCIETÀ EDITORIALE",
      category: "EDITORIAL BOOK LAUNCH",
      note: "Riprese video al caporedattore per il lancio del nuovo Focus Book, con editing, sottotitolazione e grafiche animate.",
      src: "/vita-book-presentation.mp4"
    },
    {
      id: "natural-1",
      client: "NATURAL STYLE X SOJASUN",
      category: "BRANDED CONTENT (PT. 1)",
      note: "Riprese live e video editing per gli eventi della Milano Wellness Week (Cairo Editore).",
      src: "/natural-breathwork-1.mov"
    },
    {
      id: "natural-2",
      client: "NATURAL STYLE X SOJASUN",
      category: "BRANDED CONTENT (PT. 2)",
      note: "Riprese live e video editing per gli eventi della Milano Wellness Week (Cairo Editore).",
      src: "/natural-breathwork-2.mov"
    }
  ];

  const total = videoShowcase.length;
  const realActiveIndex = ((virtualIndex % total) + total) % total;

  const handlePrevVideo = () => {
    setVirtualIndex((prev) => prev - 1);
    setIsPlaying(false);
  };

  const handleNextVideo = () => {
    setVirtualIndex((prev) => prev + 1);
    setIsPlaying(false);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    videoShowcase.forEach((_, idx) => {
      const videoEl = videoRefs.current[idx];
      if (videoEl) {
        if (idx === realActiveIndex) {
          videoEl.muted = isMuted;
          if (isPlaying) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
          videoEl.muted = true;
        }
      }
    });
  }, [realActiveIndex, isMuted, isPlaying]);

  const currentActiveVideo = videoShowcase[realActiveIndex];

  const CARD_WIDTH = 240;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;

  // CONFIGURAZIONE TRANSIZIONE MORBIDA ED ELEGANTE PER L'HERO HOVER
  const softHoverTransition = {
    duration: 0.4,
    ease: [0.25, 1, 0.5, 1]
  };

  return (
    <div className="w-full overflow-x-hidden font-sans antialiased selection:bg-black selection:text-white" translate="no">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        @font-face {
          font-family: 'BodoniMio';
          src: url('/Bodoni_Moda/BodoniModa-Italic-VariableFont_opsz,wght.ttf') format('truetype'),
               url('/Bodoni_Moda/static/BodoniModa_28pt-Italic.ttf') format('truetype'),
               url('/Bodoni_Moda/static/BodoniModa-Italic.ttf') format('truetype');
        }
        html, body {
          max-width: 100vw;
          overflow-x: hidden !important;
          scroll-behavior: smooth;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* NAVBAR CLASSICA INTEGRALE SENZA MODIFICHE ALL'HOVER */}
      <header className="fixed top-0 left-0 w-full flex justify-end items-center p-8 md:p-12 z-50 mix-blend-difference text-white pointer-events-none">
        <nav className="flex space-x-8 text-sm md:text-base tracking-widest uppercase font-light pointer-events-auto overflow-hidden py-3">
          
          <motion.a 
            href="#home" 
            style={{ y: homeY, opacity: homeOpacity }}
            transition={{ ease: [0.25, 0.1, 0.25, 1] }}
            className="hover:font-bold transition-all duration-200 inline-block"
          >
            Home
          </motion.a>

          <motion.a 
            href="#about" 
            style={{ y: aboutY, opacity: aboutOpacity }}
            transition={{ ease: [0.25, 0.1, 0.25, 1] }}
            className="hover:font-bold transition-all duration-200 inline-block"
          >
            About
          </motion.a>

          <motion.a 
            href="#work" 
            style={{ y: workY, opacity: workOpacity }}
            transition={{ ease: [0.25, 0.1, 0.25, 1] }}
            className="hover:font-bold transition-all duration-200 inline-block"
          >
            Work
          </motion.a>

          <motion.a 
            href="#contact" 
            style={{ y: contactY, opacity: contactOpacity }}
            transition={{ ease: [0.25, 0.1, 0.25, 1] }}
            className="hover:font-bold transition-all duration-200 inline-block"
          >
            Contact
          </motion.a>

        </nav>
      </header>

      {/* HERO CON ANIMAZIONE PAROLA PER PAROLA ULTRA-MORBIDA */}
      <section 
        id="home" 
        className="relative min-h-screen w-full bg-[#111111] text-[#ffffff] flex flex-col justify-between p-8 md:p-12 overflow-hidden"
      >
        {/* Foto inquadrata a destra con specchiamento simmetrico senza distorsioni */}
        <img 
          src="/portrait-hero.png" 
          alt="Ornella Isabel Tataje Falcon" 
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] z-0 pointer-events-none"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Overlap scuro leggero per il massimo contrasto del testo */}
        <div className="absolute inset-0 bg-black/25 z-0 pointer-events-none" />

        {/* Blocco Titoli Fluttuanti con effetto Hover PAROLA PER PAROLA MORBIDO */}
        <div className="my-auto text-center z-10 select-none inline-block mx-auto pt-16">
          <motion.h1 
            style={{ y: heroTitleY, opacity: heroOpacity }}
            className="text-[9.5vw] font-bold tracking-tight leading-none text-white uppercase drop-shadow-lg inline-block"
          >
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              transition={softHoverTransition}
              className="inline-block cursor-pointer mr-[0.25em]"
            >
              TATAJE
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              transition={softHoverTransition}
              className="inline-block cursor-pointer"
            >
              FALCON
            </motion.span>
          </motion.h1>
          
          <motion.div 
            style={{ y: heroSubtitleY, opacity: heroOpacity }}
            className="w-full text-right -mt-2 md:-mt-4"
          >
            <div 
              style={{ fontFamily: "'BodoniMio', serif" }} 
              className="text-[4.5vw] md:text-[3.8vw] text-[#e0e0e0] font-normal inline-block drop-shadow-md"
            >
              <motion.span 
                whileHover={{ scale: 1.06, y: -2 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer mr-[0.25em]"
              >
                Ornella
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.06, y: -2 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer"
              >
                Isabel
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* FOOTER HERO CON ANIMAZIONE HOVER PAROLA PER PAROLA MORBIDA */}
        <motion.footer 
          style={{ y: heroFooterY, opacity: heroOpacity }}
          className="w-full text-center z-10 pb-4"
        >
          <div className="text-sm md:text-base tracking-[0.35em] text-[#cccccc] font-medium uppercase leading-relaxed drop-shadow-md inline-block">
            <div className="inline-block">
              <motion.span
                whileHover={{ scale: 1.06, y: -1 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer mr-[0.3em]"
              >
                VISUAL
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.06, y: -1 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer"
              >
                DESIGNER
              </motion.span>
            </div>
            <br />
            <div className="inline-block">
              <motion.span
                whileHover={{ scale: 1.06, y: -1 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer mr-[0.3em]"
              >
                &amp;
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.06, y: -1 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer mr-[0.3em]"
              >
                CONTENT
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.06, y: -1 }}
                transition={softHoverTransition}
                className="inline-block cursor-pointer"
              >
                CREATOR
              </motion.span>
            </div>
          </div>
        </motion.footer>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen bg-[#f2efeb] text-[#111111] flex items-center justify-center p-8 md:p-24 overflow-hidden">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* FOTO RITRATTO 2:3 PERFETTAMENTE CENTRATA */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="w-full max-w-[320px] aspect-[2/3] overflow-hidden rounded-sm border border-[#d5d0c8] shadow-md bg-[#e2ded9]">
              <img 
                src="/about-portrait.png" 
                alt="Ornella Isabel Tataje Falcon" 
                className="w-full h-full object-cover object-center block"
              />
            </div>
          </div>

          {/* TESTI ABOUT AGGIORNATI CON ANIMAZIONE DI ENTRATA DA DESTRA */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-7 space-y-6 text-left"
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111]">
              Cura del dettaglio, visione strategica e flessibilità operativa.
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#333333] leading-relaxed font-normal">
              <p>
                Visual Designer e Content Creator basata a Milano. Il mio lavoro nasce dall'unione tra ricerca visiva e pragmatismo: mi adatto rapidamente a nuovi flussi di lavoro, software e linguaggi di brand per intervenire ovunque serva una soluzione visiva efficace.
              </p>
              <p>
                La mia esperienza spazia dal lavoro in agenzia per clienti internazionali fino al supporto per importanti realtà editoriali e media digitali. Sviluppo progetti di re-branding social, logo design, campagne promozionali, suite ADV e contenuti video.
              </p>
              <p>
                Gestisco l'intero processo creativo con totale autonomia, garantendo rigore estetico e tempi di risposta rapidi per ogni deliverable.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* WORK */}
      <section id="work" className="min-h-screen bg-[#111111] text-white p-8 md:p-24 space-y-24 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end border-b border-[#333333] pb-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Work</h2>
            <span className="text-xs md:text-sm tracking-widest text-[#888888] uppercase">(01 — 04)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer space-y-4"
              >
                <div 
                  className="w-full aspect-[4/3] bg-cover bg-center overflow-hidden relative border border-[#222222]"
                  style={{ 
                    backgroundImage: project.id === "bellitalia" 
                      ? "url(/bellitalia-bg.png)" 
                      : project.id === "amynah" 
                      ? "url(/amynah-cover-bg.png)" 
                      : "none" 
                  }}
                >
                  <img 
                    src={project.coverImg} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <div>
                    <span className="text-xs text-[#888888] tracking-widest uppercase block">{project.category}</span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#cccccc] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#666666] uppercase">{project.client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOTION HIGHLIGHTS COVER FLOW */}
      <section className="bg-[#f2efeb] text-[#111111] px-8 py-10 md:px-24 md:py-14 border-t border-[#e2ded9] border-b select-none min-h-[820px] flex flex-col justify-between">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-end border-b border-[#d5d0c8] pb-4 relative z-50">
          <div>
            <span className="text-xs text-[#777777] tracking-widest uppercase block mb-1">05 / REELS &amp; SHORT-FORM VIDEO</span>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight uppercase text-[#111111]">Motion Highlights</h3>
          </div>
          <div className="flex items-center space-x-3 relative z-50">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="px-4 py-2 bg-[#111111] text-white hover:bg-black rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer mr-2 active:scale-95"
            >
              {isMuted ? "🔇 Unmute" : "🔊 Mute"}
            </button>
            <button 
              onClick={handlePrevVideo}
              className="w-11 h-11 bg-white border border-[#111111]/30 hover:border-[#111111] rounded-full flex items-center justify-center text-base transition-all text-[#111111] hover:scale-110 shadow-sm cursor-pointer active:scale-95"
            >
              ←
            </button>
            <button 
              onClick={handleNextVideo}
              className="w-11 h-11 bg-white border border-[#111111]/30 hover:border-[#111111] rounded-full flex items-center justify-center text-base transition-all text-[#111111] hover:scale-110 shadow-sm cursor-pointer active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center py-6 md:py-10 space-y-6">
          <div className="relative w-full h-[500px] sm:h-[520px] md:h-[540px] flex items-center justify-center py-6">
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              {videoShowcase.map((v, index) => {
                let rawOffset = index - realActiveIndex;
                if (rawOffset > total / 2) rawOffset -= total;
                if (rawOffset < -total / 2) rawOffset += total;

                const offset = rawOffset;
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);

                const xPos = offset * STEP;
                const cardScale = isCenter ? 1 : 0.88;
                const cardOpacity = isCenter ? 1 : absOffset === 1 ? 0.75 : absOffset === 2 ? 0.40 : 0.15;
                const zIdx = 50 - absOffset * 10;

                return (
                  <motion.div 
                    key={v.id}
                    onClick={() => {
                      if (offset === 0) {
                        const activeVideo = videoRefs.current[index];
                        if (activeVideo) {
                          if (isPlaying) {
                            activeVideo.pause();
                            setIsPlaying(false);
                          } else {
                            activeVideo.play().then(() => setIsPlaying(true)).catch(() => {
                              activeVideo.muted = true;
                              activeVideo.play().then(() => setIsPlaying(true));
                            });
                          }
                        }
                      } else {
                        setVirtualIndex((prev) => prev + offset);
                        setIsPlaying(true);
                      }
                    }}
                    initial={false}
                    animate={{
                      x: xPos,
                      scale: cardScale,
                      opacity: cardOpacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 20,
                      mass: 0.9
                    }}
                    style={{
                      zIndex: zIdx,
                      position: "absolute"
                    }}
                    className={`cursor-pointer rounded-2xl group ${
                      isCenter 
                        ? "w-[210px] sm:w-[230px] md:w-[240px] aspect-[9/16] shadow-xl shadow-black/15" 
                        : "w-[210px] sm:w-[230px] md:w-[240px] aspect-[9/16] shadow-md shadow-black/10 blur-[0.3px] hover:opacity-80"
                    }`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full h-full rounded-2xl overflow-hidden relative bg-black border border-black/10"
                    >
                      <video 
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={v.src} 
                        loop 
                        playsInline 
                        preload="auto"
                        muted={!isCenter || isMuted}
                        onLoadedMetadata={(e) => {
                          if (isCenter) {
                            setVideoDuration(e.currentTarget.duration);
                          }
                        }}
                        onTimeUpdate={(e) => {
                          if (isCenter && e.currentTarget.duration) {
                            setCurrentTime(e.currentTarget.currentTime);
                            setVideoProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100);
                          }
                        }}
                        className="w-full h-full object-cover rounded-2xl block"
                      />

                      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 pointer-events-none" />

                      {/* PLAY BUTTON AL CENTRO */}
                      {isCenter && !isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                          <div className="w-16 h-16 rounded-full bg-black/60 border border-white/40 flex items-center justify-center text-white text-2xl pl-1 backdrop-blur-md shadow-lg">
                            ▶
                          </div>
                        </div>
                      )}

                      {/* BARRA DI SCORRIMENTO DINAMICA IN HOVER PER IL VIDEO CENTRALE */}
                      {isCenter && (
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 flex flex-col space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono text-white/90">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(videoDuration)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={videoProgress || 0} 
                            onChange={(e) => {
                              const activeVideo = videoRefs.current[index];
                              if (activeVideo && activeVideo.duration) {
                                const newTime = (parseFloat(e.target.value) / 100) * activeVideo.duration;
                                activeVideo.currentTime = newTime;
                                setVideoProgress(parseFloat(e.target.value));
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
                          />
                        </div>
                      )}

                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="max-w-md mx-auto text-center space-y-1 pt-2 transition-all duration-300">
            <span className="text-[11px] tracking-widest uppercase text-green-600 font-bold block">
              {currentActiveVideo.category}
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-[#111111] uppercase tracking-tight leading-tight">
              {currentActiveVideo.client}
            </h4>
            <p className="text-xs text-[#555555] font-normal leading-relaxed">
              {currentActiveVideo.note}
            </p>
          </div>
        </div>
      </section>

      {/* MODALE FULLSCREEN */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#111111] text-white overflow-y-auto">
          <button 
            onClick={() => setSelectedProject(null)}
            className="fixed top-8 right-8 z-50 bg-white text-[#111111] w-12 h-12 flex items-center justify-center rounded-full text-xl hover:scale-110 transition-transform shadow-lg cursor-pointer"
          >
            ✕
          </button>

          <div 
            className="relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{ 
              backgroundImage: selectedProject.id === "bellitalia" 
                ? "url(/bellitalia-bg.png)" 
                : selectedProject.id === "amynah" 
                ? "url(/amynah-cover-bg.png)" 
                : "none" 
            }}
          >
            <img 
              src={selectedProject.coverImg} 
              alt={selectedProject.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent">
              <span className="text-xs md:text-sm text-[#aaaaaa] tracking-[0.3em] uppercase block mb-2">
                {selectedProject.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight">
                {selectedProject.title}
              </h1>
            </div>
          </div>

          <div className="w-full bg-[#161616] text-white py-12 px-8 md:px-20 border-y border-[#222222]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
              <div>
                <span className="text-[10px] text-[#888888] tracking-widest uppercase block mb-1">Client</span>
                <p className="text-sm md:text-base font-semibold">{selectedProject.client}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#888888] tracking-widest uppercase block mb-1">Industry</span>
                <p className="text-sm md:text-base font-semibold">{selectedProject.industry}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#888888] tracking-widest uppercase block mb-1">Services</span>
                <p className="text-sm md:text-base font-semibold">{selectedProject.services}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#888888] tracking-widest uppercase block mb-1">Year</span>
                <p className="text-sm md:text-base font-semibold">{selectedProject.year}</p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto py-16 px-8 md:px-20 space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-b border-[#222222] pb-16">
              <div className="md:col-span-4">
                <h3 className="text-xs tracking-widest uppercase font-bold text-[#888888]">About the Project</h3>
                <p className="text-xs text-[#cccccc] leading-relaxed pt-2">
                  {selectedProject.about}
                </p>
              </div>
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-xs tracking-widest uppercase font-bold text-[#888888]">Overview</h3>
                <div className="text-sm md:text-base text-[#e0e0e0] leading-relaxed font-normal whitespace-pre-line">
                  {selectedProject.overview}
                </div>
              </div>
            </div>

            <div className="space-y-24">
              {selectedProject.gallery.map((sec, i) => (
                <div key={i} className="space-y-12">
                  <div className="space-y-4 border-b border-[#222222] pb-4">
                    <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-white">
                      {sec.subtitle}
                    </h3>
                    <p className="text-xs md:text-sm text-[#aaaaaa] max-w-4xl leading-relaxed whitespace-pre-line">
                      {sec.desc}
                    </p>
                  </div>

                  {selectedProject.id === "bellitalia" && sec.bellitaliaCarousels ? (
                    <div className="space-y-12">
                      {sec.bellitaliaCarousels.map((cGroup, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                          style={{ backgroundImage: "url(/bellitalia-bg.svg)", clipPath: "inset(0)" }}
                        >
                          <div 
                            ref={(el) => { carouselRefs.current[`bi-${cIdx}`] = el; }}
                            className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar pr-6 md:pr-8"
                          >
                            {cGroup.slides.map((slide, slideIdx) => (
                              <div key={slideIdx} className="group cursor-pointer w-[200px] sm:w-[240px] aspect-[4/5] flex-shrink-0">
                                {slide.type === "image" ? (
                                  <img 
                                    src={slide.src} 
                                    alt={`Bell'Italia - Slide ${slideIdx + 1}`} 
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" 
                                  />
                                ) : (
                                  <video 
                                    src={slide.src} 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" 
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : selectedProject.id === "vita" && (i === 0 || i === 2 || i === 3) ? (
                    <div className="space-y-12">
                      {i === 0 ? (
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed border border-white/10 min-h-[580px] md:min-h-[680px] flex items-center justify-center py-10 md:py-14" 
                          style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                        >
                          <button 
                            onClick={() => scrollCarousel("sec01", "left")}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 hover:bg-black text-white flex items-center justify-center rounded-full border border-white/20 transition-all shadow-lg cursor-pointer"
                          >
                            ←
                          </button>
                          <button 
                            onClick={() => scrollCarousel("sec01", "right")}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 hover:bg-black text-white flex items-center justify-center rounded-full border border-white/20 transition-all shadow-lg cursor-pointer"
                          >
                            →
                          </button>
                          <div 
                            ref={(el) => { carouselRefs.current["sec01"] = el; }}
                            className="relative z-10 flex items-center space-x-16 overflow-x-auto snap-x snap-mandatory no-scrollbar px-10 md:px-20 scroll-smooth w-full"
                          >
                            {sec.images?.map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="w-full min-w-[100%] sm:min-w-[850px] md:min-w-[1050px] flex-shrink-0 snap-center flex items-center justify-center pl-10 md:pl-20">
                                <img src={imgUrl} alt={`Print Magazine - ${imgIdx + 1}`} className="w-full h-auto max-h-[72vh] object-contain block mx-auto" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : i === 3 && sec.vitaMotionCarousels ? (
                        /* 04 / MOTION GRAPHICS & ANIMATED INFOGRAPHICS - PULITO SENZA BOX GRIGI E CON CARD DIMEZZATE/SIMMETRICHE */
                        <div className="space-y-12">
                          {sec.vitaMotionCarousels.map((mGroup, mIdx) => (
                            <div 
                              key={mIdx} 
                              className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                              style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                            >
                              <div 
                                ref={(el) => { carouselRefs.current[`vita-m-${mIdx}`] = el; }}
                                className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar pr-6 md:pr-8"
                              >
                                {mGroup.slides.map((slide, slideIdx) => (
                                  <div key={slideIdx} className="group cursor-pointer w-[200px] sm:w-[240px] aspect-[4/5] flex-shrink-0">
                                    {slide.type === "image" ? (
                                      <img 
                                        src={slide.src} 
                                        alt={`VITA Motion Set ${mIdx + 1} - Slide ${slideIdx + 1}`} 
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" 
                                      />
                                    ) : (
                                      <video 
                                        src={slide.src} 
                                        autoPlay 
                                        loop 
                                        muted 
                                        playsInline 
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" 
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-12">
                          <div 
                            className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                            style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                          >
                            <div className="relative z-10 bg-black/10 border border-black/15 p-4 rounded-sm">
                              <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">INSTAGRAM CAROUSEL (4:5)</span>
                              <p className="text-[11px] text-[#333333] leading-snug pt-1 font-medium">
                                Layout grafico per la campagna “Abbonamento Sospeso” realizzata con CEIS Genova. Una struttura visiva pensata per massimizzare la leggibilità e guidare le candidature della community.
                              </p>
                            </div>
                            <div className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar">
                              {sec.images?.map((imgUrl, imgIdx) => (
                                <div key={imgIdx} className="group cursor-pointer w-[200px] sm:w-[240px] aspect-[4/5] flex-shrink-0">
                                  <img src={imgUrl} alt={`IG Slide - ${imgIdx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" />
                                </div>
                              ))}
                            </div>
                          </div>

                          {sec.metaCarousel && (
                            <div 
                              className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                              style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                            >
                              <div className="relative z-10 bg-black/10 border border-black/15 p-4 rounded-sm">
                                <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">META ADS CAMPAIGN 01 (1:1)</span>
                                <p className="text-[11px] text-[#333333] leading-snug pt-1 font-medium">
                                  Architettura visiva a sequenza per campagne Meta. Un format nativo studiato per raccontare i valori di VITA e convertire gli utenti nella scelta dei piani d'abbonamento.
                                </p>
                              </div>
                              <div className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar">
                                {sec.metaCarousel.map((imgUrl, imgIdx) => (
                                  <div key={imgIdx} className="group cursor-pointer w-[160px] sm:w-[200px] aspect-square flex-shrink-0">
                                    <img src={imgUrl} alt={`Meta 1 Slide - ${imgIdx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {sec.metaCarousel2 && (
                            <div 
                              className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                              style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                            >
                              <div className="relative z-10 bg-black/10 border border-black/15 p-4 rounded-sm">
                                <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">META ADS CAMPAIGN 02 (1:1) — SPECIALE LUGLIO/AGOSTO</span>
                                <p className="text-[11px] text-[#333333] leading-snug pt-1 font-medium">
                                  Campagna storytelling a 7 slide per lo speciale estivo “Nell'Italia dei paesi-persona”. Layout narrativo sviluppato per valorizzare l'identità dei territori e spingere la fruizione della mappa interattiva.
                                </p>
                              </div>
                              <div className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar">
                                {sec.metaCarousel2.map((imgUrl, imgIdx) => (
                                  <div key={imgIdx} className="group cursor-pointer w-[160px] sm:w-[200px] aspect-square flex-shrink-0">
                                    <img src={imgUrl} alt={`Meta Paesi Persona Slide - ${imgIdx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div 
                            className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-6 border border-white/10"
                            style={{ backgroundImage: `url(${sec.bgImage})`, clipPath: "inset(0)" }}
                          >
                            <div className="relative z-10 bg-black/10 border border-black/15 p-4 rounded-sm">
                              <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">DISPLAY ADV MULTI-FORMAT SUITE</span>
                              <p className="text-[11px] text-[#333333] leading-snug pt-1 font-medium">
                                Suite di banner promozionali per lo Speciale Filantropia (Salone della CSR in Bocconi). Declinazione coordinata su format Article Desktop (GIF animata), Half Page verticale e Masthead orizzontale.
                              </p>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
                              {sec.gifBanner && (
                                <div className="space-y-2">
                                  <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">ARTICLE DESKTOP (GIF)</span>
                                  <div className="w-full aspect-[4/3] bg-black/10 border border-black/15 p-2 flex items-center justify-center rounded-sm">
                                    <img src={sec.gifBanner} alt="Article Desktop GIF Banner" className="w-full h-full object-contain select-none" />
                                  </div>
                                </div>
                              )}

                              {sec.halfPageBanner && (
                                <div className="space-y-2">
                                  <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">HALF PAGE (300x600)</span>
                                  <div className="w-full aspect-[4/3] bg-black/10 border border-black/15 p-2 flex items-center justify-center rounded-sm">
                                    <img src={sec.halfPageBanner} alt="Half Page Banner" className="h-full object-contain select-none" />
                                  </div>
                                </div>
                              )}
                            </div>

                            {sec.mastheadBanner && (
                              <div className="relative z-10 space-y-2 pt-4 border-t border-black/15">
                                <span className="text-[10px] tracking-widest uppercase text-[#222222] font-bold block">MASTHEAD DESKTOP</span>
                                <div className="w-full aspect-[4/1] bg-black/10 border border-black/15 p-2 flex items-center justify-center rounded-sm">
                                  <img src={sec.mastheadBanner} alt="Masthead Desktop Banner" className="w-full h-full object-contain select-none" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : selectedProject.id === "factanza" ? (
                    <div className="space-y-12">
                      {i === 0 ? (
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                          style={{ backgroundImage: "url(/factanza-bg.png)", clipPath: "inset(0)" }}
                        >
                          <div 
                            ref={(el) => { carouselRefs.current[`factanza-c1`] = el; }}
                            className="relative z-10 flex items-center space-x-3 overflow-x-auto no-scrollbar pr-6 md:pr-8"
                          >
                            {sec.images?.map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="group cursor-pointer w-[200px] sm:w-[240px] aspect-[4/5] flex-shrink-0">
                                <img 
                                  src={imgUrl} 
                                  alt={`Factanza Slide - ${imgIdx + 1}`} 
                                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed py-8 px-4 sm:px-8 md:px-12 border border-white/10 flex items-center justify-center min-h-[520px] md:min-h-[620px]"
                          style={{ backgroundImage: "url(/factanza-bg.png)", clipPath: "inset(0)" }}
                        >
                          <button 
                            onClick={() => scrollCarousel("factanza-02", "left")}
                            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-black text-white flex items-center justify-center rounded-full border border-white/20 transition-all shadow-lg cursor-pointer"
                          >
                            ←
                          </button>
                          <button 
                            onClick={() => scrollCarousel("factanza-02", "right")}
                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-black text-white flex items-center justify-center rounded-full border border-white/20 transition-all shadow-lg cursor-pointer"
                          >
                            →
                          </button>

                          <div 
                            ref={(el) => { carouselRefs.current["factanza-02"] = el; }}
                            className="relative z-10 flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth w-full"
                          >
                            {sec.images?.map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="group cursor-pointer w-full min-w-[100%] flex-shrink-0 snap-center flex items-center justify-center my-auto p-2 sm:p-4">
                                <img 
                                  src={imgUrl} 
                                  alt={`Factanza Podcast Identity - ${imgIdx + 1}`} 
                                  className="w-auto h-auto max-h-[58vh] md:max-h-[68vh] max-w-full object-contain block mx-auto group-hover:scale-[1.01] transition-transform duration-300 ease-out" 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : selectedProject.id === "amynah" ? (
                    <div className="space-y-12">
                      {i === 0 ? (
                        /* 01 / BRAND DIRECTION, PALETTE & TYPOGRAPHY */
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed p-8 md:p-14 border border-white/10"
                          style={{ backgroundImage: "url(/amynah-bg.png)", clipPath: "inset(0)" }}
                        >
                          <div className="relative z-10 space-y-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/30 pb-8 gap-6">
                              <div>
                                <span className="text-[10px] text-white uppercase tracking-[0.2em] block mb-2 font-mono font-bold">
                                  BRAND TYPOGRAPHY SPECIMEN
                                </span>
                                <h4 style={{ fontFamily: "'Lora', serif" }} className="text-4xl md:text-5xl font-normal text-white drop-shadow-md">
                                  Lora Serif
                                </h4>
                              </div>
                              <div style={{ fontFamily: "'Lora', serif" }} className="text-sm text-white italic space-x-4 drop-shadow-sm">
                                <span>Confident. Composed. Unmoved.</span>
                                <span className="text-white/80 font-normal">—</span>
                                <span className="font-bold uppercase not-italic text-xs tracking-widest text-white">Aa Bb Cc 0123</span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white uppercase tracking-[0.2em] font-mono font-bold">
                                  BRAND COLOR PALETTE (CLICK TO COPY HEX)
                                </span>
                                {copiedHex && (
                                  <motion.span 
                                    initial={{ opacity: 0, y: 5 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    className="text-xs text-green-400 font-mono font-semibold"
                                  >
                                    Copied {copiedHex}!
                                  </motion.span>
                                )}
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
                                {[
                                  { hex: "#8d5028", name: "Rame / Cognac" },
                                  { hex: "#442827", name: "Cioccolato" },
                                  { hex: "#202d1e", name: "Bosco" },
                                  { hex: "#a4b49f", name: "Salvia" },
                                  { hex: "#f2efe9", name: "Sabbia", darkText: true },
                                ].map((color, idx) => (
                                  <div 
                                    key={idx}
                                    onClick={() => handleCopyHex(color.hex)}
                                    className="group relative h-36 rounded-sm p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-black/10"
                                    style={{ backgroundColor: color.hex }}
                                  >
                                    <span className={`text-[10px] tracking-widest uppercase font-semibold ${color.darkText ? 'text-black/80' : 'text-white/80'}`}>
                                      {color.name}
                                    </span>
                                    <div className="flex justify-between items-center">
                                      <span className={`text-xs font-mono font-bold ${color.darkText ? 'text-black' : 'text-white'}`}>
                                        {color.hex}
                                      </span>
                                      <span className={`text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity font-bold ${color.darkText ? 'text-black' : 'text-white'}`}>
                                        Copy
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : i === 1 ? (
                        /* 02 / INSTAGRAM FEED & 9-GRID CURATION */
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed p-8 md:p-14 border border-white/10"
                          style={{ backgroundImage: "url(/amynah-bg.png)", clipPath: "inset(0)" }}
                        >
                          <div className="relative z-10 flex flex-col md:flex-row items-center justify-around w-full max-w-6xl mx-auto gap-8 md:gap-12">
                            
                            {/* 1. GRIGLIA DA 9 */}
                            <div className="flex items-center justify-center p-2">
                              <img 
                                src="/amynah-feed-9.png" 
                                alt="Amynah Instagram 9-Grid Layout" 
                                className="w-full h-auto max-h-[60vh] max-w-[480px] object-contain block rounded-sm" 
                              />
                            </div>

                            {/* 2. MOCKUP TELEFONO */}
                            <div className="flex items-center justify-center p-2 pt-8 md:pt-0">
                              <img 
                                src="/amynah-phone.png" 
                                alt="Amynah Instagram Phone UI" 
                                className="w-auto h-auto max-h-[52vh] max-w-full object-contain block rounded-sm" 
                              />
                            </div>

                          </div>
                        </div>
                      ) : (
                        /* 03 / CAROUSEL CONTENT FORMAT */
                        <div 
                          className="relative overflow-hidden bg-cover bg-center bg-fixed p-6 space-y-4 border border-white/10"
                          style={{ backgroundImage: "url(/amynah-bg.png)", clipPath: "inset(0)" }}
                        >
                          <div 
                            ref={(el) => { carouselRefs.current["amynah-c"] = el; }}
                            className="relative z-10 flex items-center space-x-4 overflow-x-auto no-scrollbar pr-6 md:pr-8"
                          >
                            {sec.images?.map((imgUrl, imgIdx) => (
                              <div key={imgIdx} className="group cursor-pointer w-[220px] sm:w-[260px] aspect-[4/5] flex-shrink-0">
                                <img src={imgUrl} alt={`Amynah Carousel - Slide ${imgIdx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    sec.images && sec.images.length > 0 && (
                      <div className="relative overflow-hidden bg-cover bg-center border-none shadow-none min-h-[480px] md:min-h-[560px] flex items-center p-0" style={{ backgroundImage: `url(${sec.bgImage || sec.images[0]})` }}>
                        <div 
                          ref={(el) => { carouselRefs.current[`std-${i}`] = el; }}
                          className="relative z-10 w-full overflow-x-auto snap-x snap-mandatory no-scrollbar flex items-center space-x-8 scroll-smooth py-8 px-8 md:px-16"
                        >
                          {sec.images.map((imgUrl, imgIdx) => (
                            <div key={imgIdx} className="group cursor-pointer w-[260px] sm:w-[340px] md:w-[400px] flex-shrink-0 snap-center">
                              <img 
                                src={imgUrl} 
                                alt={`Content - ${imgIdx + 1}`} 
                                className="w-full h-full object-contain block mx-auto group-hover:scale-[1.02] transition-transform duration-300 ease-out" 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {sec.singleImage && selectedProject.id !== "amynah" && (
                    <div className="group cursor-pointer w-full bg-transparent overflow-hidden">
                      <img src={sec.singleImage} alt={sec.subtitle} className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-300 ease-out" />
                    </div>
                  )}

                  {!sec.images && !sec.singleImage && !sec.bellitaliaCarousels && !sec.vitaMotionCarousels && (
                    <div className="w-full aspect-[16/9] bg-[#1a1a1a] border border-[#222222] flex items-center justify-center text-xs tracking-widest uppercase text-[#666666]">
                      {sec.placeholder}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-16 border-t border-[#222222] flex justify-center pb-12">
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-xs tracking-widest uppercase px-8 py-4 bg-white text-[#111111] hover:bg-[#e0e0e0] transition-colors font-medium shadow-md cursor-pointer"
              >
                ← Back to All Projects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <section id="contact" className="min-h-[65vh] bg-[#111111] text-white flex flex-col justify-between p-8 md:p-24 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto w-full my-auto space-y-6 text-center md:text-left pt-6">
          <span className="text-xs text-[#888888] tracking-widest uppercase block">Let's Connect</span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase text-white">
            Get in touch
          </h2>
          
          <div className="space-y-2 pt-2">
            <a 
              href="mailto:tataje.falcon@gmail.com" 
              className="text-lg md:text-2xl font-light text-[#e0e0e0] hover:text-white transition-colors underline underline-offset-4 block tracking-wide"
            >
              tataje.falcon@gmail.com
            </a>
            
            <a 
              href="tel:+393335004645" 
              className="text-base md:text-xl font-light text-[#aaaaaa] hover:text-white transition-colors block tracking-wide"
            >
              +39 333 500 4645
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-6 border-t border-[#222222] max-w-xl">
            <a 
              href="https://www.linkedin.com/in/ornella-isabel-tataje-falcon-8b85451b5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xs md:text-sm text-[#cccccc] hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 0 0-1.47 1.47c0 .81.66 1.47 1.47 1.47s1.47-.66 1.47-1.47c0-.81-.66-1.47-1.47-1.47Z" />
              </svg>
              <span className="tracking-wider uppercase font-medium">LinkedIn</span>
            </a>

            <a 
              href="https://www.instagram.com/ornellatataje/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xs md:text-sm text-[#cccccc] hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="tracking-wider uppercase font-medium">Instagram</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-xs text-[#777777] tracking-widest uppercase pt-12 space-y-4 md:space-y-0">
          <span>Milan, Italy</span>
          <span>© {new Date().getFullYear()} Ornella Tataje Falcon</span>
        </div>
      </section>

    </div>
  );
}