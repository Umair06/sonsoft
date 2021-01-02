import { GET_MULTITENANTCUSTOMERINFO } from '../../Types/MultiTenantTypes/MultiTenantTypes'

export const getMultiTenantCustomerInfo = data => {
    return {
      type: GET_MULTITENANTCUSTOMERINFO,
      payload: data
    };
  };
  