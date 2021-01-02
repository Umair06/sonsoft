import { GET_USERS, GET_USERTYPE } from '../../Types/UserManagementTypes/UserManagementTypes'
import { GET_MAILBOXACCESS_DELETED_USERS } from '../../Types/SecurityTypes/SecurityTypes';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERTYPE:
      return {
        ...state,
        userType: action.payload.userType
      }

    case GET_USERS:
      return {
        ...state,
        users: action.payload.users
      }

    case GET_MAILBOXACCESS_DELETED_USERS:
      return {
        ...state,
        deletedMailBoxAccessData: action.payload
      }

    default:
      return state
  }
};