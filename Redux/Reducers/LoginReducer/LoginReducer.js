import { GET_AUTHENTICUSERINFO } from '../../Types/LoginTypes/LoginTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUTHENTICUSERINFO:
      return {
        ...state,
        authenticUserInfo: action.payload
      }
    default:
      return state
  }
}