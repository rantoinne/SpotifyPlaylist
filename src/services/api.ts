import {
  CLIENT_ID,
  CLIENT_SECRET,
  SPOTIFY_ACCESS_URL,
  SPOTIFY_DEFAULT_URL,
} from '@env';
import { encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceCountry, { TYPE_CONFIGURATION } from 'react-native-device-country';
import Request from './request';
import { showToast } from '../utils/toast';

const spotifySecretLiteral = `${CLIENT_ID}:${CLIENT_SECRET}`;
const encodedBasicToken = `Basic ${btoa(spotifySecretLiteral)}`;

const accessTokenRequestUrlInstance = new Request(
  SPOTIFY_ACCESS_URL,
  encodedBasicToken,
);

const defaultToastMessage = 'Something went wrong!';

const bearerToken = async () => {
  const token: string = await AsyncStorage.getItem('@accessToken');
  return token;
};

const defaultRequestUrlInstance = async () => new Request(
  SPOTIFY_DEFAULT_URL,
  await bearerToken(),
);

type AccessTokenResponseType = {
  access_token: string,
  expires_in: number,
  token_type: string,
};

export type FeaturedPlaylistsResponseType = {
  message: string,
  playlists: {
    href: string,
    items: Array<{
      collaborative: boolean,
      description: string,
      external_urls: {
        spotify: string,
      },
      href: string,
      id: string,
      images: Array<{
        url: string,
      }>,
      name: string,
      tracks: {
        href: string,
        total: number,
      }
    }>
  },
};

export type PlaylistDetailsResponseType = {
  id: string,
  description: string,
  images: Array<{
    url: string,
  }>,
  name: string,
  tracks: {
    href: string,
    items: {
      track: {
        id: string,
        artists: {
          id: string,
          name: string
        }[],
        album: {
          images: Array<{
            url: string,
          }>
          name: string,
        }
        popularity: number,
        name: string,
        href: string,
      }
    }[],
  },
};

export type TrackDetailsResponseType = {
  id: string,
  album: {
    id: string,
    artists: {
      name: string,
      id: string,
    }[],
    images: Array<{
      url: string,
    }>,
    name: string,
  },
  artists: {
    name: string,
    id: string,
  }[],
  duration_ms: number,
  popularity: number,
  name: string,
};

const getCountry = async () => {
  const countryDetails = await DeviceCountry.getCountryCode(TYPE_CONFIGURATION);
  return countryDetails.code.toUpperCase();
};

export const getAccessToken = async () => {
  try {
    let formBody: Array<string> | string = [];
    const encodedKey = encodeURIComponent('grant_type');
    const encodedKeyValue = encodeURIComponent('client_credentials');
    formBody.push(`${encodedKey}=${encodedKeyValue}`);
    formBody = formBody.join('&');
    const accessTokenApiResponse: AccessTokenResponseType = await accessTokenRequestUrlInstance
      .post(
        '',
        formBody,
        'application/x-www-form-urlencoded',
      );
    await AsyncStorage.setItem('@accessToken', `Bearer ${accessTokenApiResponse.access_token}`);
  } catch (e) {
    showToast('error', e.message ?? defaultToastMessage);
    throw new Error(e);
  }
};

export const getFeaturedPlaylist = async () => {
  try {
    const countryCode = await getCountry();
    const defaultSpotifyUrl = await defaultRequestUrlInstance();
    const featuredPlaylistApiResponse: FeaturedPlaylistsResponseType = await defaultSpotifyUrl.get(
      `/v1/browse/featured-playlists?country=${countryCode ?? 'US'}`,
    );
    return featuredPlaylistApiResponse;
  } catch (e) {
    showToast('error', e.message ?? defaultToastMessage);
    throw new Error(e);
  }
};

export const getPlaylistDetails = async (url: string) => {
  try {
    const defaultSpotifyUrl = await defaultRequestUrlInstance();
    const playlistDetailsApiResponse: PlaylistDetailsResponseType = await defaultSpotifyUrl
      .get(url);
    return playlistDetailsApiResponse;
  } catch (e) {
    showToast('error', e.message ?? defaultToastMessage);
    throw new Error(e);
  }
};

export const getTrackDetails = async (url: string) => {
  try {
    const defaultSpotifyUrl = await defaultRequestUrlInstance();
    const trackDetailsApiResponse: TrackDetailsResponseType = await defaultSpotifyUrl.get(
      url,
    );
    return trackDetailsApiResponse;
  } catch (e) {
    showToast('error', e.message ?? defaultToastMessage);
    throw new Error(e);
  }
};
