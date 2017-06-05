import React, { Component } from 'react';
import { View } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import styles from "../../styles/video.js";

export default class Home extends Component {
  render() {
    const style_container = this.props.fullScreen ? styles.fullContainer : styles.thumbnailContainer;

    return (
      <View style={style_container}>
        <RTCView streamURL={this.props.streamURL}
                  style={styles.fullContainer} />
      </View>
    );
  }
}

