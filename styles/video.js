import { StyleSheet } from 'react-native';
import config from "../config/app.js";
import { Platform } from 'react-native';
import normalize from '../src/utils/normalizeText';


export default StyleSheet.create({
  fullContainer: {
    flex: 1
  },
  thumbnail: {
    position: "absolute",
    right: normalize(10),
    top: normalize(30),
    width: config.thumbnailWidth,
    height: config.thumbnailHeight
  },
  invitationSection: {
    marginTop: normalize(30),
    padding: normalize(10),
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(51, 51, 51, 0.8)'
  },
  inputLabel: {
    marginBottom: normalize(5),
    fontSize: normalize(17),
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