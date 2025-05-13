import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-MH42RVCS';

export default function GTM() {
  useEffect(() => {
    // Initialize TagManager with our GTM ID
    TagManager.initialize({ 
      gtmId: GTM_ID,
      dataLayerName: 'dataLayer'
    });
    
    return () => {
      // No cleanup needed as TagManager doesn't provide unmount functionality
    };
  }, []);
  
  return null;
} 