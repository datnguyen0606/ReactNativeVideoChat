import { StyleSheet } from 'react-native';
import config from "../config/app.js";
import { Platform } from 'react-native';

export default StyleSheet.create({
  fullContainer: {
    width: config.screenWidth,
    height: config.screenHeight,
    flex: 1
  },
  thumbnailContainer: {
    width: config.screenWidth,
    height: config.thumbnailHeight
  },
  thumbnail: {
    margin: 10,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: config.thumbnailWidth,
    height: config.thumbnailHeight
  },
  invitationSection: {
    paddingTop: 30,
    padding: 10,
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: '#333'
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 17,
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