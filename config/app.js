import {Dimensions} from 'react-native';

const window = Dimensions.get('window');
const ratio = window.width * 1.0 / window.height;
const thumbnailHeight = parseInt(window.height / 6);


export default {
  // host: "https://ec2-34-224-79-164.compute-1.amazonaws.com:8080",
  host: "http://192.168.0.55:3030",
  video: {
    minWidth: 640,
    minHeight: 360,
    minFrameRate: 30
  },
  screenWidth: window.width,
  screenHeight: window.height,
  thumbnailHeight: thumbnailHeight,
  thumbnailWidth: parseInt(thumbnailHeight*ratio)
}