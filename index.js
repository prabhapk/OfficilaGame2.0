import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Src/Redux/store';
import App from './Src/App';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
