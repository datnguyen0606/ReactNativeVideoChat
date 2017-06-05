import React, { Component } from 'react';
import config from "../config/app.js"
import Home from "./components/Home.js"
import RoomContainer from "./components/RoomContainer.js"


import { View, StyleSheet } from 'react-native';

import { getLocalStream, initPC } from './utils/service.js'

import io from 'socket.io-client';
const socket = io.connect(config.host, {transports: ['websocket']});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localVideoSrc: null,
      remoteVideoSrc: null,
      isFront: true,
      connection: "",
      user: "",
      room: `${new Date() - new Date().setHours(0, 0, 0, 0)}`,
      message: "",
      sid: ""
    };
  }

  componentDidMount() {
    container = this;
    socket.on('create', () => {
      getLocalStream(container.state.isFront, function(stream) {
        container.localStream = stream;
        container.setState({user: "host", connection: 'ready', localVideoSrc: stream.toURL()});
      });
    });

    socket.on('join', () => {
      getLocalStream(container.state.isFront, function(stream) {
        container.localStream = stream;
        container.setState({user: "guest", connection: 'join', localVideoSrc: stream.toURL()});
      });
    });

    socket.on('approve', data => {
      container.setState({
        connection: 'approve',
        message: data.message,
        sid: data.sid
      });
    });
    socket.on('bridge', () => {
      initPC(container.state, socket, container.localStream, function(streamSrc) {
        console.log("---here---");
        container.setState({
          connection: "established",
          remoteVideoSrc: streamSrc
        })
      });
    });

    socket.on('hangup', () => {
      this.setState({user: 'host', bridge: 'host-hangup'});
    });
  }

  componentWillUnmount() {
    if (this.localStream !== undefined) {
      this.localStream.getVideoTracks()[0].stop();
    }
    socket.emit('leave');
  }

  hideAuth() {
    this.setState({connection: "connecting"});
  }
  resetAuth() {
    this.setState({connection: 'create'});
  }

  onRomChanged = e => {
    this.setState({ room: e.nativeEvent.text });
  }

  onJoinPressed = () => {
    this.setState({ connection: "ready" });
    // find existing or create new room
    socket.emit('find', this.state.room);
  }

  onRandomPressed = () => {
    const val = `${new Date() - new Date().setHours(0, 0, 0, 0)}`;
    this.setState({room: val});
  }

  onInvitationChanged = e => {
    this.setState({ message: e.nativeEvent.text });
  }

  sendInvitation = e => {
    socket.emit('auth', this.state);
    this.hideAuth();
  }

  acceptInvitation = e => {
    socket.emit('accept', this.state.sid);
    this.hideAuth();
  }

  rejectInvitation = e => {
    socket.emit('reject', this.state.sid);
    this.resetAuth();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.connection == "" ?
          (<Home room={this.state.room}
            onRomChanged={this.onRomChanged}
            onJoinPressed={this.onJoinPressed}
            onRandomPressed={this.onRandomPressed} />
          ) :
          (<RoomContainer
            message={this.state.message}
            onInvitationChanged={this.onInvitationChanged}
            sendInvitation={this.sendInvitation}
            acceptInvitation={this.acceptInvitation}
            rejectInvitation={this.rejectInvitation}
            connection={this.state.connection}
            localVideoSrc={this.state.localVideoSrc}
            remoteVideoSrc={this.state.remoteVideoSrc} />
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333'
  }
});