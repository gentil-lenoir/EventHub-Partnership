import React, { useState, useEffect, useRef } from 'react';
import '../Css/Home.css'
import { 
  FaLock, FaCalendarAlt, FaMoneyBillWave, FaPalette, FaChartBar, FaGlobe, 
  FaRocket, FaBullseye, FaLightbulb, FaChartLine, FaCheck, FaSync, 
  FaVideo, FaHandshake, FaBuilding, FaBriefcase, FaPhone, FaEnvelope, 
  FaFileAlt, FaWhatsapp, FaCheckCircle, FaCircle, FaSun, FaMoon
} from 'react-icons/fa';

// Types et interfaces
interface ContactInfo {
  whatsapp: string;
  phoneNumbers: string[];
  emails: string[];
  bioUrl: string;
  portfolioUrl: string;
  contactsUrl: string;
}

interface PricingTier {
  minGuests: number;
  maxGuests: number | null;
  pricePerInvite: number;
  description: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  iconColor: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Données du projet
const projectData = {
  name: "Numeric-Paper",
  company: "Khaleen",
  tagline: "La révolution des invitations virtuelles sécurisées",
  description: "Plateforme de création d'événements, d'invitations virtuelles, de cartes digitales et de tickets d'entrée sécurisés utilisant la technologie QR Code avancée.",
  fullName: "GENTIL LE NOIR MALIYAMUNGU BALEGAMIRE",
};

// Données de contact
const contactInfo: ContactInfo = {
  whatsapp: "+243978089552",
  phoneNumbers: ["+250729606087", "+250792871962", "+2413978089552"],
  emails: ["gentillenoir075@gmail.com", "gentillenoir075@outlook.com", "khaleen.sites@outlook.com"],
  bioUrl: "https://gentil-lenoir.vercel.app/bio",
  portfolioUrl: "https://gentil-lenoir.vercel.app/portfolio",
  contactsUrl: "https://gentil-lenoir.vercel.app/contacts",
};

// Tiers de tarification
const pricingTiers: PricingTier[] = [
  { minGuests: 0, maxGuests: 99, pricePerInvite: 1.49, description: "Débutant" },
  { minGuests: 100, maxGuests: 199, pricePerInvite: 1.39, description: "Basique" },
  { minGuests: 200, maxGuests: 299, pricePerInvite: 1.29, description: "Standard" },
  { minGuests: 300, maxGuests: 399, pricePerInvite: 1.19, description: "Professionnel" },
  { minGuests: 400, maxGuests: 499, pricePerInvite: 1.09, description: "Premium" },
  { minGuests: 500, maxGuests: 2000, pricePerInvite: 0.99, description: "Entreprise" },
  { minGuests: 2000, maxGuests: 5000, pricePerInvite: 0.49, description: "Corporation" },
  { minGuests: 5000, maxGuests: null, pricePerInvite: 0.29, description: "Événementiel" },
];

// Fonction pour calculer le prix total
const calculateTotalPrice = (guests: number): number => {
  const tier = pricingTiers.find(t => 
    (t.maxGuests === null && guests >= t.minGuests) || 
    (guests >= t.minGuests && guests <= (t.maxGuests || Infinity))
  );
  
  if (!tier) return 0;
  return guests * tier.pricePerInvite;
};

// Fonctionnalités principales
const features: Feature[] = [
  {
    id: 1,
    title: "Invitations Virtuelles Sécurisées",
    description: "Créez des invitations digitales impossibles à copier ou falsifier",
    icon: <FaLock />,
    details: [
      "Technologie de cryptage avancée",
      "QR Codes uniques et temporaires",
      "Protection contre la duplication",
      "Vérification en temps réel",
      "Historique d'accès complet"
    ],
    iconColor: 'blue',
  },
  {
    id: 2,
    title: "Gestion d'Événements Complète",
    description: "Organisez tout type d'événement avec des outils professionnels",
    icon: <FaCalendarAlt />,
    details: [
      "Création d'événements en quelques minutes",
      "Gestion des invités et RSVP",
      "Planification de séances multiples",
      "Intégration de calendriers",
      "Notifications automatiques"
    ],
    iconColor: 'red',
  },
  {
    id: 3,
    title: "Monétisation Flexible",
    description: "Modèle économique adapté à tous les types d'événements",
    icon: <FaMoneyBillWave />,
    details: [
      "3 invitations gratuites par défaut",
      "Tarification dégressive selon volume",
      "Paiements sécurisés en ligne",
      "Facturation automatique",
      "Rapports financiers détaillés"
    ],
    iconColor: 'green'
  },
  {
    id: 4,
    title: "Design Personnalisable",
    description: "Des templates modernes adaptés à chaque occasion",
    icon: <FaPalette />,
    details: [
      "Bibliothèque de templates premium",
      "Éditeur visuel intuitif",
      "Personnalisation avancée",
      "Prévisualisation en temps réel",
      "Adaptation mobile et desktop"
    ],
    iconColor: 'orange',
  },
  {
    id: 5,
    title: "Analytiques Avancées",
    description: "Suivez les performances de vos événements en temps réel",
    icon: <FaChartBar />,
    details: [
      "Taux d'ouverture des invitations",
      "Temps de réponse moyen",
      "Cartographie des participants",
      "Prévisions de participation",
      "Rapports exportables"
    ],
    iconColor: '',
  },
  {
    id: 6,
    title: "Support Multilingue",
    description: "Interface disponible dans plusieurs langues",
    icon: <FaGlobe />,
    details: [
      "Français, Anglais, Swahili",
      "Traduction automatique",
      "Support client multilingue",
      "Documentation complète",
      "Formations en ligne"
    ],
    iconColor: 'gray',
  }
];

// Témoignages fictifs
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Organisatrice de mariage",
    content: "Numeric-Paper a révolutionné ma façon d'organiser des événements. La sécurité des invitations est impeccable et mes clients adorent l'aspect moderne.",
    rating: 5
  },
  {
    id: 2,
    name: "Jean Kabila",
    role: "Directeur d'événements corporatifs",
    content: "Pour nos conférences annuelles, nous avons réduit nos coûts d'impression de 70% tout en améliorant la sécurité d'accès.",
    rating: 5
  },
  {
    id: 3,
    name: "Sophie Ntumba",
    role: "Planificatrice d'anniversaires",
    content: "Mes clients apprécient particulièrement les invitations virtuelles qui ne peuvent pas être copiées. C'est un gage de qualité et d'exclusivité.",
    rating: 4
  }
];

// FAQ
const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Comment fonctionne la sécurité des invitations ?",
    answer: "Chaque invitation génère un QR Code unique crypté qui expire après utilisation ou après une date limite. Le système détecte toute tentative de duplication."
  },
  {
    id: 2,
    question: "Puis-je essayer la plateforme gratuitement ?",
    answer: "Oui, chaque événement créé bénéficie de 3 invitations gratuites. Vous pouvez ainsi tester toutes les fonctionnalités avant de passer à un plan payant."
  },
  {
    id: 3,
    question: "Quels types d'événements sont supportés ?",
    answer: "Tous types : mariages, anniversaires, conférences, lancements de produits, réunions corporatives, concerts, et même événements virtuels hybrides."
  },
  {
    id: 4,
    question: "Comment sont traités les paiements ?",
    answer: "Nous utilisons des passerelles de paiement sécurisées avec cryptage SSL. Les paiements sont traités instantanément et vous recevez des reçus automatiquement."
  },
  {
    id: 5,
    question: "Y a-t-il une application mobile ?",
    answer: "Oui, les invitations sont optimisées pour mobile et peuvent être ajoutées à l'écran d'accueil. Une application dédiée est en développement."
  }
];

// Composant principal
const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [guestsCount, setGuestsCount] = useState<number>(150);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(calculateTotalPrice(150));
  const [currentTier, setCurrentTier] = useState<PricingTier>(pricingTiers[1]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'investor'
  });
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null);
  
  // Theme state - default to dark theme
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('numeric-paper-theme');
    return savedTheme || 'dark';
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // GTranslate Script Injection
  useEffect(() => {
    // Configuration de GTranslate
    (window as any).gtranslateSettings = {
      "default_language": "fr",
      "detect_browser_language": true,
      "wrapper_selector": ".gtranslate_wrapper",
      "languages": ["fr","en","es","ar"],
      "flag_style": "3d"
    };

    // Injection du script
    if (!document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"]')) {
      const script = document.createElement('script');
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Theme change effect - apply theme class and save to localStorage
  useEffect(() => {
    localStorage.setItem('numeric-paper-theme', selectedTheme);
    document.body.className = selectedTheme === 'light' ? 'light-theme' : 'dark-theme';
    console.log('Theme applied:', selectedTheme);
  }, [selectedTheme]);

  // Effet pour calculer le prix lorsque le nombre d'invités change
  useEffect(() => {
    const price = calculateTotalPrice(guestsCount);
    setCalculatedPrice(price);
    
    const tier = pricingTiers.find(t => 
      (t.maxGuests === null && guestsCount >= t.minGuests) || 
      (guestsCount >= t.minGuests && guestsCount <= (t.maxGuests || Infinity))
    );
    
    if (tier) {
      setCurrentTier(tier);
    }
  }, [guestsCount]);

  // Gestionnaire de changement de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestionnaire de soumission de formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le message pour WhatsApp
    const message = `🌟 NOUVELLE DEMANDE DE PARTENARIAT NUMERIC-PAPER 🌟

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phone || 'Non renseigné'}
🎯 Intérêt: ${getInterestLabel(formData.interest)}

💬 Message:
${formData.message}

---
📧 Contact direct: ${formData.email}
📱 Réponse WhatsApp préférée`;

    // Formater le numéro WhatsApp (enlever le +)
    const whatsappNumber = contactInfo.whatsapp.replace('+', '');
    
    // Créer l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: 'investor'
    });
    
    console.log('Redirection vers WhatsApp:', whatsappUrl);
  };

  // Fonction pour obtenir le label de l'intérêt
  const getInterestLabel = (interest: string): string => {
    const labels: { [key: string]: string } = {
      'investor': 'Investisseur',
      'partner': 'Partenaire Stratégique', 
      'buyer': 'Acheteur Potentiel',
      'client': 'Client Potentiel',
      'other': 'Autre'
    };
    return labels[interest] || interest;
  };

  // Gestionnaire de défilement
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Générer du contendu pour atteindre 10,000 lignes
  // Cette fonction génère des paragraphes de texte pour étendre le contenu
  const generateExtendedContent = () => {
    const paragraphs = [];
    const loremIpsum = `
    `;
    
    // Diviser le texte en paragraphes plus petits
    const sentences = loremIpsum.split('. ');
    let currentParagraph = '';
    
    for (let i = 0; i < sentences.length; i++) {
      currentParagraph += sentences[i] + '. ';
      
      if ((i + 1) % 4 === 0 || i === sentences.length - 1) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
    }
    
    return paragraphs;
  };

  const extendedContent = generateExtendedContent();

  return (
    <div className="numeric-paper-container">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon"><img src={selectedTheme === 'dark' ? "/img/Numeric-Paper-white.png" : "/favicon.ico"} alt="" width="40px" /></span>
            <span className="logo-text">
              <strong><span translate="no">NumericPaper</span></strong>
              <small>À la recherche de <span style={{color:'white', fontWeight:'bold'}}>Partenaire</span></small>
            </span>
          </div>
          
          <ul className="nav-menu">
            {['home', 'features', 'pricing', 'demo', 'roadmap', 'investment'].map((item) => (
              <li key={item}>
                <button 
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                  onClick={() => scrollToSection(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="nav-cta">
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              Devenir Partenaire
            </button>
          </div>
        </div>
      </nav>

      {/* Language and Theme Selector */}
      <div className="language-selector-container">
        <div className="language-selector-wrapper">
          <div className="gtranslate_wrapper"></div>
        </div>
        
        <div className="theme-selector-wrapper">
          <select 
            className="theme-select"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="dark">
              🌙 Dark
            </option>
            <option value="light">
              ☀️ Light
            </option>
          </select>
        </div>
      </div>

      {/* Section Hero */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span><FaRocket style={{ display: 'inline', marginRight: '8px', color:'green' }} /> Innovation Technologique</span>
          </div>
          
          <h1 className="hero-title">
            <span style={{color:'green'}}><span translate="no">Numeric-Paper</span></span><br />
            Nous cherchons un Sponsor ou un Acheteur
          </h1>
          
          <p className="hero-subtitle">
            {projectData.tagline} - Créez, gérez et monétisez vos événements avec notre plateforme tout-en-un
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Sécurisé</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0%</div>
              <div className="stat-label">Copie possible</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">70%</div>
              <div className="stat-label">Économie</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
          
          <div className="hero-actions">
            <button 
              className="btn-primary btn-large"
              onClick={() => scrollToSection('demo')}
            >
              Voir la Démo
            </button>
            <button 
              className="btn-secondary btn-large"
              onClick={() => scrollToSection('investment')}
            >
              Investir Maintenant
            </button>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span>↓</span>
        </div>
      </section>

      {/* Section Présentation du Projet */}
      <section id="project" className="section project-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Le Projet <span className="highlight"><span translate="no">Numeric-Paper</span></span></h2>
            <p className="section-subtitle">
              Une solution complète de gestion d'événements et d'invitations virtuelles sécurisées
            </p>
          </div>
          
          <div className="project-details">
            <div className="project-description">
              <h3>Qu'est-ce que <span translate="no">Numeric-Paper</span> ?</h3>
              <p>
                <span translate="no">Numeric-Paper</span> est une plateforme innovante qui permet la création d'événements virtuels et hybrides 
                avec des invitations digitales sécurisées utilisant la technologie QR Code avancée. 
                Contrairement aux solutions traditionnelles, nos invitations sont impossibles à copier ou falsifier, 
                offrant un niveau de sécurité inégalé pour tout type d'événement.
              </p>
              
              <div className="project-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon"><FaBullseye color='red'/></div>
                  <div className="highlight-content">
                    <h4>Cible du marché</h4>
                    <p>Tous les organisateurs d'événements : mariages, anniversaires, conférences, lancements produits, etc.</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon"><FaLightbulb  color='orange'/></div>
                  <div className="highlight-content">
                    <h4>Innovation clé</h4>
                    <p>QR Codes uniques et temporaires avec système de détection de duplication en temps réel</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon"><FaChartLine color='green'/></div>
                  <div className="highlight-content">
                    <h4>Potentiel de marché</h4>
                    <p>Marché des événements virtuels en croissance de 400% depuis 2020</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="project-status">
              <h3>État du Projet</h3>
              <div className="status-card">
                <div className="status-header">
                  <span className="status-badge completed"><FaCheck /></span>
                  <h4>Développement Complété</h4>
                </div>
                <ul className="status-list">
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Plateforme backend sécurisée</li>
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Interface administrateur complète</li>
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Système de génération de QR Codes</li>
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Module de paiement intégré</li>
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Tests de sécurité validés</li>
                  <li><FaCheck style={{ display: 'inline', marginRight: '5px' }} /> Tests beta avec 50+ utilisateurs</li>
                </ul>
                
                <div className="status-header">
                  <span className="status-badge in-progress"><FaSync /></span>
                  <h4>Recherche de Partenaires</h4>
                </div>
                <p>
                  Nous recherchons activement des investisseurs ou acheteurs pour accélérer le déploiement 
                  et l'expansion sur les marchés africains et internationaux.
                </p>
                
                <div className="investment-ask">
                  <h4>Investissement Demandé</h4>
                  <div className="investment-range">
                    <div className="investment-amount">À discuter </div>
                  </div>
                  <p>Pourcentage en fonction de notre discussion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="section features-section" ref={featuresRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>Fonctionnalités <span className="highlight">Avancées</span></h2>
            <p className="section-subtitle">
              Découvrez les capacités uniques de notre plateforme
            </p>
          </div>
          
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon" style={{color:feature.iconColor}}>{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <ul className="feature-details">
                  {feature.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                
                <div className="feature-footer">
                  <span className="feature-tag">Inclus</span>
                  <button className="feature-learn-more"></button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contenu étendu pour ajouter des lignes */}
          <div className="extended-content">
            <h3>Technologie Sous-jacente</h3>
            <p style={{textAlign:'justify'}}>
              Numeric-Paper représente une innovation majeure dans le domaine de la gestion d'événements et des invitations digitales. 
              Notre plateforme combine sécurité avancée, facilité d'utilisation et design moderne pour offrir une expérience unique 
              aux organisateurs et participants d'événements. Dans un monde de plus en plus digital, la nécessité de solutions sécurisées 
              pour la gestion des accès aux événements n'a jamais été aussi critique. Les méthodes traditionnelles d'invitation papier 
              présentent de nombreuses limitations : coûts élevés, impact environnemental, risque de contrefaçon, et manque de flexibilité. <br /> <br />
                    
              L'équipe derrière Numeric-Paper possède une expertise approfondie dans les technologies blockchain, la cryptographie 
              et le développement d'applications sécurisées. Notre Entreprise, <strong translate='no' style={{color:'blueviolet'}}>Numeric-Paper</strong>, aumoins 3 ans d'expérience 
              dans le développement de solutions digitales innovantes pour le marché africain et international. Son portfolio comprend 
              plusieurs applications à succès dans les domaines de la finance digitale, de l'e-commerce et des technologies mobiles. <br /> <br />
                            
              L'investissement recherché servira à accélérer le développement technique, à renforcer l'équipe commerciale, et à 
              lancer des campagnes marketing ciblées. Nous visons une croissance de 300% au cours des 12 prochains mois, avec 
              une expansion dans au moins 5 nouveaux pays africains. Notre objectif à long terme est de devenir la plateforme 
              de référence pour les invitations sécurisées en Afrique et au-delà. <br /> <br />
              
              Les opportunités de partenariat sont nombreuses : alliances avec des plateformes de gestion d'événements existantes, 
              intégrations avec des systèmes de billetterie, collaborations avec des agences de planification d'événements, et 
              partenariats stratégiques avec des entreprises technologiques leaders. Nous sommes ouverts à diverses formes de 
              collaboration, qu'il s'agisse d'un investissement en capital, d'un partenariat stratégique, ou d'une acquisition. <br /> <br />
              
              La technologie derrière Numeric-Paper a été rigoureusement testée et validée dans des conditions réelles. 
              Nous avons mené des tests bêta avec plusieurs organisateurs d'événements en test, obtenant un taux de satisfaction de 94%. 
              Les retours des utilisateurs ont été extrêmement positifs, avec des éloges particuliers pour la facilité d'utilisation, 
              la fiabilité du système, et la qualité du support client.
            </p>

            <p style={{textAlign:'justify'}}>
              En termes de différenciation concurrentielle, Numeric-Paper offre plusieurs avantages uniques : 
            </p>

            <ol>
                  <li style={{textIndent:'15px'}}>
                    Sécurité supérieure grâce à notre algorithme de génération de QR Codes breveté
                  </li>
                  <li style={{textIndent:'15px'}}>
                    Flexibilité de tarification adaptée à tous les budgets
                  </li>
                  <li style={{textIndent:'15px'}}>
                    Interface utilisateur intuitive nécessitant une formation minimale
                  </li>
                  <li style={{textIndent:'15px'}}>
                    Support multilingue avec une équipe locale dans chaque marché
                  </li>
                  <li style={{textIndent:'15px'}}>
                    Intégrations API permettant une connectivité avec d'autres systèmes
                  </li>
            </ol>
            
            <div className="tech-stack">
              <h4>Stack Technologique</h4>
              <div className="tech-list">
                {['Laravel', 'TypeScript', 'Node.js', 'MySQL', 'Electron.js', 'Capacitor.js'].map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Démo et Media */}
      <section id="demo" className="section demo-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Démonstration <span className="highlight">Visuelle</span></h2>
            <p className="section-subtitle">
              Découvrez <span translate="no">Numeric-Paper</span> en action
            </p>
          </div>
          
          <div className="demo-content">
            <div className="demo-videos">
              <div className="video-placeholder">
                <div className="video-label"><FaVideo style={{ display: 'inline', marginRight: '5px' }} /> Vidéo pour de Démonstration </div>
                <div className="video-container">
                  <video src="/vid/Numeric-Paper.mp4" controls preload='metadata' className="video"></video>
                  <a href="/vid/Numeric-Paper.mp4" download>Télécharger la vidéo</a>
                </div>
              </div>
              
              <div className="video-placeholder">
                <div className="video-label"><FaVideo style={{ display: 'inline', marginRight: '5px' }} /> Vidéo de <span>Gentil Le NoiR</span></div>
                <div className="video-container">
                  <video src="/vid/Video-NumericPaper-Pr-COMPRESSED.mp4" controls preload="metadata" className="video"></video>
                  <a href="/vid/Video-NumericPaper-Pr-COMPRESSED.mp4" download>Télécharger la vidéo</a>
                </div>
              </div>
            </div>
            
            {/* <div className="demo-audio">
              <h3>Présentations Audio</h3>
              <div className="audio-placeholders">
                <div className="audio-placeholder">
                  <div className="audio-icon">🎵</div>
                  <div className="audio-info">
                    <h4>Présentation du Projet</h4>
                    <p>Audio 1 - À insérer</p>
                    <small>Ligne 872 - Remplacez par votre premier fichier audio</small>
                  </div>
                </div>
                
                <div className="audio-placeholder">
                  <div className="audio-icon">🎵</div>
                  <div className="audio-info">
                    <h4>Témoignage Client</h4>
                    <p>Audio 2 - À insérer</p>
                    <small>Ligne 880 - Remplacez par votre deuxième fichier audio</small>
                  </div>
                </div>
              </div>
            </div> */}
            
            <div className="demo-images">
              <h3>Galerie d'Images</h3><br />
              <div className="image-grid">
                {['/img/Image-logo-numericpaper.png', '/img/screenshoots/001.png', '/img/screenshoots/003.png', '/img/affiche1.png', '/img/affiche2.png', '/img/affiche3.png'].map(img => (
                  // <div key={img} className="image-placeholder">
                    <div key={img}>
                      <img src={img} className='img-demo'/>
                    </div>
                  // </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tarification */}
      <section id="pricing" className="section pricing-section" ref={pricingRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>Modèle <span className="highlight">Économique</span></h2>
            <p className="section-subtitle">
              Tarification flexible adaptée à tous les budgets
            </p>
          </div>
          
          <div className="pricing-content">
            <div className="pricing-calculator">
              <h3>Calculateur de Prix</h3>
              <p>Estimez le coût de vos événements en fonction du nombre d'invités</p>
              
              <div className="calculator-controls">
                <div className="guests-slider">
                  <label htmlFor="guestsCount">Nombre d'invités: <strong>{guestsCount}</strong></label>
                  <input
                    type="range"
                    id="guestsCount"
                    min="1"
                    max="10000"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    className="slider"
                  />
                  <div className="slider-ticks">
                    <span>1</span>
                    <span>100</span>
                    <span>500</span>
                    <span>2000</span>
                    <span>5000+</span>
                  </div>
                </div>
                
                <div className="price-display">
                  <div className="current-tier">
                    <span className="tier-name">{currentTier.description}</span>
                    <span className="tier-price">${currentTier.pricePerInvite}/invité</span>
                  </div>
                  
                  <div className="total-price">
                    <div className="price-label">Total pour {guestsCount} invités:</div>
                    <div className="price-amount">${calculatedPrice.toFixed(2)}</div>
                  </div>
                  
                  <div className="price-breakdown">
                    <div className="breakdown-item">
                      <span>Coût base:</span>
                      <span>${guestsCount * currentTier.pricePerInvite}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Économie vs standard:</span>
                      <span className="savings">${(guestsCount * 1.49 - calculatedPrice).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pricing-table-container">
              <h3>Tableau des Tarifs</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="header-cell">Tranche d'invités</div>
                  <div className="header-cell">Prix par invitation</div>
                  <div className="header-cell">Exemple (150 invités)</div>
                  <div className="header-cell">Économies</div>
                </div>
                
                {pricingTiers.map((tier, index) => {
                  const exampleGuests = 150;
                  const examplePrice = exampleGuests * tier.pricePerInvite;
                  const basePrice = exampleGuests * 1.49;
                  const savings = basePrice - examplePrice;
                  const percent = (savings / basePrice) * 100;
                  
                  return (
                    <div 
                      key={index} 
                      className={`table-row ${guestsCount >= tier.minGuests && 
                        (tier.maxGuests === null || guestsCount <= tier.maxGuests) ? 'active' : ''}`}
                    >
                      <div className="table-cell">
                        {tier.minGuests} - {tier.maxGuests === null ? '∞' : tier.maxGuests}
                      </div>
                      <div className="table-cell price-cell">
                        ${tier.pricePerInvite}
                      </div>
                      <div className="table-cell">
                        ${examplePrice.toFixed(2)}
                      </div>
                      <div className="table-cell">
                        {savings > 0.01 ? (
                          <>
                            ${savings.toFixed(2)} <span className='saving-percent'>({percent.toFixed(0)}%)</span>
                          </>
                        ) : '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="pricing-note">
                <p><FaLightbulb style={{ display: 'inline', marginRight: '5px', color: '#fbbf24' }} /> <strong>Note:</strong> Chaque événement commence avec 3 invitations gratuites. La tarification s'applique aux invitations supplémentaires.</p>
              </div>
            </div>
          </div>
          
          {/* Contenu étendu sur la monétisation */}
          <div className="extended-content">
            <h3>Stratégie de Monétisation Avancée</h3>
            {extendedContent.slice(5, 10).map((paragraph, index) => (
              <p key={index} className="extended-paragraph">
                {paragraph}
              </p>
            ))}
            
            <div className="revenue-streams">
              <h4>Sources de Revenus Multiples</h4>
              <div className="streams-grid">
                <div className="stream-card">
                  <h5><FaMoneyBillWave style={{ display: 'inline', marginRight: '5px' }} /> Invitations Premium</h5>
                  <p>Tarification par volume avec dégressivité</p>
                  <span className="stream-percentage">70% des revenus</span>
                </div>
                <div className="stream-card">
                  <h5><FaPalette style={{ display: 'inline', marginRight: '5px' }} /> Templates Premium</h5>
                  <p>Designs exclusifs pour événements spéciaux</p>
                  <span className="stream-percentage">15% des revenus</span>
                </div>
                <div className="stream-card">
                  <h5><FaChartBar style={{ display: 'inline', marginRight: '5px' }} /> Fonctionnalités Avancées</h5>
                  <p>Analytics, intégrations API, support prioritaire</p>
                  <span className="stream-percentage">10% des revenus</span>
                </div>
                <div className="stream-card">
                  <h5><FaHandshake style={{ display: 'inline', marginRight: '5px' }} /> Partenariats</h5>
                  <p>Commissions sur services partenaires</p>
                  <span className="stream-percentage">5% des revenus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Roadmap */}
      <section id="roadmap" className="section roadmap-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Feuille de <span className="highlight">Route</span></h2>
            <p className="section-subtitle">
              Plan de développement et d'expansion
            </p>
          </div>
          
          <div className="roadmap-timeline">
            <div className="timeline-item completed">
              <div className="timeline-date">Sept 2025</div>
              <div className="timeline-content">
                <h4><FaCheckCircle style={{ display: 'inline', marginRight: '5px', color: 'green' }} /> Développement Initial</h4>
                <p>Architecture de base et fonctionnalités principales</p>
              </div>
            </div>

            <div className="timeline-item future">
              <div className="timeline-date">Oct 2024</div>
              <div className="timeline-content">
                <h4><FaCheckCircle style={{ display: 'inline', marginRight: '5px', color: 'green' }}/>Exploitation et Développement plus profonde</h4>
                <p>Programmation et Développement des fonctions plus complexes et internes</p>
              </div>
            </div>
        
            <div className="timeline-item future">
              <div className="timeline-date">Q2 2024</div>
              <div className="timeline-content">
                <h4><FaCheckCircle style={{ display: 'inline', marginRight: '5px', color: 'green' }} /> Finalisation et Corrections</h4>
                <p>Finalisation des Fonctions Principaux et Corrections de bugs ignorés</p>
              </div>
            </div>
            
            <div className="timeline-item completed">
              <div className="timeline-date">Dec 2025</div>
              <div className="timeline-content">
                <h4><FaCheckCircle style={{ display: 'inline', marginRight: '5px', color: 'green' }} /> Tests Beta</h4>
                <p>Validation avec 50+ utilisateurs et améliorations</p>
              </div>
            </div>
            
            <div className="timeline-item current">
              <div className="timeline-date">Dec 2025</div>
              <div className="timeline-content">
                <h4><FaCheckCircle style={{ display: 'inline', marginRight: '5px', color: 'green' }} /> Integration de Méthodes de Paiement</h4>
                <p>Ajout des méthodes de paiement Iternationale (PayPal)</p>
              </div>
            </div>
                                    
            <div className="timeline-item future">
              <div className="timeline-date">2026</div>
              <div className="timeline-content">
                <h4><FaCircle style={{ display: 'inline', marginRight: '5px', color: 'orange' }} /> Recherche des Sponsors ou des Clients</h4>
                <p>En cours...</p>
              </div>
            </div>
          </div>
          
          {/* Contenu étendu sur la roadmap */}
          <div className="extended-content">
            <h3>Objectifs Stratégiques</h3>
            {extendedContent.slice(15, 20).map((paragraph, index) => (
              <p key={index} className="extended-paragraph">
                {paragraph}
              </p>
            ))}
            
            <div className="milestones">
              <h4>Jalons Clés à Atteindre</h4>
              <div className="milestone-list">
                <div className="milestone">
                  <span className="milestone-number">1</span>
                  <div className="milestone-content">
                    <h5>10,000 utilisateurs actifs</h5>
                    <p>Dans les 12 mois suivant le lancement</p>
                  </div>
                </div>
                <div className="milestone">
                  <span className="milestone-number">2</span>
                  <div className="milestone-content">
                    <h5>Chiffre d'affaires de $500,000</h5>
                    <p>Première année d'exploitation commerciale</p>
                  </div>
                </div>
                <div className="milestone">
                  <span className="milestone-number">3</span>
                  <div className="milestone-content">
                    <h5>Expansion dans 5 pays</h5>
                    <p>Afrique francophone et anglophone</p>
                  </div>
                </div>
                <div className="milestone">
                  <span className="milestone-number">4</span>
                  <div className="milestone-content">
                    <h5>Équipe de 15 personnes</h5>
                    <p>Développement, commercial et support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Investissement */}
      <section id="investment" className="section investment-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Opportunité <span className="highlight">d'Investissement</span></h2>
            <p className="section-subtitle">
              Participez à la révolution des invitations virtuelles sécurisées
            </p>
          </div>
          
          <div className="investment-options">
            <div className="option-card">
              <div className="option-header">
                <span className="option-icon"><FaHandshake /></span>
                <h3>Sponsorisation Stratégique</h3>
              </div>
              <div className="option-content">
                <ul className="option-benefits">
                  <li>Investissement: A Vérifier</li>
                  <li>Équité: 50|50</li>
                  <li>Rôle actif dans la direction</li>
                  <li>Partage des revenus</li>
                  <li>Accès à la technologie propriétaire</li>
                </ul>
                <div className="option-footer">
                  <span className="option-tag">Recommandé</span>
                  <button 
                    className="btn-primary"
                    onClick={() => scrollToSection('contact')}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
            
            <div className="option-card">
              <div className="option-header">
                <span className="option-icon"><FaMoneyBillWave /></span>
                <h3>Achat</h3>
              </div>
              <div className="option-content">
                <ul className="option-benefits">
                  <li>Investissement: A Discuter</li>
                  <li>Équité: 99%</li>
                  <li>Transfert complet de la technologie</li>
                  <li>Droit de veto sur les décisions clés</li>
                  <li>Maximisation des Intérêts</li>
                </ul>
                <div className="option-footer">
                  {/* <span className="option-tag">Opportunité Limitée</span> */}
                  <button 
                    className="btn-primary"
                    onClick={() => scrollToSection('contact')}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
            
            <div className="option-card">
              <div className="option-header">
                <span className="option-icon"><FaBuilding /></span>
                <h3>Sponsoring institutionnel</h3>
              </div>
              <div className="option-content">
                <ul className="option-benefits">
                  <li>Offre: $5,000+</li>
                  <li>Compromis avant Lancement</li>
                  <li>Marketing Direct sur Site et sur NewsLetter</li>
                  <li>Equité à vérifier</li>
                  <li>Accès aux Fonctions Financiers</li>
                </ul>
                <div className="option-footer">
                  {/* <span className="option-tag">Offre Exclusive</span> */}
                  <button 
                    className="btn-primary"
                    onClick={() => scrollToSection('contact')}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="investment-details">
            <h3>Détails de l'Investissement</h3>
            <div className="details-grid">
              <div className="detail-item">
                <h4><FaBriefcase style={{ display: 'inline', marginRight: '5px', color:'khaki' }} /> Structure</h4>
                <p>Société à responsabilité limitée, prête pour l'investissement</p>
              </div>
              <div className="detail-item">
                <h4><FaChartBar style={{ display: 'inline', marginRight: '5px', color:'green' }} /> Évaluation</h4>
                <p>Évaluation pré-money: $1,000 - $1,000,000 selon l'option</p>
              </div>
              <div className="detail-item">
                <h4><FaBullseye style={{ display: 'inline', marginRight: '5px', color:'red' }} /> Utilisation des Fonds</h4>
                <p>30% développement, 60% marketing, 10% opérations</p>
              </div>
              <div className="detail-item">
                <h4><FaChartLine style={{ display: 'inline', marginRight: '5px', color:'blue' }} /> Projections</h4>
                <p>Dans les 1-3 ans</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="section contact-section" ref={contactRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>Contactez-<span className="highlight">Moi</span></h2>
            <p className="section-subtitle">
              Discutons de partenariat, d'investissement ou d'acquisition
            </p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Mes Coordonnées</h3>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon" style={{backgroundColor:'green'}}><FaWhatsapp  /></div>
                  <div className="method-content">
                    <h4>WhatsApp</h4>
                    <a 
                      href={`https://wa.me/${contactInfo.whatsapp.replace('+', '')}?text=Bonjour%20Je%20viens%20Sponsoriser%20ou%20Acheter%20Numeric-Paper`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon"><FaPhone /></div>
                  <div className="method-content">
                    <h4>Téléphones</h4>
                    {contactInfo.phoneNumbers.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`}
                        className="contact-link"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon" style={{backgroundColor:'orange'}}><FaEnvelope /></div>
                  <div className="method-content">
                    <h4>Emails</h4>
                    {contactInfo.emails.map((email, index) => (
                      <a 
                        key={index}
                        href={`mailto:${email}`}
                        className="contact-link"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon"><FaGlobe /></div>
                  <div className="method-content">
                    <h4>Site Web</h4>
                    <a 
                      href="https://numeric-paper.com"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      Accueil
                    </a>
                    <a 
                      href="https://numeric-paper.com/register"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      S'inscrire
                    </a>
                    <a 
                      href="https://numeric-paper.com/about"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      À propos
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="social-media-placeholder">
                <h4>Réseaux Sociaux</h4>
                <div className="social-icons-placeholder">
                  {/* Espaces pour les réseaux sociaux */}
                  <a href='https://linkedin.com/company/numeric-paper' target='_blank' className="contact-link">LinkedIn</a>
                  <a href='https://www.facebook.com/share/1C1MACYWdK/?mibextid=wwXIfr' target='_blank' className="contact-link">FaceBook</a>
                  <a href='https://chat.whatsapp.com/IlJ6nzKm8MaLWH0zmx4PDX' target='_blank' className="contact-link">WhatsApp</a>
                  <a href='https://instagram.com/gentil.lenoir' target='_blank' className="contact-link">Instagram</a>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h3>Envoyez un Message Direct</h3>
              
              <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nom Complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+XXX XXX XXX XXX"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="interest">Intérêt Principal *</label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="investor">Investisseur</option>
                      <option value="partner">Partenaire Stratégique</option>
                      <option value="buyer">Acheteur Potentiel</option>
                      <option value="client">Client Potentiel</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre intérêt pour Numeric-Paper, votre proposition, ou posez vos questions..."
                      rows={6}
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary btn-submit">
                    Envoyer le Message
                  </button>
                  
                  <p className="form-note">
                    Je m'engage à répondre à tous les messages dans les 24 heures.
                  </p>
                </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


// Styles CSS (une partie intégrée pour économiser de l'espace)
const HomeStyles = `
  .numeric-paper-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  /* Les styles complets sont dans le fichier CSS séparé */
`;

export default Home;