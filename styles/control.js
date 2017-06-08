import { StyleSheet } from 'react-native';
import { moderateScale } from '../src/utils/scaling';

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: moderateScale(35),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },
  button: {
    backgroundColor: 'rgba(44, 44, 44, 0.6)',
    borderRadius: moderateScale(60)/2,
    width: moderateScale(60),
    height: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(12),
    marginRight: moderateScale(12)
  },
  red: {
    backgroundColor: 'red'
  },
  svg: {
    width: moderateScale(32),
    height: moderateScale(32)
  },
  svg_camera: {
    width: moderateScale(38),
    height: moderateScale(38)
  }
});