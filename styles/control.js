import { StyleSheet } from 'react-native';
import { moderateScale } from '../src/utils/scaling';

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: moderateScale(30),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'rgba(44, 44, 44, 0.6)',
    borderRadius: moderateScale(54)/2,
    width: moderateScale(54),
    height: moderateScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10)
  },
  red: {
    backgroundColor: 'red'
  },
  svg: {
    width: moderateScale(27),
    height: moderateScale(27)
  },
  svg_camera: {
    width: moderateScale(35),
    height: moderateScale(35)
  }
});