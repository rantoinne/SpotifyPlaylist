import { StyleSheet } from 'react-native';
import { color } from '../../theme';

const styles = StyleSheet.create({
  trackCard: {
    padding: 8,
    width: '100%',
    borderRadius: 18,
    marginVertical: 8,
    flexDirection: 'row',
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerCardStyle: {
    maxWidth: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  trackThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  flexMarginStyle: {
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  flexRowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marginStyle: { marginRight: 6 },
  popularityWrapper: {
    maxWidth: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popularityText: {
    fontSize: 22,
    marginLeft: 4,
    color: color.error,
  },
  textColor: { color: color.border },
});

export default styles;
