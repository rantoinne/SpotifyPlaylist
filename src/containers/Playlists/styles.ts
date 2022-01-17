import { StyleSheet } from 'react-native';
import { color, family } from '../../theme';

const styles = StyleSheet.create({
  playlistCard: {
    padding: 8,
    width: '100%',
    maxHeight: 114,
    borderRadius: 5,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.background,
  },
  topOverlayFade: {
    top: 0,
    height: 40,
    width: '100%',
    position: 'absolute',
  },
  bottomOverlayFade: {
    bottom: 0,
    height: 40,
    width: '100%',
    position: 'absolute',
  },
  playlistName: {
    fontSize: 24,
    marginTop: 24,
    color: color.background,
    fontFamily: family.PoppinsSemiBold,
  },
  wrapperStyle: { paddingHorizontal: 15 },
});

export default styles;
