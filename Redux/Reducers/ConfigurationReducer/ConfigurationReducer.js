import {GET_APPLICATIONPARAMETERS ,ERROR,GET_ACTIVEDIRECTORYLIST,GET_OULIST,GET_GENERAL,GET_DEPLOYMENT,GET_DEPLOYMENT_SITES,GET_OULISTBYID} from '../../Types/ConfigurationTypes/ConfigurationTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case GET_APPLICATIONPARAMETERS:
      return {
        ...state,
        applicationParameter: action.payload.applicationParameter
      }
      case GET_ACTIVEDIRECTORYLIST:
      return {
        ...state,
        activeDirectory: action.payload.activeDirectory
      }
      case GET_OULIST:
      return {
        ...state,
        OUlist: action.payload.OUlist
      }
      case GET_OULISTBYID:
      return {
        ...state,
        OUListById: action.payload.OUListById
      }
      case GET_GENERAL:
      return {
        ...state,
        general: action.payload.general
      }
      case ERROR:
      return {
        ...state,
       error: action.payload.error
      }
      case GET_DEPLOYMENT:
      return {
        ...state,
       deployment: action.payload.deployment
      }
      case GET_DEPLOYMENT_SITES:
      return {
        ...state,
       deploymentsites: action.payload.deploymentsites
      }
   default:
      return state
  }
};