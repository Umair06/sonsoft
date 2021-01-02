import {GET_EMAILSERVER,GET_EMAILSERVEREDITDETAILS,GET_EMAILSERVERCOMBO} from '../../Types/EmailServerTypes/EmailServerTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case GET_EMAILSERVER:
      return {
        ...state,
        emailserver: action.payload.emailserver
      }
      case GET_EMAILSERVEREDITDETAILS:
      return {
        ...state,
        emailservereditdetails: action.payload.emailservereditdetails
      }
      case GET_EMAILSERVERCOMBO:
        return {
          ...state,
          emailservercombo: action.payload.emailservercombo
        }
        
      
     
   default:
      return state
  }
};