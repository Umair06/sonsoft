import SORT_ROLES_ARRAY, { REMOVE_ALL_ROlES } from '../../Types/GetUserRoleType/GetUserRoleType';

const GetUserRole = (roleArray) => ({
  type: SORT_ROLES_ARRAY,
  payload: roleArray
})

export const removeAllRoles = () => ({
  type: REMOVE_ALL_ROlES
})

export default GetUserRole
