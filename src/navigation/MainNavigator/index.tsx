import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { PlaylistDetails, Playlists, TrackDetails } from '../../containers';

const Stack = createNativeStackNavigator();

export const headerOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const MainNavigator = () => (
  <Stack.Navigator screenOptions={headerOptions}>
    <Stack.Screen name="Playlists" component={Playlists} />
    <Stack.Screen name="PlaylistDetails" component={PlaylistDetails} />
    <Stack.Screen name="TrackDetails" component={TrackDetails} />
  </Stack.Navigator>
);

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = [];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
