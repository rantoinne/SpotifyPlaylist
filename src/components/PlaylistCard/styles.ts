import { StyleSheet } from 'react-native';
import { color, family } from '../../theme';

const styles = StyleSheet.create({
  playlistCard: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: color.background,
    marginVertical: 16,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 114,
  },
  textWrapper: {
    maxWidth: '70%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nameText: { fontSize: 18 },
  totalText: { fontSize: 28, fontFamily: family.PoppinsMedium },
  playlistThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
});

export default styles;
