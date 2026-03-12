import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Home.css';
import Header from '../Components/Header';
import { 
  FaLock, FaCalendarAlt, FaMoneyBillWave, FaPalette, FaChartBar, FaGlobe, 
  FaRocket, FaBullseye, FaLightbulb, FaChartLine, FaCheck, FaSync, 
  FaHandshake, FaBuilding, FaPhone, FaEnvelope, FaWhatsapp, FaCircle,
  FaUserTie, FaPercent, FaCrown, FaExternalLinkAlt, FaLinkedin, FaFacebook,
  FaArrowRight, FaPlay, FaAward, FaUsers, FaShieldAlt, FaClock, FaCheckCircle,
  FaArrowUp, FaChartPie, FaQrcode, FaTicketAlt, FaBolt, FaStar, FaPaperPlane,
  FaTwitter, FaPinterest
} from 'react-icons/fa';

// Types et interfaces
interface ContactInfo {
  whatsapp: string[];
  phoneNumbers: string[];
  emails: string[];
  portfolioUrl: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  iconColor: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'future';
}

// Données du projet
const projectData = {
  name: "Azenium",
  company: "Azenium",
  tagline: "La révolution des invitations virtuelles sécurisées",
  description: "Plateforme de création d'événements, d'invitations virtuelles, de cartes digitales et de tickets d'entrée sécurisés utilisant la technologie QR Code avancée.",
  fullName: "GENTIL LE NOIR MALIYAMUNGU BALEGAMIRE",
};

// Données de contact
const contactInfo: ContactInfo = {
  whatsapp: ["+243978089552"],
  phoneNumbers: ["+250729606087", "+243978089552"],
  emails: ["azenium@outlook.com", "gentillenoir075@outlook.com"],
  portfolioUrl: "https://gentil-lenoir.vercel.app/portfolio",
};

// Fonctionnalités principales
const features: Feature[] = [
  {
    id: 1,
    title: "Invitations Sécurisées",
    description: "QR Codes uniques et cryptés impossibles à falsifier",
    icon: <FaShieldAlt />,
    details: [
      "Cryptage avancé de bout en bout",
      "QR Codes à usage unique",
      "Détection de duplication en temps réel",
      "Expiration automatique",
      "Traçabilité complète des accès"
    ],
    iconColor: 'blue',
  },
  {
    id: 2,
    title: "Gestion d'Événements",
    description: "Outils professionnels pour organiser tout type d'événement",
    icon: <FaCalendarAlt />,
    details: [
      "Création en quelques minutes",
      "Gestion RSVP automatisée",
      "Planification de séances multiples",
      "Intégration calendriers externes",
      "Notifications push & email"
    ],
    iconColor: 'purple',
  },
  {
    id: 3,
    title: "Monétisation Intelligente",
    description: "Modèle économique flexible avec tarification dégressive",
    icon: <FaMoneyBillWave />,
    details: [
      "3 invitations gratuites",
      "Prix dès 0.29$/invité",
      "Paiements sécurisés multi-devises",
      "Facturation automatique",
      "Rapports financiers détaillés"
    ],
    iconColor: 'green',
  },
  {
    id: 4,
    title: "Design Personnalisé",
    description: "Templates premium et éditeur visuel intuitif",
    icon: <FaPalette />,
    details: [
      "100+ templates professionnels",
      "Éditeur drag-and-drop",
      "Prévisualisation temps réel",
      "Mode hors-ligne",
      "Export PDF haute qualité"
    ],
    iconColor: 'orange',
  },
  {
    id: 5,
    title: "Analytiques Avancées",
    description: "Suivez les performances avec des données en temps réel",
    icon: <FaChartBar />,
    details: [
      "Taux d'ouverture en direct",
      "Heatmaps de participation",
      "Prévisions IA",
      "Tableaux de bord personnalisés",
      "Export Excel/CSV"
    ],
    iconColor: 'pink',
  },
  {
    id: 6,
    title: "Support Multilingue",
    description: "Interface disponible en français, anglais et swahili",
    icon: <FaGlobe />,
    details: [
      "FR, EN, SW supportés",
      "Traduction automatique",
      "Support client 24/7",
      "Documentation complète",
      "Formation vidéo"
    ],
    iconColor: 'purple',
  }
];

// Timeline items
const timelineItems: TimelineItem[] = [
  {
    id: 1,
    date: "Sept 2025",
    title: "Développement Initial",
    description: "Architecture de base et fonctionnalités principales",
    status: 'completed'
  },
  {
    id: 2,
    date: "Déc 2025",
    title: "Tests Beta",
    description: "Validation avec 50+ utilisateurs réels",
    status: 'completed'
  },
  {
    id: 3,
    date: "Déc 2025",
    title: "Intégration Paiements",
    description: "PayPal & Flutterwave pour l'Afrique",
    status: 'current'
  },
  {
    id: 4,
    date: "Jan 2026",
    title: "Lancement Officiel",
    description: "Mise en production complète",
    status: 'future'
  },
  {
    id: 5,
    date: "2026",
    title: "Expansion Internationale",
    description: "5 nouveaux pays africains",
    status: 'future'
  }
];

// Composant principal
const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'investor'
  });
  
  // Theme state
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('azenium-theme');
    return savedTheme || 'dark';
  });

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // GTranslate Script Injection
  useEffect(() => {
    (window as any).gtranslateSettings = {
      "default_language": "fr",
      "detect_browser_language": true,
      "wrapper_selector": ".gtranslate_wrapper",
      "languages": ["fr", "en", "es", "ar"],
      "flag_style": "3d"
    };

    if (!document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"]')) {
      const script = document.createElement('script');
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Theme change effect
  useEffect(() => {
    localStorage.setItem('azenium-theme', selectedTheme);
    document.body.className = selectedTheme === 'light' ? 'light-theme' : 'dark-theme';
  }, [selectedTheme]);

  // Scroll handler for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'project', 'features', 'roadmap', 'investment', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    
    const message = `🌟 NOUVELLE DEMANDE DE PARTENARIAT AZENIUM 🌟

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phone || 'Non renseigné'}
🎯 Intérêt: ${getInterestLabel(formData.interest)}

💬 Message:
${formData.message}`;

    const whatsappNumber = contactInfo.whatsapp[0].replace('+', '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: 'investor'
    });
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

  return (
    <div className="azenium-container">
      {/* Navigation */}
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
        selectedTheme={selectedTheme}
      />

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
            <option value="dark">🌙 Dark</option>
            <option value="light">☀️ Light</option>
          </select>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="hero-section" ref={heroRef}>
        {/* Background Effects */}
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-float hero-float-1"></div>
          <div className="hero-float hero-float-2"></div>
        </div>
        
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon"></span>
            <span><FaRocket style={{ marginRight: '6px' }} /> Innovation Technologique</span>
          </div>
          
          {/* Title */}
          <h1 className="hero-title">
            <img 
              src="/img/azeni_um_logo_transparent.png" 
              alt="Logo Azenium" 
              title="Logo Azenium" 
              height="70px" 
              style={{ marginBottom: '1rem' }}
            />
            <br />
            Recherchons un <span className="highlight">Partenaire Stratégique</span>
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle">
            {projectData.tagline} — Solution complète d'invitations virtuelles sécurisées avec QR Codes.
            <br />
            Si vous êtes intéressé par un partenariat ou un investissement, contactez-nous !
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => scrollToSection('investment')}
            >
              <FaHandshake style={{ marginRight: '8px' }} />
              Investir Maintenant
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => scrollToSection('features')}
            >
              <FaPlay style={{ marginRight: '8px' }} />
              Découvrir
            </button>
            <Link to="/promo-agent/application" className="btn btn-gradient btn-large">
              <FaUserTie style={{ marginRight: '8px' }} />
              Devenir Agent Promo
            </Link>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Sécurisé</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">0%</div>
              <div className="hero-stat-label">Fraude Possible</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">70%</div>
              <div className="hero-stat-label">Économie</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">24/7</div>
              <div className="hero-stat-label">Support</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-scroll">
          <span>Découvrir</span>
          <div className="hero-scroll-line"></div>
        </div>
      </section>

      {/* ==================== PROJECT SECTION ==================== */}
      <section id="project" className="section project-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">À Propos</span>
            <h2 className="section-title">
              Le Projet <span className="highlight">Azenium</span>
            </h2>
            <p className="section-subtitle">
              Une solution innovante pour la gestion d'événements et d'invitations numériques sécurisées
            </p>
          </div>
          
          <div className="project-grid">
            {/* Description Card */}
            <div className="project-card">
              <h3 className="project-card-title">
                <span className="icon"><FaQrcode /></span>
                Qu'est-ce que Azenium ?
              </h3>
              <p>
                <strong>Azenium</strong> est une plateforme innovatorice permettant la création d'événements 
                virtuels et hybrides avec des invitations digitales sécurisées utilisant la technologie QR Code avancée. 
                Contrairement aux solutions traditionnelles, nos invitations sont <strong>impossibles à copier ou falsifier</strong>, 
                offrant un niveau de sécurité inégalé.
              </p>
              
              <div className="project-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon blue"><FaBullseye /></div>
                  <div className="highlight-content">
                    <h4>Cible du marché</h4>
                    <p>Tous organisateurs d'événements : mariages, anniversaires, conférences, lancements produits</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon purple"><FaLightbulb /></div>
                  <div className="highlight-content">
                    <h4>Innovation clé</h4>
                    <p>QR Codes uniques avec système de détection de duplication en temps réel</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon green"><FaChartLine /></div>
                  <div className="highlight-content">
                    <h4>Potentiel de marché</h4>
                    <p>Marché des événements virtuels en croissance de 400% depuis 2020</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Card */}
            <div className="status-card">
              <div className="status-header">
                <span className="status-badge completed"><FaCheck /></span>
                <h4>État du Projet</h4>
              </div>
              
              <ul className="status-list">
                <li><FaCheck /> Plateforme backend sécurisée</li>
                <li><FaCheck /> Interface administrateur complète</li>
                <li><FaCheck /> Système de génération de QR Codes</li>
                <li><FaCheck /> Module de paiement intégré</li>
                <li><FaCheck /> Tests de sécurité validés</li>
                <li><FaCheck /> Tests beta avec 50+ utilisateurs</li>
              </ul>
              
              <div className="status-header" style={{ marginTop: '1.5rem' }}>
                <span className="status-badge in-progress"><FaSync /></span>
                <h4>Recherche de Partenaires</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Nous recherchons activement des investisseurs ou partenaires pour accélérer le déploiement.
              </p>
              
              <div className="investment-box">
                <h4>Investissement Recherché</h4>
                <div className="investment-amount">À Discuter</div>
                <p className="investment-note">Pourcentage selon notre discussion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="section features-section" ref={featuresRef}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Fonctionnalités</span>
            <h2 className="section-title">
              Pourquoi Choisir <span className="highlight">Azenium</span> ?
            </h2>
            <p className="section-subtitle">
              Des fonctionnalités avancées pour des événements sécurisés et mémorables
            </p>
          </div>
          
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className={`feature-icon ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <ul className="feature-list">
                  {feature.details.map((detail, index) => (
                    <li key={index}>
                      <FaCheck /> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Extended Content */}
          <div style={{ 
            marginTop: '4rem', 
            padding: '2.5rem', 
            background: 'var(--bg-card)', 
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <FaBolt style={{ color: 'var(--primary-500)', marginRight: '0.5rem' }} />
              Technologie de Pointe
            </h3>
            <p style={{ textAlign: 'justify', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <strong>Azenium</strong> représente une innovation majeure dans le domaine de la gestion d'événements. 
              Notre plateforme combine <strong>sécurité avancée</strong>, <strong>facilité d'utilisation</strong> et 
              <strong> design moderne</strong> pour offrir une expérience unique. L'équipe possède une expertise 
              approfondie en cryptographie et développement d'applications sécurisées. Nous avons développé un 
              algorithme propriétaire de génération de QR Codes qui rend toute falsification impossible.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              marginTop: '1.5rem'
            }}>
              {['Laravel', 'TypeScript', 'Node.js', 'MySQL', 'React.js', 'React Native'].map(tech => (
                <span key={tech} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  color: 'var(--primary-500)'
                }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ROADMAP SECTION ==================== */}
      <section id="roadmap" className="section roadmap-section" ref={roadmapRef}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Feuille de Route</span>
            <h2 className="section-title">
              Notre <span className="highlight">Parcours</span>
            </h2>
            <p className="section-subtitle">
              Plan de développement et d'expansion internationale
            </p>
          </div>
          
          <div className="roadmap-timeline">
            {timelineItems.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className={`timeline-marker ${item.status}`}>
                  {item.status === 'completed' && <FaCheckCircle size={12} />}
                  {item.status === 'current' && <FaClock size={12} />}
                  {item.status === 'future' && <FaCircle size={10} />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{item.date}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INVESTMENT SECTION ==================== */}
      <section id="investment" className="section investment-section" ref={investmentRef}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Opportunité</span>
            <h2 className="section-title">
              Investir dans <span className="highlight">Azenium</span>
            </h2>
            <p className="section-subtitle">
              Participez à la révolution des invitations virtuelles sécurisées
            </p>
          </div>
          
          <div className="investment-grid">
            {/* Strategic Partnership */}
            <div className="investment-card featured">
              <div className="investment-icon">
                <FaHandshake />
              </div>
              <h3 className="investment-title">Partenariat Stratégique</h3>
              <ul className="investment-benefits">
                <li><FaCheck /> Investissement: À vérifier</li>
                <li><FaCheck /> Équité: À définir après discussion</li>
                <li><FaCheck /> Rôle actif dans la direction</li>
                <li><FaCheck /> Partage des revenus</li>
                <li><FaCheck /> Accès à la technologie propriétaire</li>
              </ul>
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
                style={{ width: '100%' }}
              >
                En Savoir Plus <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
            
            {/* Short-term Partnership */}
            <div className="investment-card">
              <div className="investment-icon">
                <FaChartPie />
              </div>
              <h3 className="investment-title">Partenariat Court-terme</h3>
              <ul className="investment-benefits">
                <li><FaCheck /> Durée: 6 mois à 1 an</li>
                <li><FaCheck /> Investissement: À discuter</li>
                <li><FaCheck /> Équité: Inférieure à 30%</li>
                <li><FaCheck /> Pas de droit de veto</li>
                <li><FaCheck /> Maximisation des intérêts</li>
              </ul>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
                style={{ width: '100%' }}
              >
                Contacter <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
            
            {/* Sponsorship */}
            <div className="investment-card">
              <div className="investment-icon">
                <FaBuilding />
              </div>
              <h3 className="investment-title">Sponsoring</h3>
              <ul className="investment-benefits">
                <li><FaCheck /> Offre: $2,000+</li>
                <li><FaCheck /> Visibility: Site & Newsletter</li>
                <li><FaCheck /> Marketing direct</li>
                <li><FaCheck /> Équité à vérifier</li>
                <li><FaCheck /> Accès aux fonctions VIP</li>
              </ul>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
                style={{ width: '100%' }}
              >
                Proposer <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
          
          {/* Promo Agent CTA */}
          <div className="promo-cta">
            <div className="promo-cta-icon">
              <FaUserTie />
            </div>
            <div className="promo-cta-content">
              <h3 className="promo-cta-title">
                <FaPercent style={{ marginRight: '8px', color: 'var(--secondary-500)' }} />
                Gagnez jusqu'à 20% de commission !
              </h3>
              <p className="promo-cta-description">
                Rejoignez notre programme d'affiliation et gagnez des commissions sur chaque événement référé.
              </p>
            </div>
            <Link to="/promo-agent" className="promo-cta-button">
              Découvrir le Programme
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="section contact-section" ref={contactRef}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Contact</span>
            <h2 className="section-title">
             Contactez-<span className="highlight">Nous</span>
            </h2>
            <p className="section-subtitle">
              Discutons de partenariat, d'investissement ou d'acquisition
            </p>
          </div>
          
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info-card">
              <h3 className="contact-info-title">Nos Coordonnées</h3>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon whatsapp">
                    <FaWhatsapp />
                  </div>
                  <div className="contact-method-content">
                    <h4>WhatsApp</h4>
                    {contactInfo.whatsapp.map((number, index) => (
                      <a 
                        key={index}
                        href={`https://wa.me/${number.replace('+', '')}?text=Bonjour%20Je%20viens%20de%20voir%20Azenium`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {number}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon phone">
                    <FaPhone />
                  </div>
                  <div className="contact-method-content">
                    <h4>Téléphones</h4>
                    {contactInfo.phoneNumbers.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone}`}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon email">
                    <FaEnvelope />
                  </div>
                  <div className="contact-method-content">
                    <h4>Emails</h4>
                    {contactInfo.emails.map((email, index) => (
                      <a 
                        key={index}
                        href={`mailto:${email}`}
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon globe">
                    <FaGlobe />
                  </div>
                  <div className="contact-method-content">
                    <h4>Site Web</h4>
                    <a href="https://azenium.com" target="_blank" rel="noopener noreferrer">Accueil</a>
                    <a href="https://azenium.com/register" target="_blank" rel="noopener noreferrer">S'inscrire</a>
                    <a href="https://azenium.com/about" target="_blank" rel="noopener noreferrer">À propos</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-social">
                <h4 className="contact-social-title">Réseaux Sociaux</h4>
                <div className="social-links">
                  <a href="https://linkedin.com/company/azenium" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.facebook.com/azenium.platform" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaFacebook />
                  </a>
                  <a href="https://chat.whatsapp.com/HXge11ByhzC4yrbhlExW6D" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaWhatsapp />
                  </a>
                  <a href="https://x.com/azeniumplatform" target="_blank" rel="noopener noreferrer" className='social-link'>
                    <FaTwitter />
                  </a>
                  <a href="https://pin.it/1t2XCbLLK" target="_blank" rel="noopener noreferrer" className='social-link'>
                    <FaPinterest />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-card">
              <h3 className="contact-form-title">Envoyez un Message</h3>
              
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
                    placeholder="Décrivez votre intérêt pour Azenium..."
                    rows={5}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary form-submit">
                  <FaPaperPlane style={{ marginRight: '8px' }} />
                  Envoyer le Message
                </button>
                
                <p className="form-note">
                  Je m'engage à répondre dans les 24 heures.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="azenium-footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/img/azeni_um_logo_transparent.png" height="35px" alt="Azenium" />
              </div>
              <p className="footer-description">
                Plateforme d'invitations virtuelles sécurisées avec technologie QR Code avancée.
                La solution parfaite pour vos événements.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="footer-title">Liens Rapides</h4>
              <ul className="footer-links">
                <li><a href="https://azenium.com/create" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Créer un événement
                </a></li><br />
                <li><a href="https://azenium.com/events" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Mes événements
                </a></li>
                <li><a href="https://azenium.com/about" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> À propos
                </a></li>
                <li><a href="https://azenium.com/support" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Support
                </a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="footer-title">Légal</h4>
              <ul className="footer-links">
                <li><a href="https://azenium.com/privacy" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Politique de confidentialité
                </a></li>
                <li><a href="https://azenium.com/legal" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Mentions légales
                </a></li>
                <li><a href="https://azenium.com/terms" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt style={{ marginRight: '8px' }} /> Conditions d'utilisation
                </a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="footer-title">Contactez-nous</h4>
              <div className="footer-contact-item">
                <FaEnvelope />
                <a href="mailto:azenium@outlook.com">azenium@outlook.com</a>
              </div>
              <div className="footer-contact-item">
                <FaWhatsapp />
                <a href="https://wa.me/243978089552?text=Bonjour" target="_blank" rel="noopener noreferrer">
                  +243 978 089 552
                </a>
              </div>
              <a href="https://azenium.com" target="_blank" rel="noopener noreferrer" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}>
                <FaGlobe /> Visiter azenium.com
              </a>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 <strong>Azenium</strong>. Tous droits réservés.
            </p>
            <p className="footer-powered">
              Propulsé par <a href="https://azenium.com">Azenium <FaCrown style={{ fontSize: '0.8em' }} /></a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
