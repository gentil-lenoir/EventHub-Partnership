// Déclaration globale pour Google Translate
interface Window {
  googleTranslateElementInit?: () => void;
  gtranslateSettings?: {
    default_language: string;
    detect_browser_language: boolean;
    wrapper_selector: string;
    languages: string[];
    flag_style: string;
  };
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare namespace google {
  namespace translate {
    class TranslateElement {
      constructor(options: {
        pageLanguage: string;
        includedLanguages?: string;
        layout?: number;
        autoDisplay?: boolean;
      }, elementId: string);
    }
  }
}
