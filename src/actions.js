import {
  UPDATE_CONNECTION,
  CHANGE_ROOM,
  SHOW_CONTROL,
  INIT_STATE
} from './constants'

export function updateConnection(data) {
  return {
    type: UPDATE_CONNECTION,
    data: data
  }
}

export function changeRoom(room) {
  return {
    type: CHANGE_ROOM,
    room: room
  }
}

export function showControl(data) {
  return {
    type: SHOW_CONTROL,
    data: data
  }
}

export function initState(room) {
  return {
    type: INIT_STATE,
    room: room
  }
}