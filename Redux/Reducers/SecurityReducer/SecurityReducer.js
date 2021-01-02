import {
  GET_SSO, GET_MAILBOXACCESS,
  // GET_MAILBOXACCESS_DELETED_USERS
} from "../../Types/SecurityTypes/SecurityTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SSO:
      return {
        ...state,
        SSOdata: action.payload.SSOdata
      }
    case GET_MAILBOXACCESS:
      return {
        ...state,
        mailboxaccess: action.payload.mailboxaccess
      }
    default:
      return state
  }
}