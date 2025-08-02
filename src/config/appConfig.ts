export interface AppConfig {
  isPresaleOnly: boolean;
  defaultRoute: string;
  enabledSections: {
    dashboard: boolean;
    bonds: boolean;
    governance: boolean;
    staking: boolean;
    analytics: boolean;
  };
}

export const getAppConfig = (): AppConfig => {
  const isPresaleOnly = process.env.REACT_APP_PRESALE_ONLY === 'true';
  
  return {
    isPresaleOnly,
    defaultRoute: isPresaleOnly ? '/' : '/',
    enabledSections: {
      dashboard: !isPresaleOnly,
      bonds: !isPresaleOnly,
      governance: !isPresaleOnly,
      staking: !isPresaleOnly,
      analytics: !isPresaleOnly,
    }
  };
}; 