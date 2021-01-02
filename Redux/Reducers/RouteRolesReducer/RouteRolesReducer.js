import SORT_ROLES_ARRAY, { REMOVE_ALL_ROlES } from '../../Types/GetUserRoleType/GetUserRoleType'
import ROLES_DATA from './ROLES_DATA'
import { SortedUser } from './roles.utils'

const INITIAL_STATE = {
  // routeRoles: ROLES_DATA,
}

const RouteRolesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SORT_ROLES_ARRAY:
      return {
        ...state,
        currentUserRole: SortedUser(ROLES_DATA, action.payload)
      }
    case REMOVE_ALL_ROlES:
      return {
        ...state,
        routeRoles: null
      }
    default:
      return state;
  }
}


export default RouteRolesReducer
