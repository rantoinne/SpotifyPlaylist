/* eslint-disable max-len */
import {
  Image,
  Animated,
} from 'react-native';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { color } from '../../theme';
import { HEADER_DIMENSIONS } from '../../utils/enums';
import { getGradientOffsets } from '../../utils/linearGradient';

type Props = {
  title: string,
  description: string,
  scrollY: Animated.Value,
  backdropImageUrl: string,
};

export const AnimatedHeader: FC<Props> = ({
  title,
  scrollY,
  description,
  backdropImageUrl,
}) => {
  const AnimatedLGView = Animated.createAnimatedComponent(LinearGradient);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, (HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT - HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT)],
    outputRange: [HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT, HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const scaleYInterpolation = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const opacityInterpolation = scrollY.interpolate({
    inputRange: [0, (HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT - HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT)],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const moveTextView = scrollY.interpolate({
    inputRange: [0, (HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT - HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT)],
    outputRange: [0, -HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT * 1.6 - 10],
    extrapolate: 'clamp',
  });

  const fontSizeInterpolation = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT],
    outputRange: [24, 18],
    extrapolate: 'clamp',
  });

  const descriptionFontSizeInterpolation = scrollY.interpolate({
    inputRange: [0, HEADER_DIMENSIONS.ANIMATED_HEADER_MIN_HEIGHT],
    outputRange: [16, 12],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { height: headerHeight },
      ]}
    >
      <Animated.View
        style={[
          styles.stretchWidth,
          {
            transform: [
              {
                scaleY: scaleYInterpolation,
              },
            ],
            opacity: opacityInterpolation,
          },
        ]}
      >
        <AnimatedLGView
          colors={[color.primary, color.transparent]}
          style={[styles.gradientView, styles.leftAlign]}
          end={getGradientOffsets({ xOffset: 1, yOffset: 0 })}
          start={getGradientOffsets({ xOffset: 0, yOffset: 0 })}
        />
        <AnimatedLGView
          colors={[color.primary, color.transparent]}
          style={[styles.gradientView, styles.rightAlign]}
          end={getGradientOffsets({ xOffset: 0, yOffset: 0 })}
          start={getGradientOffsets({ xOffset: 1, yOffset: 0 })}
        />
        <Image
          style={styles.headerImage}
          source={{ uri: backdropImageUrl }}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [
              { translateY: moveTextView },
            ],
          },
        ]}
      >
        <Animated.Text
          numberOfLines={1}
          style={{ color: color.background, textAlign: 'center', fontSize: fontSizeInterpolation }}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          numberOfLines={2}
          style={{ color: color.background, textAlign: 'center', fontSize: descriptionFontSizeInterpolation }}
        >
          {description}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};
