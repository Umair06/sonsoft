import {GET_ROLE,GET_ASSIGNROLE,ERROR,GET_ROLEID,SUCCESS,GET_USER_PER_ROLE} from '../../Types/RoleManagementTypes/RoleManagementTypes'

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
       
        success: action.payload.success
      }
    
    case GET_ROLE:
      return {
        ...state,
       
        role: action.payload.role
      }
    
      case GET_ASSIGNROLE:
      return {
        ...state,
       
        assignRole: action.payload.assignRole
      }
      case GET_ROLEID:
      return {
        ...state,
       
        roleId: action.payload.roleId
      }
      case GET_USER_PER_ROLE:
        return {
          ...state,
         
          userperrole: action.payload.userperrole
        }
      case ERROR:
        return {
          ...state,
          error:action.payload.error
        }
   default:
      return state
  }
};