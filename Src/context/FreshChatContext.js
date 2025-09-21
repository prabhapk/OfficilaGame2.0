// context/FreshChatContext.js
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import FreshChatWebView from '../Components/FreshChatWebView';

const FreshChatContext = createContext();

export const useFreshChat = () => {
  const context = useContext(FreshChatContext);
  if (!context) {
    throw new Error('useFreshChat must be used within a FreshChatProvider');
  }
  return context;
};

export const FreshChatProvider = ({ children }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const webViewRef = useRef(null);

  const openChat = useCallback(() => {
    setIsChatVisible(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatVisible(false);
  }, []);

  const setUser = useCallback((user) => {
    setUserData(user);
    if (webViewRef.current) {
      webViewRef.current.setUser(user);
    }
  }, []);

  return (
    <FreshChatContext.Provider
      value={{
        isChatVisible,
        isReady,
        openChat,
        closeChat,
        setUser,

      }}
    >
      {children}
      {isChatVisible && (
        <FreshChatWebView
          ref={webViewRef}
          visible={isChatVisible}
          user={userData} // Pass user data here
          onClose={closeChat}
        />
      )}
    </FreshChatContext.Provider>
  );
};