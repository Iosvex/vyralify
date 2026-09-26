import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'HI', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'PT', name: 'Português', flag: '🇧🇷' },
  { code: 'AR', name: 'العربية (Arabic)', flag: '🇦🇪' }
];

export const translations = {
  EN: {
    nav: {
      solutions: "Solutions",
      agencies: "Agencies",
      pricing: "Pricing",
      resources: "Resources",
      login: "Login",
      getStarted: "Get Started",
      byUseCase: "BY USE CASE",
      byCreatorType: "BY CREATOR TYPE",
      featuredBadge: "POPULAR",
      featuredTitle: "Instagram DM Flow",
      featuredDesc: "Automate leads, links & sales directly inside your DMs.",
      useCases: {
        commentToDm: "Comment-to-DM",
        autoSendLinks: "Auto-Send Links",
        leadCapture: "Lead Capture",
        storyReplies: "Story Replies"
      },
      creatorTypes: {
        reelsCreators: "Reels Creators",
        ecommerceBrands: "E-Commerce Brands",
        coachesEducators: "Coaches & Educators",
        serviceBusinesses: "Service Businesses"
      }
    },
    hero: {
      eyebrow: "INSTAGRAM DM AUTOMATION",
      headlineLine1: "More clicks,",
      headlineLine2: "leads, and sales",
      headlineLine3: "from Instagram",
      body: "Instagram DM automation that turns comments, story replies, and DMs into instant links, captured emails, and sales, on autopilot. Set it up once, it runs on every post, reel or story.",
      cta: "Get Started Free",
      proof: "Loved by creators, brands and agencies",
      phone: {
        status: "Active now",
        userMsg1: "LINK please!",
        botMsg1: "Hey! Thanks for commenting! Here's the link you asked for:",
        botButton: "Shop Now →",
        userMsg2: "Omg that was instant, thank you!",
        inputPlaceholder: "Message..."
      }
    }
  },
  HI: {
    nav: {
      solutions: "समाधान",
      agencies: "एजेंसियां",
      pricing: "कीमतें",
      resources: "संसाधन",
      login: "लॉग इन",
      getStarted: "शुरू करें",
      byUseCase: "उपयोग के अनुसार",
      byCreatorType: "क्रिएटर के प्रकार",
      featuredBadge: "लोकप्रिय",
      featuredTitle: "इंस्टाग्राम डीएम फ्लो",
      featuredDesc: "डीएम में सीधे लीड्स, लिंक्स और बिक्री को स्वचालित करें।",
      useCases: {
        commentToDm: "कमेंट-टू-डीएम",
        autoSendLinks: "ऑटो-सेंड लिंक्स",
        leadCapture: "लीड कैप्चर",
        storyReplies: "स्टोरी रिप्लाई"
      },
      creatorTypes: {
        reelsCreators: "रील्स क्रिएटर्स",
        ecommerceBrands: "ई-कॉमर्स ब्रांड्स",
        coachesEducators: "कोच और शिक्षक",
        serviceBusinesses: "सेवा व्यवसाय"
      }
    },
    hero: {
      eyebrow: "इंस्टाग्राम डीएम ऑटोमेशन",
      headlineLine1: "ज्यादा क्लिक्स,",
      headlineLine2: "लीड्स, और बिक्री",
      headlineLine3: "सीधे इंस्टाग्राम से",
      body: "इंस्टाग्राम डीएम ऑटोमेशन जो कमेंट्स, स्टोरी रिप्लाई और संदेशों को तुरंत लिंक्स, कैप्चर किए गए ईमेल्स और बिक्री में बदल देता है, पूरी तरह ऑटोपायलट पर। एक बार सेट करें, यह हर पोस्ट, रील या स्टोरी पर काम करेगा।",
      cta: "मुफ्त में शुरू करें",
      proof: "क्रिएटर्स, ब्रांड्स और एजेंसियों द्वारा विश्वसनीय",
      phone: {
        status: "अभी सक्रिय",
        userMsg1: "LINK please!",
        botMsg1: "नमस्ते! कमेंट करने के लिए शुक्रिया! यह रहा आपका मांगा हुआ लिंक:",
        botButton: "अभी खरीदें →",
        userMsg2: "अरे वाह यह तो तुरंत आ गया, बहुत धन्यवाद!",
        inputPlaceholder: "संदेश लिखें..."
      }
    }
  },
  ES: {
    nav: {
      solutions: "Soluciones",
      agencies: "Agencias",
      pricing: "Precios",
      resources: "Recursos",
      login: "Iniciar sesión",
      getStarted: "Empezar",
      byUseCase: "POR CASO DE USO",
      byCreatorType: "POR TIPO DE CREADOR",
      featuredBadge: "POPULAR",
      featuredTitle: "Flujo de MD en Instagram",
      featuredDesc: "Automatiza leads, enlaces y ventas directamente en tus mensajes.",
      useCases: {
        commentToDm: "Comentario a MD",
        autoSendLinks: "Envío automático de links",
        leadCapture: "Captura de leads",
        storyReplies: "Respuestas a historias"
      },
      creatorTypes: {
        reelsCreators: "Creadores de Reels",
        ecommerceBrands: "Marcas de E-Commerce",
        coachesEducators: "Coaches y Educadores",
        serviceBusinesses: "Empresas de Servicios"
      }
    },
    hero: {
      eyebrow: "AUTOMATIZACIÓN DE MD DE INSTAGRAM",
      headlineLine1: "Más clics,",
      headlineLine2: "leads y ventas",
      headlineLine3: "desde Instagram",
      body: "Automatización de DM en Instagram que convierte comentarios, respuestas a historias y mensajes directos en enlaces instantáneos, correos capturados y ventas, en piloto automático. Configúralo una vez, funciona en cada publicación, reel o historia.",
      cta: "Comenzar Gratis",
      proof: "Amado por creadores, marcas y agencias",
      phone: {
        status: "Activo ahora",
        userMsg1: "¡LINK por favor!",
        botMsg1: "¡Hola! Gracias por comentar! Aquí está el enlace que pediste:",
        botButton: "Comprar Ahora →",
        userMsg2: "¡Guau, fue instantáneo, muchas gracias!",
        inputPlaceholder: "Mensaje..."
      }
    }
  },
  FR: {
    nav: {
      solutions: "Solutions",
      agencies: "Agences",
      pricing: "Tarifs",
      resources: "Ressources",
      login: "Connexion",
      getStarted: "Commencer",
      byUseCase: "PAR CAS D'USAGE",
      byCreatorType: "PAR TYPE DE CRÉATEUR",
      featuredBadge: "POPULAIRE",
      featuredTitle: "Flux DM Instagram",
      featuredDesc: "Automatisez prospects, liens et ventes directement dans vos DMs.",
      useCases: {
        commentToDm: "Commentaire vers DM",
        autoSendLinks: "Envoi auto de liens",
        leadCapture: "Capture de prospects",
        storyReplies: "Réponses aux Stories"
      },
      creatorTypes: {
        reelsCreators: "Créateurs de Reels",
        ecommerceBrands: "Marques E-Commerce",
        coachesEducators: "Coachs & Formateurs",
        serviceBusinesses: "Entreprises de Services"
      }
    },
    hero: {
      eyebrow: "AUTOMATISATION DES DM INSTAGRAM",
      headlineLine1: "Plus de clics,",
      headlineLine2: "de prospects et ventes",
      headlineLine3: "depuis Instagram",
      body: "L'automatisation des DM Instagram qui transforme commentaires, réponses aux stories et messages en liens instantanés, emails capturés et ventes, en pilote automatique. Configurez-le une fois, il fonctionne sur chaque publication, reel ou story.",
      cta: "Commencer Gratuitement",
      proof: "Adoré par les créateurs, marques et agences",
      phone: {
        status: "En ligne",
        userMsg1: "LIEN s'il vous plaît !",
        botMsg1: "Salut ! Merci pour ton commentaire! Voici le lien demandé :",
        botButton: "Acheter →",
        userMsg2: "Incroyable, c'était instantané, merci !",
        inputPlaceholder: "Message..."
      }
    }
  },
  DE: {
    nav: {
      solutions: "Lösungen",
      agencies: "Agenturen",
      pricing: "Preise",
      resources: "Ressourcen",
      login: "Anmelden",
      getStarted: "Jetzt starten",
      byUseCase: "NACH ANWENDUNG",
      byCreatorType: "NACH CREATOR-TYP",
      featuredBadge: "BELIEBT",
      featuredTitle: "Instagram-DM-Flow",
      featuredDesc: "Automatisiere Leads, Links und Verkäufe direkt in deinen DMs.",
      useCases: {
        commentToDm: "Kommentar-zu-DM",
        autoSendLinks: "Links auto-senden",
        leadCapture: "Lead-Erfassung",
        storyReplies: "Story-Antworten"
      },
      creatorTypes: {
        reelsCreators: "Reels Creators",
        ecommerceBrands: "E-Commerce Marken",
        coachesEducators: "Coaches & Trainer",
        serviceBusinesses: "Dienstleister"
      }
    },
    hero: {
      eyebrow: "INSTAGRAM DM-AUTOMATISIERUNG",
      headlineLine1: "Mehr Klicks,",
      headlineLine2: "Leads und Verkäufe",
      headlineLine3: "über Instagram",
      body: "Instagram-DM-Automatisierung, die Kommentare, Story-Antworten und DMs vollautomatisch in Sofort-Links, erfasste E-Mails und Verkäufe verwandelt. Einmal einrichten, läuft auf jedem Beitrag, Reel oder jeder Story.",
      cta: "Kostenlos starten",
      proof: "Beliebt bei Creators, Marken und Agenturen",
      phone: {
        status: "Jetzt aktiv",
        userMsg1: "LINK bitte!",
        botMsg1: "Hey! Danke für deinen Kommentar! Hier ist dein gewünschter Link:",
        botButton: "Jetzt shoppen →",
        userMsg2: "Wahnsinn, das ging sofort, vielen Dank!",
        inputPlaceholder: "Nachricht..."
      }
    }
  },
  PT: {
    nav: {
      solutions: "Soluções",
      agencies: "Agências",
      pricing: "Preços",
      resources: "Recursos",
      login: "Entrar",
      getStarted: "Começar",
      byUseCase: "POR CASO DE USO",
      byCreatorType: "POR TIPO DE CRIADOR",
      featuredBadge: "POPULAR",
      featuredTitle: "Fluxo de DM no Instagram",
      featuredDesc: "Automatize leads, links e vendas diretamente nas suas DMs.",
      useCases: {
        commentToDm: "Comentário para DM",
        autoSendLinks: "Envio Automático de Links",
        leadCapture: "Captura de Leads",
        storyReplies: "Respostas aos Stories"
      },
      creatorTypes: {
        reelsCreators: "Criadores de Reels",
        ecommerceBrands: "Marcas de E-Commerce",
        coachesEducators: "Coaches e Educadores",
        serviceBusinesses: "Empresas de Serviços"
      }
    },
    hero: {
      eyebrow: "AUTOMAÇÃO DE DM DO INSTAGRAM",
      headlineLine1: "Mais cliques,",
      headlineLine2: "leads e vendas",
      headlineLine3: "pelo Instagram",
      body: "Automação de DM do Instagram que transforma comentários, respostas aos stories e DMs em links instantâneos, e-mails capturados e vendas, no piloto automático. Configure uma vez, funciona em qualquer post, reel ou story.",
      cta: "Começar Grátis",
      proof: "Adorado por criadores, marcas e agências",
      phone: {
        status: "Ativo agora",
        userMsg1: "LINK por favor!",
        botMsg1: "Olá! Obrigado por comentar! Aqui está o link solicitado:",
        botButton: "Comprar Agora →",
        userMsg2: "Nossa, foi instantâneo, muito obrigado!",
        inputPlaceholder: "Mensagem..."
      }
    }
  },
  AR: {
    nav: {
      solutions: "الحلول",
      agencies: "الوكالات",
      pricing: "الأسعار",
      resources: "الموارد",
      login: "تسجيل الدخول",
      getStarted: "ابدأ الآن",
      byUseCase: "حسب الاستخدام",
      byCreatorType: "حسب نوع المبدع",
      featuredBadge: "الأكثر شهرة",
      featuredTitle: "أتمتة رسائل إنستغرام",
      featuredDesc: "أتمت العملاء المحتملين والروابط والمبيعات مباشرة داخل رسائلك.",
      useCases: {
        commentToDm: "التعليق إلى رسالة",
        autoSendLinks: "إرسال الروابط تلقائياً",
        leadCapture: "جمع بيانات العملاء",
        storyReplies: "الردود على القصص"
      },
      creatorTypes: {
        reelsCreators: "صناع محتوى الريلز",
        ecommerceBrands: "المتاجر الإلكترونية",
        coachesEducators: "المدربون والمعلمون",
        serviceBusinesses: "الشركات الخدمية"
      }
    },
    hero: {
      eyebrow: "أتمتة الرسائل المباشرة على إنستغرام",
      headlineLine1: "مزيد من النقرات،",
      headlineLine2: "والعملاء والمبيعات",
      headlineLine3: "من إنستغرام",
      body: "أتمتة الرسائل المباشرة في إنستغرام التي تحول التعليقات والردود على القصص والرسائل إلى روابط فورية ورسائل بريد إلكتروني ومبيعات بشكل تلقائي. اضبطها مرة واحدة وستعمل على كل منشور أو ريل أو قصة.",
      cta: "ابدأ مجاناً",
      proof: "موثوق من قبل المبدعين والعلامات التجارية والوكالات",
      phone: {
        status: "نشط الآن",
        userMsg1: "الرابط من فضلك!",
        botMsg1: "أهلاً بك! شكراً لتعليقك! إليك الرابط الذي طلبته:",
        botButton: "تسوق الآن ←",
        userMsg2: "رائع! وصل فوراً، شكراً جزيلاً لك!",
        inputPlaceholder: "رسالة..."
      }
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vyralify-lang');
      if (saved && translations[saved]) {
        return saved;
      }
    }
    return 'EN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vyralify-lang', currentLang);
      document.documentElement.lang = currentLang.toLowerCase();
    }
  }, [currentLang]);

  const activeLangObj = languages.find(l => l.code === currentLang) || languages[0];

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLang(langCode);
    }
  };

  // Helper function to resolve nested keys like t('hero.headlineLine1')
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[currentLang] || translations.EN;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations.EN;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, activeLangObj, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
