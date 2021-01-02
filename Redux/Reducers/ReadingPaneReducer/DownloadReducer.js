import {GET_DOWNLOAD,GET_EMAIL} from '../../Types/ReadingPaneTypes/ReadingPaneTypes'


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_DOWNLOAD:
      return {
        ...state,
        downloadData:action.payload.downloadData
      }
      case GET_EMAIL: 
      return {
        ...state,
        email: action.payload.email
      }
    
        default:
      return state
  }
};