export interface AppConfig {
  isPresaleOnly: boolean;
  defaultRoute: string;
  enabledSections: {
    presale: boolean;
    dashboard: boolean;
    bonds: boolean;
    lpBonds: boolean;
    governance: boolean;
    staking: boolean;
    analytics: boolean;
  };
}

export const getAppConfig = (): AppConfig => {
  const isPresaleOnly = process.env.REACT_APP_PRESALE_ONLY === 'true';
  
  return {
    isPresaleOnly,
    defaultRoute: isPresaleOnly ? '/presale' : '/',
    enabledSections: {
      presale: true, // Always enabled
      dashboard: !isPresaleOnly,
      bonds: !isPresaleOnly,
      lpBonds: !isPresaleOnly,
      governance: !isPresaleOnly,
      staking: !isPresaleOnly,
      analytics: !isPresaleOnly,
    }
  };
}; 