import { StyleSheet } from 'react-native';
import normalize from '../src/utils/normalizeText';

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: normalize(20),
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'rgba(44, 44, 44, 0.6)',
    borderRadius: normalize(54)/2,
    width: normalize(54),
    height: normalize(54),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(10),
    marginRight: normalize(10)
  },
  red: {
    backgroundColor: 'red'
  },
  svg: {
    width: normalize(27),
    height: normalize(27)
  },
  svg_camera: {
    width: normalize(35),
    height: normalize(35)
  }
});