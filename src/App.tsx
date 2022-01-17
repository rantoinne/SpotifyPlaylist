import React from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StatusBar } from './components/StatusBar';
import { RootNavigator } from './navigation/RootNavigator';

enableScreens(true);
/**
 * This is the root component of our app.
 */
const App = () => (
  <>
    <StatusBar />
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RootNavigator />
    </SafeAreaProvider>
  </>
);

export default App;

