import { GET_MULTITENANTCUSTOMERINFO } from '../../Types/MultiTenantTypes/MultiTenantTypes'

const initialState = {
    multiTenantCustomerName: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MULTITENANTCUSTOMERINFO:
      return {
        ...state,
        multiTenantCustomerName: action.payload || ""
      }
    default:
      return state
  }
}