import {
  Animated,
} from 'react-native';
import { SPOTIFY_DEFAULT_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import { getPlaylistDetails, PlaylistDetailsResponseType } from '../../services/api';
import { SCROLL_EVENT_THROTTLE } from '../../utils/enums';
import { RootStackParamList } from '../../types/navigation';
import { AnimatedHeader, Container, OverlayLoader, TrackCard } from '../../components';

type PlaylistDetailsProps = {
  route: {
    params: {
      playlistUrl: string,
    }
  }
};

export const PlaylistDetails: FC<PlaylistDetailsProps> = ({
  route: { params: { playlistUrl } },
}) => {
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loader, setLoader] = useState<boolean>(true);
  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetailsResponseType>(null);

  const fetchPlaylistDetails = useCallback(async () => {
    const fetchUrl = playlistUrl.split(SPOTIFY_DEFAULT_URL)[1];
    const playlistDetailsResponse = await getPlaylistDetails(fetchUrl);
    setPlaylistDetails(playlistDetailsResponse);
    setLoader(false);
  }, [playlistUrl]);

  useEffect(() => {
    fetchPlaylistDetails();
  }, [fetchPlaylistDetails]);

  const onScrollAnimatedEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  const playlistTracks = playlistDetails && playlistDetails.tracks.items;

  return (
    <Container>
      {/* Spinning loader */}
      <OverlayLoader isVisible={loader} />
      <Animated.ScrollView
        onScroll={onScrollAnimatedEvent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE.DEFAULT}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        {
          playlistTracks && playlistTracks.map(track => (
            <TrackCard
              key={track.track.id}
              trackName={track.track.name}
              popularity={track.track.popularity}
              trackThumbnail={{ uri: track.track.album.images[0].url }}
              artistNames={track.track.artists?.map(artist => artist.name).join(', ')}
              onCardPress={() => navigation.navigate('TrackDetails', {
                tracksListUrl: track.track.href,
              })}
            />
          ))
        }
      </Animated.ScrollView>
      {
        playlistDetails && (
          <AnimatedHeader
            scrollY={scrollY}
            title={playlistDetails.name}
            description={playlistDetails.description}
            backdropImageUrl={playlistDetails.images[0].url}
          />
        )
      }
    </Container>
  );
};
