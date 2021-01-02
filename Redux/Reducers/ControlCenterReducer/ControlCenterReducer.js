import { GET_STATISTIC, GET_CONFIGURATION, GET_STATUS, GET_LICENSE, GET_LICENSE_INFORMATION, LICENSE_UPLOAD } from '../../Types/ControlCenterTypes/ControlCenterTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_STATISTIC:
      return {
        ...state,
        statistic: action.payload.statistic
      }
    case GET_CONFIGURATION:
      return {
        ...state,
        configuration: action.payload.configuration
      }
    case GET_STATUS:
      return {
        ...state,
        status: action.payload.status
      }
    case GET_LICENSE:
      return {
        ...state,
        license: action.payload.license
      }
    case GET_LICENSE_INFORMATION:
      return {
        ...state,
        licenseInformation: action.payload.licenseInformation
      }
    case LICENSE_UPLOAD:
      return {
        ...state,
        uploadedlicense: action.payload.uploadedlicense
      }

    default:
      return state
  }
};