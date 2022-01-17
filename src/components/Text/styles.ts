import { StyleSheet } from 'react-native';
import { color, family } from '../../theme';

export default StyleSheet.create({
  actionText: {
    color: color.link,
    fontFamily: family.PoppinsMedium,
    fontSize: 8,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    paddingVertical: 8,
  },
  basicTextStyle: {
    color: color.link,
    fontFamily: family.PoppinsRegular,
    fontSize: 14,
  },
});
