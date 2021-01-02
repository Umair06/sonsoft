import { GET_ADVANCEDSEARCHQUERY,GET_ADVANCEDSEARCHTYPELIST } from '../../Types/AdvancedSearchTypes/AdvancedSearchTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADVANCEDSEARCHQUERY:
      return {
        ...state,
        advancedquery: action.payload.advancedQuery
      }
      case GET_ADVANCEDSEARCHTYPELIST:
      return {
        ...state,
        advancedtypelist: action.payload.advancedtypelist
      }
default:
      return state
  }
};