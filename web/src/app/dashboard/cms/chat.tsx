'use client'
import { useEffect } from 'react';
declare global {
    interface Window {
      __lc: {
        license: number;
        integration_name?: string;
        product_name?: string;
      };
      LiveChatWidget?: {
        on: (...args: any[]) => void;
        once: (...args: any[]) => void;
        off: (...args: any[]) => void;
        get: (...args: any[]) => void;
        call: (...args: any[]) => void;
        init: () => void;
      };
    }
  } 
  
const LiveChat = () => {
  useEffect(() => {
    // Define the LiveChat widget settings
    window.__lc = window.__lc || {};
    window.__lc.license = 18562725;
    window.__lc.integration_name = "manual_onboarding";
    window.__lc.product_name = "livechat";

    // Function to insert the LiveChat script
    const insertScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = 'https://cdn.livechatinc.com/tracking.js';
      document.head.appendChild(script);
    };

    // Insert LiveChat script
    if (!window.LiveChatWidget) {
      insertScript();
    }

    return () => {
      // Cleanup: Optionally remove the script if necessary
    };
  }, []);

  return (
    <noscript>
      <a href="https://www.livechat.com/chat-with/18562725/" rel="nofollow">
        Chat with us
      </a>
      , powered by{' '}
      <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
        LiveChat
      </a>
    </noscript>
  );
};

export default LiveChat;
