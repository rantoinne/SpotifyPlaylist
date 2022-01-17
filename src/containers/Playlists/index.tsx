import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import { color } from '../../theme';
import { showToast } from '../../utils/toast';
import { RootStackParamList } from '../../types/navigation';
import { Container, OverlayLoader, PlaylistCard, Text } from '../../components';
import { FeaturedPlaylistsResponseType, getAccessToken, getFeaturedPlaylist } from '../../services/api';

export const Playlists: FC<any> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [playlistsDetails, setPlaylists] = useState<FeaturedPlaylistsResponseType>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const fetchFeaturedPlaylists = async () => {
    await getAccessToken();
    const featuredPlaylists = await getFeaturedPlaylist();
    setPlaylists(featuredPlaylists);
    setLoader(false);
    showToast('info', 'Use gestures to use the App!');
  };

  useEffect(() => {
    fetchFeaturedPlaylists();
  }, []);

  const playlistItems = playlistsDetails && playlistsDetails.playlists.items;

  return (
    <>
      <Container useScrollView wrapperStyle={styles.wrapperStyle}>
        {/* Spinning loader */}
        <OverlayLoader isVisible={loader} />
        {
          playlistsDetails !== null && (
            <Text style={styles.playlistName}>
              {playlistsDetails.message}
              !
            </Text>
          )
        }
        {
          playlistsDetails !== null && playlistItems.map(playlist => (
            <PlaylistCard
              key={playlist.id}
              name={playlist.name}
              total={playlist.tracks.total}
              playlistThumbnail={{ uri: playlist.images[0].url }}
              onCardPress={() => navigation.navigate('PlaylistDetails', {
                playlistUrl: playlist.href,
              })}
            />
          ))
        }
      </Container>
      <LinearGradient
        style={styles.topOverlayFade}
        colors={[color.primary, color.transparent]}
      />
      <LinearGradient
        style={styles.bottomOverlayFade}
        colors={[color.transparent, color.primary]}
      />
    </>
  );
};
