import * as ApiInfo from "../../../APIConfig/ApiParameters";

export const SortedUser = (userRoles, response) => {
  try {
    let currentUserRoleData;
    if (response.data.status === 200) {
      const roleId = response.data.data.output[0].role_id.toString();
      currentUserRoleData = userRoles[roleId];
      ApiInfo.DEBUGER && console.log("currentUserRoleData", currentUserRoleData);
      return currentUserRoleData;
    } else return null;
  } catch (e) {
    ApiInfo.DEBUGER && console.log("roles utils error", e.message);
    return null;
  }
};
