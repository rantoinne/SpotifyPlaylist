import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { color } from '../../theme';
import { MainNavigator } from '../MainNavigator';

const RootSwitchNavigator = () => <MainNavigator />;

const Container = Platform.OS === 'ios' ? SafeAreaView : React.Fragment;
const makeRender = () => (
  <Container style={{ flex: 1, backgroundColor: color.primary }}>
    <NavigationContainer>
      <RootSwitchNavigator />
    </NavigationContainer>
  </Container>
);

export const RootNavigator = React.forwardRef<
NavigationContainerRef<any>,
Partial<React.ComponentProps<typeof NavigationContainer>>
>(() => makeRender());

RootNavigator.displayName = 'RootNavigator';
