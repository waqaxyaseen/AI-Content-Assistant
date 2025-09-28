import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';
import LoadingScreen from './src/components/LoadingScreen';
import { setupNotifications } from './src/services/notificationService';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize push notifications
    setupNotifications();

    // Configure push notifications
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        // Send token to backend
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // Handle notification
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <NavigationContainer>
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor="transparent"
                  translucent
                />
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;