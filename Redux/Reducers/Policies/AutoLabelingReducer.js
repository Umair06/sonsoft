import {
  GET_GLOBAL_AUTO_LABELING,
  GET_LEGAL_HOLD_AUTO_LABELING,
  GET_SORTED_GLOBAL_LABEL
} from '../../Types/PoliciesTypes/PoliciesTypes'


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GLOBAL_AUTO_LABELING:
      return {
        ...state,
        globalAutoLabels: action.payload.globalAutoLabels
      }
    case GET_LEGAL_HOLD_AUTO_LABELING:
      return {
        ...state,
        legalHoldAutoLabels: action.payload.legalHoldAutoLabels
      }
    case GET_SORTED_GLOBAL_LABEL:
      return {
        ...state,
        treeDataOfGlobalLabel: action.payload.treeDataOfGlobalLabel
      }
    default:
      return state
  }
};