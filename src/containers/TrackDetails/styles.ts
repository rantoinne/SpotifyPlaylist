import { StyleSheet } from 'react-native';
import { color, family } from '../../theme';

const styles = StyleSheet.create({
  trackBackdropImage: {
    height: 240,
    width: '100%',
    resizeMode: 'stretch',
  },
  gradientOverlay: {
    height: 80,
    bottom: 0,
    zIndex: 100,
    width: '100%',
    position: 'absolute',
  },
  trackDetailsWrapper: {
    margin: 20,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: color.choco,
  },
  trackName: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: color.background,
    textDecorationLine: 'underline',
    fontFamily: family.PoppinsSemiBold,
    textDecorationColor: color.background,
  },
  popularityWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularityText: {
    fontSize: 18,
    marginLeft: 8,
  },
  trackDetailRowWrapper: {
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowTitle: {
    fontSize: 16,
    marginLeft: 4,
    color: color.textGray,
    fontFamily: family.PoppinsSemiBold,
  },
  rowValue: {
    fontSize: 18,
    maxWidth: '50%',
    textAlign: 'right',
    fontFamily: family.PoppinsSemiBold,
  },
});

export default styles;
