import {
  UPDATE_CONNECTION,
  CHANGE_ROOM,
  SHOW_CONTROL,
  INIT_STATE
} from '../constants'


function genState(room=null) {
  return {
    localVideoSrc: null,
    remoteVideoSrc: null,
    isFront: true,
    connection: "",
    user: "",
    room: room || `${new Date() - new Date().setHours(0, 0, 0, 0)}`,
    message: "",
    sid: "",
    video: true,
    audio: true,
    showControl: false
  }
}

const initialState = genState();


export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_STATE:
      return genState(action.room);
    case UPDATE_CONNECTION:
    case SHOW_CONTROL:
      return Object.assign({}, state, action.data);
    case CHANGE_ROOM:
      return Object.assign({}, state, {
        room: action.room
      });
    default:
      return state
  }
}