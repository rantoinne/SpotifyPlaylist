import React, { FunctionComponent } from 'react';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';
import { color } from '../../theme';

export const StatusBar: FunctionComponent<StatusBarProps> = () => (
  <RNStatusBar backgroundColor={color.primary} barStyle="light-content" />
);
