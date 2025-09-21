// hooks/useFreshChat.js
import { useState, useCallback } from 'react';

const useFreshChat = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [webViewRef, setWebViewRef] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const openChat = useCallback(() => {
    setIsChatVisible(true);
    if (webViewRef && isReady) {
      setTimeout(() => {
        webViewRef.openChat();
      }, 100);
    }
  }, [webViewRef, isReady]);

  const closeChat = useCallback(() => {
    setIsChatVisible(false);
    if (webViewRef) {
      webViewRef.closeChat();
    }
  }, [webViewRef]);

  const setUser = useCallback((userData) => {
    if (webViewRef) {
      webViewRef.setUser(userData);
    }
  }, [webViewRef]);

  const registerWebView = useCallback((ref) => {
    setWebViewRef(ref);
  }, []);

  const handleWidgetReady = useCallback(() => {
    setIsReady(true);
    console.log('FreshChat widget is ready');
  }, []);

  const handleWidgetError = useCallback((error) => {
    console.error('FreshChat widget error:', error);
    setIsReady(false);
  }, []);

  return {
    isChatVisible,
    isReady,
    openChat,
    closeChat,
    setUser,
    registerWebView,
    handleWidgetReady,
    handleWidgetError,
    FreshChatComponent: isChatVisible ? FreshChatWebView : null
  };
};

export default useFreshChat;