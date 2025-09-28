import { NativeModules, Platform } from "react-native";
import {
  FRESHCHAT_APP_ID,
  FRESHCHAT_APP_KEY,
  FRESHCHAT_DOMAIN,
  FRESHCHAT_WEB_EMBED_URL,
  FRESHCHAT_WEB_HOST,
  FRESHCHAT_WEB_TOKEN,
  FRESHCHAT_WEB_DOMAIN,
} from "../Config/freshchat";

type FreshchatUser = {
  firstName?: string;
  lastName?: string;
  name?: string; // convenience, will be split
  email?: string;
  phone?: string;
  phoneCountryCode?: string; // e.g. +91
  externalId?: string; // your user id
  properties?: Record<string, string | number | boolean>;
};

const hasNativeFreshchat = Boolean((NativeModules as any)?.RNFreshchatSdk);

function getSdk() {
  if (!hasNativeFreshchat) return null as any;
  // dynamic require to avoid crashes when running where native module is absent
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Freshchat, FreshchatConfig } = require("react-native-freshchat-sdk");
  return { Freshchat, FreshchatConfig };
}

export function initFreshchat(appId: string = FRESHCHAT_APP_ID, appKey: string = FRESHCHAT_APP_KEY, domain: string = FRESHCHAT_DOMAIN) {
  if (Platform.OS === 'web') {
    console.log("Initializing Freshchat for web...");
    if (typeof document !== 'undefined' && FRESHCHAT_WEB_EMBED_URL) {
      const existing = document.querySelector('script[data-freshchat="1"]');
      if (!existing) {
        console.log("Loading Freshworks script...");
        const s = document.createElement('script');
        s.async = true;
        s.dataset.freshchat = '1';
        s.src = FRESHCHAT_WEB_EMBED_URL.startsWith('//')
          ? `https:${FRESHCHAT_WEB_EMBED_URL}`
          : FRESHCHAT_WEB_EMBED_URL;
        s.onload = () => {
          console.log("Freshworks script loaded");
          // @ts-ignore
          if (window.FreshworksWidget) {
            console.log("FreshworksWidget available after script load");
            // @ts-ignore
            window.FreshworksWidget('hide', 'launcher');
          } else {
            console.log("FreshworksWidget still not available after script load");
          }
        };
        s.onerror = (error) => {
          console.error("Error loading Freshworks script:", error);
        };
        document.head.appendChild(s);
      } else {
        console.log("Freshworks script already loaded");
      }
    }
    return;
  }

  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat, FreshchatConfig } = sdk;
  const cfg = new FreshchatConfig(appId, appKey);
  if (domain) cfg.domain = domain;
  try {
    Freshchat.init(cfg);
  } catch {}
}

export async function setFreshchatUser(user: FreshchatUser) {
  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat } = sdk;

  const payload: any = {};
  if (user.firstName || user.lastName) {
    if (user.firstName) payload.firstName = user.firstName;
    if (user.lastName) payload.lastName = user.lastName;
  } else if (user.name) {
    const parts = user.name.split(" ");
    payload.firstName = parts.shift() || user.name;
    payload.lastName = parts.join(" ");
  }
  if (user.email) payload.email = user.email;
  if (user.phone) payload.phone = user.phone;
  if (user.phoneCountryCode) payload.phoneCountryCode = user.phoneCountryCode;

  try {
    if (Object.keys(payload).length > 0) {
      Freshchat.setUser(payload);
    }
    if (user.externalId) {
      // Pass null restoreId for first-time mapping; Freshchat will generate one
      Freshchat.identifyUser(user.externalId, null);
    }
    if (user.properties && Object.keys(user.properties).length) {
      Freshchat.setUserProperties(user.properties);
    }
  } catch {}
}

export function openFreshchat() {
  if (Platform.OS === 'web') {
    console.log("openFreshchat called on web");
    
    const tryOpenFW = () => {
      // Check multiple ways for the widget
      // @ts-ignore
      const hasWidget = typeof window !== 'undefined' && window.FreshworksWidget;
      // @ts-ignore
      const hasFcWidget = typeof window !== 'undefined' && window.fcWidget;
      
      // Also check for DOM elements
      const widgetElement = document.querySelector('[data-fc-widget]') || 
                           document.querySelector('.fc-widget') ||
                           document.querySelector('#fc-widget') ||
                           document.querySelector('[class*="freshchat"]') ||
                           document.querySelector('[id*="freshchat"]');
      
      console.log("Widget checks:", {
        hasWidget,
        hasFcWidget,
        widgetElement: !!widgetElement,
        windowKeys: typeof window !== 'undefined' ? Object.keys(window).filter(k => k.toLowerCase().includes('fresh')) : []
      });
      
      if (hasWidget) {
        console.log("FreshworksWidget found, attempting to open...");
        try {
          // @ts-ignore
          window.FreshworksWidget('open');
          console.log("FreshworksWidget open called");
          
          // @ts-ignore
          window.FreshworksWidget('hide', 'launcher');
          console.log("FreshworksWidget launcher hidden");
          
        } catch (error) {
          console.error("Error with FreshworksWidget:", error);
        }
        return true;
      }
      
      if (hasFcWidget) {
        console.log("fcWidget found, attempting to open...");
        try {
          // @ts-ignore
          window.fcWidget.open();
          console.log("fcWidget open called");
        } catch (error) {
          console.error("Error with fcWidget:", error);
        }
        return true;
      }
      
      if (widgetElement) {
        console.log("Widget DOM element found, trying to click it...");
        try {
          // Try to find and click the widget button
          const widgetButton = widgetElement.querySelector('button') || 
                              widgetElement.querySelector('[role="button"]') ||
                              widgetElement;
          if (widgetButton) {
            widgetButton.click();
            console.log("Widget button clicked");
            return true;
          }
        } catch (error) {
          console.error("Error clicking widget:", error);
        }
      }
      
      console.log("No widget found");
      return false;
    };

    // Check if widget is available with a longer wait
    const waitForWidget = () => {
      console.log("Waiting for FreshworksWidget to be available...");
      let attempts = 0;
      const maxAttempts = 500; // 5 seconds total
      
      const checkWidget = () => {
        attempts++;
        console.log(`Attempt ${attempts}/${maxAttempts} to find FreshworksWidget`);
        
        // @ts-ignore
        if (typeof window !== 'undefined' && window.FreshworksWidget) {
          console.log("FreshworksWidget found after waiting!");
          tryOpenFW();
          return;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(checkWidget, 100);
        } else {
          console.log("FreshworksWidget not found after maximum attempts");
        }
      };
      
      checkWidget();
    };
    
    // Web behavior: open Freshworks widget if available
    if (tryOpenFW()) {
      return;
    }
    
    // If widget not found, wait for it to become available
    waitForWidget();
    return;
  }

  const sdk = getSdk();
  if (!sdk) return;
  const { Freshchat } = sdk;
  try {
    Freshchat.showConversations();
  } catch {}
}


