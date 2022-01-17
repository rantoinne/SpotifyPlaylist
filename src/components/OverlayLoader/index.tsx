import {
  View,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { FC } from 'react';
import styles from './styles';

interface OverlayLoaderProps {
  isVisible: boolean;
}

export const OverlayLoader: FC<OverlayLoaderProps> = ({
  isVisible,
}: OverlayLoaderProps) => (
  <Modal
    transparent
    visible={isVisible}
    onRequestClose={null}
    style={{ zIndex: 100 }}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator color="white" size={Platform.OS === 'ios' ? 'large' : 34} />
      </View>
    </View>
  </Modal>
);
