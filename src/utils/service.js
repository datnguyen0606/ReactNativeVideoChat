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

function sendData(msg) {
  dc.send(JSON.stringify(msg));
}
function setupDataHandlers() {
  dc.onmessage = e => {
    var msg = JSON.parse(e.data);
    console.log('received message over data channel:' + msg);
  };
  dc.onclose = () => {
    remoteStream.getVideoTracks()[0].stop();
    console.log('The Data Channel is Closed');
  };
}

function setDescription(offer) {
  return pc.setLocalDescription(offer);
}

  // send the offer to a server to be forwarded to the other peer
function sendDescription(socket) {
  socket.send(pc.localDescription);
}

let dc = null;
let pc = null;
let localStream = null;
let remoteStream = null;

export function initPC(state, socket, localStream, callback) {
  socket.on('message', (message) => {
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
      });

      // pc.setRemoteDescription(new RTCSessionDescription(message));

    } else if (message.type === 'answer') {
      // set remote description
      pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate') {
      // add ice candidate
      pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: message.mlineindex,
          candidate: message.candidate
        })
      );
    }
  });

  const attachMediaIfReady = () => {
    dc = pc.createDataChannel('chat');
    setupDataHandlers();
    console.log('attachMediaIfReady')
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
        candidate: e.candidate.candidate
      });
    }
  };
  // when the other side added a media stream, show it on screen
  pc.onaddstream = e => {
    console.log('onaddstream', e);
    remoteStream = e.stream;
    callback(remoteStream);
  };
  pc.ondatachannel = e => {
    // data channel
    dc = e.channel;
    setupDataHandlers();
    sendData({
      peerMediaStream: {
        video: localStream.getVideoTracks()[0].enabled
      }
    });
    //sendData('hello');
  };
  // attach local media to the peer connection
  pc.addStream(localStream);
  if (state.user === 'host') {
    getLocalStream(state.isFront, attachMediaIfReady)
  }

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

