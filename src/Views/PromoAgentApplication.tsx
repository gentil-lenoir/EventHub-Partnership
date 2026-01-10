import React, { useState, useEffect } from 'react';
import CustomHeader from '../Components/CustomHeader';
import '../Css/PromoAgent.css';
import { 
  FaPaperPlane, 
  FaCheckCircle, 
  FaUser, 
  FaEnvelope, 
  FaWhatsapp, 
  FaFlag, 
  FaCity, 
  FaShareAlt,
  FaLightbulb,
  FaShieldAlt,
  FaCrown,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaLinkedin,
  FaRegClock,
  FaUserTie,
  FaChartLine,
  FaHome,
  FaGlobe,
  FaPhone,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  nationality: string;
  city: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  linkedin: string;
  motivation: string;
}

const PromoAgentApplication: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    nationality: '',
    city: '',
    facebook: '',
    tiktok: '',
    instagram: '',
    linkedin: '',
    motivation: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('numeric-paper-theme');
    return savedTheme || 'dark';
  });

  // Theme change effect
  useEffect(() => {
    localStorage.setItem('numeric-paper-theme', selectedTheme);
    document.body.className = selectedTheme === 'light' ? 'light-theme' : 'dark-theme';
  }, [selectedTheme]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 3) {
      nextStep();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {  });

      const headers: any = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const response = await fetch('http://127.0.0.1:8000/admin/promo-agent/application', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Impossible de contacter le serveur. Vérifiez votre connexion.');
    }
  };

  const formContent = (
    <div className="multi-step-form">
      {/* Progress Bar */}
      <div className="form-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(formStep / 3) * 100}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          {['Informations', 'Profil', 'Motivation'].map((step, index) => (
            <div 
              key={index} 
              className={`progress-step ${formStep > index + 1 ? 'completed' : ''} ${formStep === index + 1 ? 'active' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <span className="step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="promo-agent-form">
        {/* Step 1: Personal Information */}
        {formStep === 1 && (
          <div className="form-step">
            <div className="step-header">
              <h3><FaUser/> Informations Personnelles</h3>
              <p>Commencez par nous dire qui vous êtes</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="fullName">
                  <FaUser className="input-icon" />
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Prénom et Nom"
                  className="form-input-promo"
                />
                <div className="input-hint">Comme indiqué sur votre pièce d'identité</div>
              </div>
              
              <div className="form-group-promo">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Email Professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="vous@domain.com"
                  className="form-input-promo"
                />
                <div className="input-hint">Nous enverrons la confirmation ici</div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="whatsapp">
                  <FaWhatsapp className="input-icon" />
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  placeholder="+243 XX XXX XXXX"
                  className="form-input-promo"
                />
                <div className="input-hint">Notre recruteur vous contactera ici</div>
              </div>

              <div className="form-group-promo">
                <label htmlFor="nationality">
                  <FaFlag className="input-icon" />
                  Nationalité *
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Congolaise"
                  className="form-input-promo"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={nextStep}
                className="btn-promo-primary btn-next"
              >
                Suivant
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Social Media */}
        {formStep === 2 && (
          <div className="form-step">
            <div className="step-header">
              <FaCity className="step-icon" />
              <h3>Localisation & Réseaux</h3>
              <p>Où êtes-vous et quel est votre réseau ?</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="city">
                  <FaCity className="input-icon" />
                  Ville de Résidence *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Goma, Kinshasa, etc."
                  className="form-input-promo"
                />
              </div>
            </div>

            {/* Social Media Inputs */}
            <div className="social-media-section">
              <div className="step-header">
                <FaShareAlt className="step-icon" />
                <h3>Vos Réseaux Sociaux</h3>
                <p>Partagez vos comptes pour augmenter vos chances</p>
              </div>

              <div className="social-media-grid">
                <div className="form-group-promo">
                  <label htmlFor="facebook">
                    <FaFacebook className="input-icon" style={{ color: '#1877F2' }} />
                    Facebook
                  </label>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="Nom d'utilisateur ou lien"
                    className="form-input-promo"
                  />
                </div>

                <div className="form-group-promo">
                  <label htmlFor="tiktok">
                    <FaTiktok className="input-icon" style={{ color: '#000000' }} />
                    TikTok
                  </label>
                  <input
                    type="text"
                    id="tiktok"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    placeholder="Nom d'utilisateur ou lien"
                    className="form-input-promo"
                  />
                </div>

                <div className="form-group-promo">
                  <label htmlFor="instagram">
                    <FaInstagram className="input-icon" style={{ color: '#E4405F' }} />
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="Nom d'utilisateur ou lien"
                    className="form-input-promo"
                  />
                </div>

                <div className="form-group-promo">
                  <label htmlFor="linkedin">
                    <FaLinkedin className="input-icon" style={{ color: '#0A66C2' }} />
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="Profil LinkedIn"
                    className="form-input-promo"
                  />
                </div>
              </div>
              
              <div className="input-hint" style={{ marginTop: '0.5rem' }}>
                Ces informations sont optionnelles mais améliorent vos chances d'acceptation
              </div>
            </div>

            <div className="social-tips">
              
              <div className="tips-content">
                <h4><FaLightbulb /> Astuce pour augmenter vos chances</h4>
                <p>
                  Les agents avec un bon réseau social sont souvent acceptés plus rapidement.
                  Partagez vos comptes les plus actifs.
                </p>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn-promo-secondary"
              >
                ← Retour
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                className="btn-promo-primary btn-next"
              >
                Suivant
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Motivation */}
        {formStep === 3 && (
          <div className="form-step">
            <div className="step-header">
              
              <h3><FaLightbulb className="step-icon" /> Votre Motivation</h3>
              <p>Convainquez-nous de votre potentiel</p>
            </div>
            
            <div className="form-group-promo">
              <label htmlFor="motivation">
                Pourquoi voulez-vous devenir Agent <strong translate='no'>Numeric-Paper</strong> ?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                minLength={30}
                placeholder={`Partagez avec nous :
• Votre expérience dans la vente ou le marketing
• Votre réseau et comment vous comptez l'utiliser
• Vos objectifs financiers
• Ce qui vous motive particulièrement chez Numeric-Paper
• Vos idées pour promouvoir nos services`}
                rows={8}
                className="form-textarea-promo"
              />
              <div className="textarea-hint">
                Minimum 30 caractères. Soyez précis et convaincant !
              </div>
            </div>

            {status === 'error' && (
              <div className="form-error">
                <div className="error-icon">⚠️</div>
                <div className="error-message">{errorMessage}</div>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn-promo-secondary"
              >
                ← Retour
              </button>
              <button 
                type="submit" 
                className="btn-promo-primary btn-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma candidature
                    <FaPaperPlane className="submit-icon" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}
      </form>
    </div>
  );

  if (status === 'success') {
    return (
      <div className="promo-agent-container">
        <CustomHeader selectedTheme={selectedTheme} />
        <div className="section-container" style={{ paddingTop: '8rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="form-success-container" style={{ width: '100%', maxWidth: '800px' }}>
            <div className="success-animation">
              <FaCheckCircle className="success-icon" />
              <div className="success-checkmark"></div>
            </div>
            <div className="success-content">
              <h3>🎉 Candidature Envoyée avec Succès !</h3>
              <p className="success-message">
                Félicitations ! Votre profil a été soumis avec succès à notre équipe de recrutement.
              </p>
              <div className="success-details">
                <div className="detail-card">
                  <FaEnvelope className="detail-icon" />
                  <div>
                    <h4>Confirmation Email</h4>
                    <p>Vous recevrez un email de confirmation dans les 24h</p>
                  </div>
                </div>
                <div className="detail-card">
                  <FaWhatsapp className="detail-icon" />
                  <div>
                    <h4>Entretien WhatsApp</h4>
                    <p>Notre recruteur vous contactera sous 48h</p>
                  </div>
                </div>
                <div className="detail-card">
                  <FaShieldAlt className="detail-icon" />
                  <div>
                    <h4>Processus de Vérification</h4>
                    <p>Votre profil sera examiné dans les 72h</p>
                  </div>
                </div>
              </div>
              <div className="success-actions">
                <button 
                  className="btn-promo-secondary"
                  onClick={() => {
                    setStatus('idle');
                    setFormStep(1);
                    setFormData({
                      fullName: '',
                      email: '',
                      whatsapp: '',
                      nationality: '',
                      city: '',
                      facebook: '',
                      tiktok: '',
                      instagram: '',
                      linkedin: '',
                      motivation: ''
                    });
                  }}
                >
                  Postuler pour un ami
                </button>
                <a href="/" className="btn-promo-primary">
                  Retour à l'accueil
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer className="promo-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <FaCrown />
              <span translate='no'>Numeric-Paper Promo</span>
            </div>
            <p className="footer-copyright">
              © 2026 <strong>Numeric-Paper</strong>. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="promo-agent-container">
      <CustomHeader selectedTheme={selectedTheme} />

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

      <div className="section-container" style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
        {/* Form Header Content */}
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
        </div>
        
        {/* Form CTA */}
        <div className="form-cta">
          <FaCheckCircle className="cta-icon" />
          <p>
            <strong>Garantie de réponse</strong> sous 72h maximum
          </p>
        </div>
        
        {/* Home Button */}
        <div className="form-home-btn">
          <Link to="/" className="btn-home">
            <FaHome />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {formContent}
      </div>

      {/* Footer avec liens vers numeric-paper.com */}
      <footer className="numeric-paper-footer">
        <div className="footer-container">
          <div className="footer-main">
            {/* Logo et description */}
            <div className="footer-brand">
              <p className="footer-description">
                Rejoignez notre équipe d'agents promo et gagnez des commissions en promouvant 
                la meilleure plateforme d'invitations virtuelles sécurisées.
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

export default PromoAgentApplication;
