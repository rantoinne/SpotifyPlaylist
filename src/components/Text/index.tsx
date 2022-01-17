import React, { FunctionComponent } from 'react';
import { Text as TextRN, TextProps } from 'react-native';
import styles from './styles';

export const Text: FunctionComponent<TextProps> = ({ children, style, ...otherProps }) => (
  <TextRN style={[styles.basicTextStyle, style]} {...otherProps}>
    {children}
  </TextRN>
);

export const ActionText: FunctionComponent<TextProps> = ({ children, style, ...otherProps }) => (
  <TextRN style={[styles.actionText, style]} {...otherProps}>
    {children}
  </TextRN>
);
