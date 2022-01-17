import { StyleSheet } from 'react-native';
import { color } from '../../theme';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    zIndex: 100,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: `${color.primary}80`,
  },
  activityIndicatorWrapper: {
    width: 100,
    height: 100,
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
