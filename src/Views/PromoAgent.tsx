import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Home.css';
import '../Css/PromoAgent.css';
import { 
  FaStar, FaHandshake, FaMoneyBillWave, FaUserTie, FaCheckCircle, 
  FaPaperPlane, FaTrophy, FaChartLine, FaGift, FaCrown, FaShieldAlt,
  FaUsers, FaRocket, FaPercent, FaMedal, FaAward, FaLightbulb,
  FaRegClock, FaChartBar, FaCoins, FaGlobe, FaArrowRight, FaHome,
  FaEnvelope, FaPhone, FaWhatsapp, FaExternalLinkAlt
} from 'react-icons/fa';
import Header from '../Components/Header';

const PromoAgent: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('numeric-paper-theme');
    return savedTheme || 'dark';
  });

  // Navigation items spécifiques pour la page PromoAgent
  const promoNavItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'advantages', label: 'Avantages' },
    { id: 'program', label: 'Programme' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'apply', label: 'Postuler' },
  ];

  // Fonction pour naviguer vers Home
  const goToHome = () => {
    window.location.href = '/';
  };

  // GTranslate Script Injection
  useEffect(() => {
    (window as any).gtranslateSettings = {
      "default_language": "fr",
      "detect_browser_language": true,
      "wrapper_selector": ".gtranslate_wrapper",
      "languages": ["fr", "en", "rw", "sw", "ar", "zh", "es", "pt"],
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
    localStorage.setItem('numeric-paper-theme', selectedTheme);
    document.body.className = selectedTheme === 'light' ? 'light-theme' : 'dark-theme';
  }, [selectedTheme]);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
  };

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
    <div className="promo-agent-container">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
        selectedTheme={selectedTheme}
        navItems={promoNavItems}
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

      {/* Section Hero */}
      <section id="hero" className="promo-hero-section">
        <div className="promo-hero-background">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
          <div className="gradient-overlay-promo"></div>
        </div>
        
        <div className="promo-hero-content">
          <div className="promo-hero-badge animate-pulse">
            <FaUserTie className="badge-icon" />
            <span>Recrutement Agents VIP</span>
          </div>
          
          <h1 style={{fontSize:'4rem'}}>
            <span className="gradient-text">Devenez Ambassadeur</span>
            <br />
            <span className="highlight-glow" translate='no'>Numeric-Paper</span>
          </h1>
          
          <p className="promo-hero-subtitle">
            Transformez votre réseau en revenus. Rejoignez le programme d'affiliation le plus lucratif
            <br />
            dans l'événementiel digital et gagnez jusqu'à <span className="earning-highlight">20% de commission</span>.
          </p>

          <div className="promo-hero-stats">
            <div className="stat-card">
              <FaCoins className="stat-icon" />
              <div className="stat-content">
                <h3>500+</h3>
                <p>Commissions Payées</p>
              </div>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <h3>150+</h3>
                <p>Agents Actifs</p>
              </div>
            </div>
            <div className="stat-card">
              <FaGlobe className="stat-icon" />
              <div className="stat-content">
                <h3>15+</h3>
                <p>Pays</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section id="advantages" className="promo-section advantages-section">
        <div className="section-container">
          <div className="section-header-promo">
            <h2>
              <FaAward className="header-icon" />
              <span>Pourquoi </span>
              <span className="highlight">Nous Rejoindre</span>
            </h2>
            <p className="section-subtitle-promo">
              Des avantages exclusifs pour nos ambassadeurs
            </p>
            <Link to="/promo-agent/application" className="btn-apply-now">
              Appliquez/Postulez Maintenant
              <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
          </div>

          <div className="advantages-grid">
            <div className="advantage-card glow-card">
              <div className="advantage-icon-wrapper">
                <FaShieldAlt className="advantage-icon" />
              </div>
              <h3 className="advantage-title">Support Permanent</h3>
              <p className="advantage-description">
                Équipe dédiée 24/7 pour vous accompagner, outils marketing exclusifs et formations régulières.
              </p>
              <div className="advantage-tag">VIP</div>
            </div>

            <div className="advantage-card glow-card">
              <div className="advantage-icon-wrapper">
                <FaMoneyBillWave className="advantage-icon" />
              </div>
              <h3 className="advantage-title">Paiements Instantanés</h3>
              <p className="advantage-description">
                Recevez vos commissions en moins de 24h via Mobile Money, PayPal ou virement bancaire.
              </p>
              <div className="advantage-tag">RAPIDE</div>
            </div>

            <div className="advantage-card glow-card">
              <div className="advantage-icon-wrapper">
                <FaChartBar className="advantage-icon" />
              </div>
              <h3 className="advantage-title">Tableau de Bord</h3>
              <p className="advantage-description">
                Suivi en temps réel de vos performances, statistiques détaillées et prévisions de gains.
              </p>
              <div className="advantage-tag">PRO</div>
            </div>

            <div className="advantage-card glow-card">
              <div className="advantage-icon-wrapper">
                <FaGift className="advantage-icon" />
              </div>
              <h3 className="advantage-title">Bonus Mensuels</h3>
              <p className="advantage-description">
                Récompenses supplémentaires, cadeaux et voyages pour les meilleurs performeurs.
              </p>
              <div className="advantage-tag">EXCLUSIF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme d'Affiliation */}
      <section id="program" className="promo-section program-section">
        {/* <div className="section-container"> */}
          <div className="section-header-promo">
            <h2>
              <FaTrophy className="header-icon" />
              <span>Programme </span>
              <span className="highlight">5 Étoiles</span>
            </h2>
            <p className="section-subtitle-promo">
              Évoluez et maximisez vos revenus avec notre système de progression
            </p>
          </div>

          <div className="star-progression">
            {[1, 2, 3, 4, 5].map((stars) => (
              <div key={stars} className="star-level">
                <div className="star-level-header">
                  <div className="stars-display">
                    {Array(stars).fill(0).map((_, i) => (
                      <FaStar key={i} className="progression-star" />
                    ))}
                  </div>
                  <span className="level-name">
                    Niveau {stars} {stars === 5 && <FaCrown style={{ marginLeft: '5px' }} />}
                  </span>
                </div>
                <div className="level-details">
                  <div className="commission-badge">
                    <FaPercent /> {10 + (stars - 1) * 2.5}%
                  </div>
                  <p className="level-condition">
                    {stars === 1 && "Débutant - Lancez-vous !"}
                    {stars === 2 && "Intermédiaire - En progression"}
                    {stars === 3 && "Confirmé - Expert reconnu"}
                    {stars === 4 && "Premium - Élite"}
                    {stars === 5 && "VIP - Ambassadeur Principal"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Table de commission */}
          <div className="commission-table-container">
            <h3 className="table-title">
              <FaChartLine style={{ marginRight: '10px' }} />
              Grille de Rémunération
            </h3>
            <div className="commission-table">
              <div className="table-header-promo">
                <div className="header-cell-promo">Étoiles</div>
                <div className="header-cell-promo">Commission</div>
                <div className="header-cell-promo">Seuil</div>
                <div className="header-cell-promo">Bonus</div>
              </div>
              
              {[
                { stars: 1, percent: "10%", threshold: "1-2 événements", bonus: "Accès rapide" },
                { stars: 2, percent: "12.5%", threshold: "3-5 événements", bonus: "+2% sur gros deals" },
                { stars: 3, percent: "15%", threshold: "6-8 événements", bonus: "Support prioritaire" },
                { stars: 4, percent: "17.5%", threshold: "9-11 événements", bonus: "Formation avancée" },
                { stars: 5, percent: "20%", threshold: "12+ événements", bonus: "Statut VIP" },
              ].map((level, idx) => (
                <div key={idx} className="table-row-promo hover-effect">
                  <div className="table-cell-promo">
                    <div className="stars-cell">
                      {Array(level.stars).fill(0).map((_, i) => (
                        <FaStar key={i} className="table-star" />
                      ))}
                    </div>
                  </div>
                  <div className="table-cell-promo">
                    <span className="commission-value">{level.percent}</span>
                  </div>
                  <div className="table-cell-promo">
                    <span className="threshold-badge">{level.threshold}</span>
                  </div>
                  <div className="table-cell-promo">
                    <span className="bonus-tag">
                      <FaRocket style={{ marginRight: '5px' }} />
                      {level.bonus}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Accélérateur de Carrière */}
          <div className="bonus-notice">
            <div className="bonus-content" style={{marginTop: '1.5rem'}}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaRocket /> Accélérateur de Carrière</h4>
              <p>
                <strong>Bonus Spécial :</strong> Une affiliation supérieure à 500$ vous fait 
                monter d'un niveau immédiatement !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="testimonials" className="promo-section testimonials-section">
        <div className="section-container" style={{marginTop: '-6rem'}}>
          <div className="section-header-promo">
            <h2>
              <FaUsers className="header-icon" />
              <span>Ils ont </span>
              <span className="highlight">Réussi</span>
            </h2>
            <p className="section-subtitle-promo">
              Découvrez les témoignages de nos ambassadeurs
            </p>
            <Link to="/promo-agent/application" className="btn-join-them">
              Rejoignez-les !
              <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
          </div>

          <div className="testimonials-grid">
            {[
              { name: "Sarah K.", role: "Agent 5 Étoiles", earnings: "$500/mois", testimonial: "En 6 mois, j'ai transformé mon réseau universitaire en revenu stable. Le support est exceptionnel !" },
              { name: "David M.", role: "Agent 4 Étoiles", earnings: "$300/mois", testimonial: "Le système de progression est transparent. Les paiements sont toujours à l'heure." },
              { name: "Lisa T.", role: "Agent 3 Étoiles", earnings: "$150/mois", testimonial: "Parfait pour un complément de revenu. La formation m'a beaucoup aidé à démarrer." },
            ].map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                  <div className="testimonial-earnings">
                    {testimonial.earnings}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.testimonial}"</p>
                <div className="testimonial-rating">
                  {Array(5).fill(0).map((_, i) => (
                    <FaStar key={i} className="testimonial-star" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="form-header-content">
        <h2>
          <FaRegClock className="header-icon" />
          <span>Postulez </span>
          <span className="highlight">Maintenant</span>
        </h2>
        <p className="form-subtitle">
          Rejoignez notre équipe d'élite. Les places sont limitées.
        </p>
        <div className="application-stats">
          <div className="stat-item">
            <FaUserTie />
            <span>moins places restantes</span>
          </div>
          <div className="stat-item">
            <FaChartLine />
            <span>Délai moyen: 7jours</span>
          </div>
        </div>
        <div className="form-home-btn">
          <Link to="/" className="btn-home">
            <FaHome />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
      <div className="form-cta">
        <FaCheckCircle className="cta-icon" />
        <p>
          <strong>Garantie de réponse</strong> sous 72h maximum
        </p>
      </div>

      {/* Footer avec liens vers numeric-paper.com */}
      <footer className="numeric-paper-footer">
        <div className="footer-container">
          <div className="footer-main">
            {/* Logo et description */}
            <div className="footer-brand">
              <p className="footer-description">
                Gagnez jusqu'à 20% de commission en devenant ambassadeur <strong translate='no'>Numeric-Paper</strong>. 
                Transformez votre réseau en revenus récurrents.
              </p>
              <div className="footer-social">
                <a href="https://linkedin.com/company/numeric-paper" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                <a href="https://www.facebook.com/share/1C1MACYWdK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
                <a href="https://chat.whatsapp.com/HXge11ByhzC4yrbhlExW6D" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="footer-links-section">
              <h4>Liens Rapides</h4>
              <ul className="footer-links">
                <li><a href="https://numeric-paper.com/create" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Créer un événement</a></li>
                <li><a href="https://numeric-paper.com/events" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Mes événements</a></li>
                <li><a href="https://numeric-paper.com/about" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> À propos</a></li>
                <li><a href="https://numeric-paper.com/support" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Support</a></li>
              </ul>
            </div>

            {/* Liens légaux */}
            <div className="footer-links-section">
              <h4>Légal</h4>
              <ul className="footer-links">
                <li><a href="https://numeric-paper.com/privacy" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Politique de confidentialité</a></li>
                <li><a href="https://numeric-paper.com/legal" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Mentions légales</a></li>
                <li><a href="https://numeric-paper.com/terms" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Conditions d'utilisation</a></li>
                <li><a href="https://numeric-paper.com/contact" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Nous contacter</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <h4>Contactez-nous</h4>
              <div className="footer-contact-item">
                <FaEnvelope />
                <a href="mailto:numeric-paper@outlook.com">numeric-paper@outlook.com</a>
              </div>
              <div className="footer-contact-item">
                <FaWhatsapp />
                <a href="https://wa.me/250792871952?text=Bonjour%20Je%20viens%20de%20voir%20Numeric-Paper" target="_blank" rel="noopener noreferrer">+250 792 871 952</a>
              </div>
              <a href="https://numeric-paper.com" target="_blank" rel="noopener noreferrer" className="footer-site-link">
                <FaGlobe /> Visitez numeric-paper.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p>&copy; 2026 <span translate="no">Numeric-Paper</span>. Tous droits réservés.</p>
            <p className="footer-powered">
              Propulsé par <a href="https://numeric-paper.com" target="_blank" rel="noopener noreferrer"><span translate="no">Numeric-Paper</span> <FaCrown style={{fontSize:'0.8em'}} /></a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PromoAgent;

