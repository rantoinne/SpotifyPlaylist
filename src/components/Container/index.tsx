import React, { FC } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import styles from './styles';

interface ContainerProps {
  useScrollView?: boolean;
  wrapperStyle?: ViewStyle;
  children: React.ReactNode | React.ReactNode[]
}

export const Container: FC<ContainerProps> = ({
  useScrollView = false,
  wrapperStyle = {},
  children,
}) => {
  const ContainerWrapper = useScrollView ? ScrollView : View;
  return (
    <ContainerWrapper style={[styles.container, wrapperStyle]}>
      {children}
    </ContainerWrapper>
  );
};
