import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import { Navigate } from 'react-router';

// Type pour les props optionnelles
interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  scrollToSection?: (sectionId: string) => void;
  selectedTheme?: string;
  navItems?: { id: string; label: string }[];
}


// Fonction pour le scroll
const defaultScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

// Navigation par défaut pour la page Home
const defaultNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'demo', label: 'Demo' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'investment', label: 'Investment' },
  { id: 'contact', label: 'Contacts' }
];

const Header: React.FC<HeaderProps> = ({ 
  activeSection = '', 
  setActiveSection = () => {}, 
  scrollToSection = defaultScrollToSection,
  selectedTheme = 'dark',
  navItems = defaultNavItems
}) => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="logo">
          <a href="https://eventhub.com" target="_blank" rel="noopener noreferrer" className="logo-link">
            <span className="logo-icon">
              <img 
                src={selectedTheme === 'dark' ? "/img/EventHub-white.png" : "/favicon.ico"} 
                alt="" 
                width="40px" 
              />
            </span>
            <span className="logo-text">
              <strong><span translate="no">EventHub</span></strong>
              <small>À la recherche de <span style={{color:'white', fontWeight:'bold'}}>Partenaire</span></small>
            </span>
          </a>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className="nav-cta">
          <a 
            className="btn-primary"
            href='/promo-agent/application'
            style={{textDecoration:'none'}}
          >
            Appliquez
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;

