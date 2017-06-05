import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';
import styles from "../../styles/home.js";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.header}>
          Webrtc Video Room
        </Text>

        <Text style={styles.description}>
          Please enter a room name.
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            style={styles.searchInput}
            clearButtonMode="always"
            autoCorrect={false}
            autoCapitalize="none"
            value={this.props.room}
            onChange={this.props.onRomChanged}
            placeholder='Please enter a room name.'/>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}
              onPress={this.props.onJoinPressed}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Join</Text>
          </TouchableHighlight>
          <View style={styles.empty}></View>
          <TouchableHighlight style={styles.button}
              onPress={this.props.onRandomPressed}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

