import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-807LBWQJHT'); // ← replace with your Measurement ID
  ReactGA.send('pageview');
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};
