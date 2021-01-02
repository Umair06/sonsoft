import {GET_FORWARD } from '../../Types/ReadingPaneTypes/ReadingPaneTypes'


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_FORWARD:
      return {
        ...state,
        forwardData:action.payload.forwardData
      }
    
        default:
      return state
  }
};