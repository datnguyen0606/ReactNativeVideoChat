import React, { Component } from 'react';
import config from "../../config/app.js";
import Home from "./Home";
import RoomContainer from "./RoomContainer";
import { connect } from 'react-redux';

import { View, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';

import { getLocalStream, initPC } from '../utils/service.js'

import io from 'socket.io-client';
const socket = io.connect(config.host, {transports: ['websocket']});

import { updateConnection, changeRoom, showControl, initState } from '../actions.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.pc = null;
  }

  componentDidMount() {
    const container = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      if (container.props.connection == "") {
        return false;
      } else {
        container.hangUp();
        return true;
      }
    });

    socket.on('create', () => {
      container.props.dispatch(updateConnection({
        user: "host",
        connection: 'ready'
      }));
    });

    socket.on('join', () => {
      container.props.dispatch(updateConnection({
        user: "guest",
        connection: 'join'
      }));
    });

    socket.on('approve', data => {
      container.props.dispatch(updateConnection({
        connection: 'approve',
        message: data.message,
        sid: data.sid
      }));
    });

    socket.on('bridge', () => {
      container.pc = initPC(container.props, socket, container.localStream, function(stream) {
        container.remoteStream = stream;
        container.props.dispatch(updateConnection({
          connection: "established",
          remoteVideoSrc: stream.toURL()
        }));
      });
    });

    socket.on('hangup', () => {
      if (container.pc) {
        container.pc.close();
        container.pc = null;
      }

      container.props.dispatch(updateConnection({
        user: 'host',
        connection: "host-hangup",
        remoteVideoSrc: null
      }));
    });
  }

  leaveCall = () => {
    if (this.localStream !== undefined) {
      this.localStream.release();
      //this.localStream.getVideoTracks()[0].stop();
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    socket.emit('leave');
  }

  componentWillUnmount() {
    this.leaveCall();
  }

  hangUp = () => {
    this.props.dispatch(initState(this.props.room));
    this.leaveCall();
  }

  resetAuth() {
    this.props.dispatch(updateConnection({
      connection: "create"
    }));
  }

  onRomChanged = e => {
    this.props.dispatch(changeRoom(e.nativeEvent.text));
  }

  onJoinPressed = () => {
    const container = this;
    container.props.dispatch(updateConnection({
      connection: "connecting"
    }));

    // find existing or create new room
    socket.emit('find', container.props.room);
    getLocalStream(container.props.isFront, function(stream) {
      container.localStream = stream;
      container.props.dispatch(updateConnection({
        localVideoSrc: stream.toURL()
      }));
    });
  }

  onRandomPressed = () => {
    const val = `${new Date() - new Date().setHours(0, 0, 0, 0)}`;
    this.props.dispatch(changeRoom(val));
  }

  onInvitationChanged = e => {
    this.props.dispatch(updateConnection({
      message: e.nativeEvent.text
    }));
  }

  sendInvitation = e => {
    socket.emit('auth', this.props);
    this.resetAuth();
  }

  acceptInvitation = e => {
    socket.emit('accept', this.props.sid);
    this.resetAuth();
  }

  rejectInvitation = e => {
    socket.emit('reject', this.props.sid);
    this.resetAuth();
  }

  toggleAudio = e => {
    if (this.localStream !== undefined) {
      const audio = this.localStream.getAudioTracks()[0].enabled = !this.props.audio;
      this.props.dispatch(showControl({audio: audio}));
    }
    e.stopPropagation();
  }

  toggleVideo = e => {
    if (this.localStream !== undefined) {
      const video = this.localStream.getVideoTracks()[0].enabled = !this.props.video;
      this.props.dispatch(showControl({video: video}));
    }
    e.stopPropagation();
  }

  toggleControl = e => {
    this.props.dispatch(showControl({showControl: !this.props.showControl}));
    e.stopPropagation();
  }

  swapCamera = e => {
    e.stopPropagation();
    const container = this;
    const isFront = !container.props.isFront;
    getLocalStream(isFront, function(stream) {
      if (container.localStream) container.localStream.release();
      container.localStream = stream;
      container.props.dispatch(updateConnection({
        isFront: isFront,
        localVideoSrc: stream.toURL()
      }));
    });

  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.connection == "" ?
          (<Home room={this.props.room}
            onRomChanged={this.onRomChanged}
            onJoinPressed={this.onJoinPressed}
            onRandomPressed={this.onRandomPressed} />
          ) :
          (<RoomContainer
            {...this.props}
            onInvitationChanged={this.onInvitationChanged}
            sendInvitation={this.sendInvitation}
            acceptInvitation={this.acceptInvitation}
            rejectInvitation={this.rejectInvitation}
            toggleControl={this.toggleControl}
            toggleAudio={this.toggleAudio}
            toggleVideo={this.toggleVideo}
            swapCamera={this.swapCamera}
            hangUp={this.hangUp} />
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


function mapStateToProps(state) {
  return state.appData;
}

export default connect(
  mapStateToProps
)(App)