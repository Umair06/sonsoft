import { APPLY_LEGAL_HOLD_DATA } from '../../Types/ApplyLegalHoldType/ApplyLegalHoldType'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case APPLY_LEGAL_HOLD_DATA:
      return {
        ...state,
        applyLegalHoldData: action.payload
      }
    default:
      return state
  }
}