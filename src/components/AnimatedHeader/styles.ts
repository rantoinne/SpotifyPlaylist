import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../theme';
import { HEADER_DIMENSIONS } from '../../utils/enums';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  stretchWidth: {
    width: '100%',
    alignItems: 'center',
  },
  gradientView: {
    zIndex: 100,
    height: '100%',
    width: width / 3,
    position: 'absolute',
  },
  leftAlign: {
    left: 0,
  },
  rightAlign: {
    right: 0,
  },
  headerImage: {
    width: '100%',
    resizeMode: 'stretch',
    height: HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT,
  },
  textView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
