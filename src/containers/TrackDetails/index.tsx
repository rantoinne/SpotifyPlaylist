import {
  Animated,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { SPOTIFY_DEFAULT_URL } from '@env';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles';
import { color } from '../../theme';
import { secondsToHms } from '../../utils/time';
import { getTrackDetails, TrackDetailsResponseType } from '../../services/api';
import { getGradientOffsets } from '../../utils/linearGradient';
import { Container, OverlayLoader, Text } from '../../components';

export const TrackDetails: FC<any> = ({
  route: { params: { tracksListUrl } },
}) => {
  const [trackDetails, setTrackDetails] = useState<TrackDetailsResponseType>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const scaleAnimationValue = useMemo(() => new Animated.Value(1), []);

  const fetchPlaylistDetails = useCallback(async () => {
    const fetchUrl = tracksListUrl.split(SPOTIFY_DEFAULT_URL)[1];
    const trackDetailsResponse = await getTrackDetails(fetchUrl);
    setTrackDetails(trackDetailsResponse);
    setLoader(false);
  }, [tracksListUrl]);

  useEffect(() => {
    fetchPlaylistDetails();
  }, [fetchPlaylistDetails]);

  const animatePopularityIcon = useCallback(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(scaleAnimationValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimationValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => animatePopularityIcon());
  }, [scaleAnimationValue]);

  useEffect(() => {
    if (!loader && trackDetails) {
      animatePopularityIcon();
    }
  }, [trackDetails, loader, animatePopularityIcon]);

  const trackAlbumDetails = trackDetails && trackDetails.album;

  const trackBackdropImage = trackDetails && trackAlbumDetails.images[0].url;

  const artistsDetails = trackDetails && trackDetails.artists;

  const artistsName = trackDetails && artistsDetails?.map(artist => artist.name).join(', ');

  const trackDuration = trackDetails && secondsToHms(trackDetails.duration_ms / 1000);

  const trackName = trackDetails && trackDetails.name;

  const popularityAnimatedStyle = {
    transform: [
      {
        scaleY: scaleAnimationValue,
      },
      {
        scaleX: scaleAnimationValue,
      },
    ],
  };

  const renderRowItem = (
    rowIcon: string,
    rowTitle: string,
    rowValue: string | number,
    RowIconElement: any,
  ) => (
    <View style={styles.trackDetailRowWrapper}>
      <View style={styles.flexRowStart}>
        <RowIconElement
          size={20}
          color="gray"
          name={rowIcon}
        />
        <Text style={styles.rowTitle}>
          {rowTitle}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        adjustsFontSizeToFit
        style={styles.rowValue}
      >
        {rowValue}
      </Text>
    </View>
  );

  return (
    <Container>
      {/* Spinning loader */}
      <OverlayLoader isVisible={loader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.trackBackdropImage}
            source={{ uri: trackBackdropImage }}
          />
          <LinearGradient
            style={styles.gradientOverlay}
            colors={[color.primary, color.transparent]}
            end={getGradientOffsets({ xOffset: 0, yOffset: 0 })}
            start={getGradientOffsets({ xOffset: 0, yOffset: 1 })}
          />
        </View>

        {
          trackDetails && (
            <View style={styles.trackDetailsWrapper}>
              <Text style={styles.trackName}>
                {trackName}
              </Text>
              {renderRowItem('users', 'Artist(s)', artistsName, Entypo)}
              {renderRowItem('timer-outline', 'Duration', trackDuration, Ionicons)}
              {renderRowItem('albums', 'Album', trackAlbumDetails?.name, Ionicons)}
              <View style={styles.popularityWrapper}>
                <Animated.View style={popularityAnimatedStyle}>
                  <Entypo
                    size={44}
                    color="red"
                    name="heart"
                  />
                </Animated.View>
                <Text style={styles.popularityText}>
                  {trackDetails.popularity}
                </Text>
              </View>
            </View>
          )
        }
      </ScrollView>
    </Container>
  );
};
