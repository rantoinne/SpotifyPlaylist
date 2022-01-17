import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React, { FC } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Text } from '../Text';
import { color } from '../../theme';

type Props = {
  trackName: string,
  artistNames: string,
  popularity: number,
  onCardPress: (() => void),
  trackThumbnail: ImageSourcePropType,
};

export const TrackCard: FC<Props> = ({
  trackName,
  artistNames,
  popularity,
  onCardPress,
  trackThumbnail,
}) => (
  <TouchableOpacity onPress={onCardPress}>
    <LinearGradient
      style={styles.trackCard}
      colors={[color.transparent, `${color.background}10`]}
    >
      <View style={styles.innerCardStyle}>
        <Image
          source={trackThumbnail}
          style={styles.trackThumbnail}
        />
        <View style={styles.flexMarginStyle}>
          <View style={styles.flexRowStart}>
            <Ionicons
              name="md-musical-notes"
              size={12}
              color={color.background}
              style={styles.marginStyle}
            />
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={styles.textColor}
            >
              {trackName}
            </Text>
          </View>
          <View style={styles.flexRowStart}>
            <Entypo name="user" size={12} color={color.background} style={styles.marginStyle} />
            <Text numberOfLines={2} style={styles.textColor}>
              {artistNames}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.popularityWrapper}>
        <Entypo name="heart" size={12} color={color.error} />
        <Text style={styles.popularityText}>
          {popularity}
        </Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);
