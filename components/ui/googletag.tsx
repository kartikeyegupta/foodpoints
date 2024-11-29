import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GoogleTag: React.FC<{ trackingId: string }> = ({ trackingId }) => {
  useEffect(() => {
    // Ensure dataLayer is initialized
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Dynamically add the gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Configure gtag with the tracking ID
    script.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', trackingId);
    };

    return () => {
      // Cleanup script if component is unmounted
      document.head.removeChild(script);
    };
  }, [trackingId]);

  return null;
};

export default GoogleTag;
