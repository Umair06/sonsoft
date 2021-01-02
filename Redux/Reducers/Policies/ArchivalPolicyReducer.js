import { GET_USERLIST, GET_SELECTEDUSERLIST, GET_EXTERNALUSERLIST, ADD_EXTERNALUSER, DELETE_EXTERNALUSER,GET_ARCHIVALUSERTYPE } from '../../Types/PoliciesTypes/PoliciesTypes'


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_USERLIST:
      return {
        ...state,
        users: action.payload.users
      }
    case GET_SELECTEDUSERLIST:
      return {
        ...state,
        selectedusers: action.payload.selectedusers
      }
    case GET_EXTERNALUSERLIST:
      return {
        ...state,
        externalusers: action.payload.externalusers
      }
      case GET_ARCHIVALUSERTYPE:
        return {
          ...state,
          archivalusertype: action.payload.archivalusertype
        }
    case ADD_EXTERNALUSER:
      return {
        ...state,
        externalusers:state.externalusers && state.externalusers.concat(action.payload.addexternalusers)
      }
    case DELETE_EXTERNALUSER:
      return{
        ...state,
        externalusers:action.payload.deleteexternaluser
      }
      
        default:
      return state
  }
};