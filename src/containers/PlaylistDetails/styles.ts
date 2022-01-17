import { StyleSheet } from 'react-native';
import { HEADER_DIMENSIONS } from '../../utils/enums';

const styles = StyleSheet.create({
  trackCard: {
    padding: 8,
    width: '100%',
    borderRadius: 18,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  scrollViewContainerStyle: {
    paddingHorizontal: 15,
    paddingTop: HEADER_DIMENSIONS.ANIMATED_HEADER_MAX_HEIGHT + HEADER_DIMENSIONS.SAFE_MARGIN,
  },
});

export default styles;
