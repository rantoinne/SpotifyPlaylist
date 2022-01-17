/* eslint-disable max-len */
import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { Text } from '../Text';
import { getGradientColorsSet, getGradientOffsets } from '../../utils/linearGradient';

type Props = {
  name: string,
  total: number,
  onCardPress: (() => void),
  playlistThumbnail: ImageSourcePropType,
};

export const PlaylistCard: FC<Props> = ({
  name,
  total,
  onCardPress,
  playlistThumbnail,
}) => {
  const gradientColors = getGradientColorsSet();
  return (
    <TouchableOpacity onPress={onCardPress}>
      <LinearGradient
        style={styles.playlistCard}
        colors={gradientColors.colors}
        end={getGradientOffsets({ xOffset: 0.3, yOffset: 0 })}
        start={getGradientOffsets({ xOffset: 1, yOffset: 1 })}
      >
        <View style={styles.textWrapper}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={[
              styles.nameText,
              { color: gradientColors.text },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              styles.totalText,
              { color: gradientColors.text },
            ]}
          >
            {total}
            {' '}
            songs
          </Text>
        </View>
        <Image
          source={playlistThumbnail}
          style={styles.playlistThumbnail}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};
