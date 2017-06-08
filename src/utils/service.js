import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';
import { Platform } from 'react-native';
import config from "../../config/app.js";


function logError(error) {
  console.log("logError", error);
}

let pc = null;
let remoteStream = null;

export function initPC(state, socket, localStream, callback) {
  socket.on('message', (message) => {
    console.log("----", message.type);
    if (message.type === 'offer') {
      // set remote description and answer
      pc.setRemoteDescription(new RTCSessionDescription(message), function () {
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.send(pc.localDescription);
          }, logError);
        }, logError);
      }, logError);

      // pc.setRemoteDescription(new RTCSessionDescription(message));

    } else if (message.type === 'answer') {
      // set remote description
      pc.setRemoteDescription(new RTCSessionDescription(message), function() {
        console.log('--answer--');
      }, logError);
    } else if (message.type === 'candidate') {
      // add ice candidate
      pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: message.mlineindex,
          candidate: message.candidate,
          sdpMid: message.sdpMid
        })
      );
    }
  });

  const createOffer = () => {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.send(pc.localDescription);
      }, logError);
    }, logError);
  }

  pc = new RTCPeerConnection({iceServers: [{url: 'stun:stun.l.google.com:19302'}]});
  // when our browser gets a candidate, send it to the peer
  pc.onicecandidate = e => {
    console.log(e, 'onicecandidate');
    if (e.candidate) {
      socket.send({
        type: 'candidate',
        mlineindex: e.candidate.sdpMLineIndex,
        candidate: e.candidate.candidate,
        sdpMid: e.candidate.sdpMid
      });
    }
  };
  // when the other side added a media stream, show it on screen
  pc.onaddstream = e => {
    console.log('onaddstream', e);
    remoteStream = e.stream;
    callback(remoteStream);
  };

  pc.oniceconnectionstatechange = e => {
    console.log('oniceconnectionstatechange', e.target.iceConnectionState);
    if (e.target.iceConnectionState === 'connected') {
      // createDataChannel();
    }
  };

  pc.onnegotiationneeded = () => {
    console.log('onnegotiationneeded');
    createOffer();
  };

  // attach local media to the peer connection
  pc.addStream(localStream);

  const createDataChannel = () => {
    if (pc.textDataChannel) {
      return;
    }
    const dc = pc.createDataChannel("text");
    dc.onmessage = e => {
      var msg = JSON.parse(e.data);
      console.log('received message over data channel:' + msg);
    };
    dc.onclose = () => {
      remoteStream.getVideoTracks()[0].stop();
      console.log('The Data Channel is Closed');
    };
    pc.textDataChannel = dc;
  };

  return pc;
}

export function getLocalStream(isFront, callback) {
  let videoSourceId;

  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (const i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: config.video.minWidth,
        minHeight: config.video.minHeight,
        minFrameRate: config.video.minFrameRate
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
    }
  }, function (stream) {
    console.log('getUserMedia success', stream);
    callback(stream);
  }, logError);
}

