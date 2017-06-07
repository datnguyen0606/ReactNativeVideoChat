import { StyleSheet } from 'react-native';
import config from "../config/app.js";
import { Platform } from 'react-native';
import { moderateScale } from '../src/utils/scaling';

export default StyleSheet.create({
  fullContainer: {
    flex: 1
  },
  thumbnail: {
    position: "absolute",
    right: moderateScale(10),
    top: moderateScale(30),
    width: config.thumbnailWidth,
    height: config.thumbnailHeight
  },
  invitationSection: {
    marginTop: moderateScale(30),
    padding: moderateScale(10),
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(51, 51, 51, 0.8)'
  },
  inputLabel: {
    marginBottom: moderateScale(5),
    fontSize: moderateScale(17),
    color: '#eee'
  },
  flowLeft: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  halfSize: {
    flex: 0.5
  },
  tra: {
    transform: [{ scaleX: (Platform.OS === 'ios') ? -1 : 1 }]
  }
});