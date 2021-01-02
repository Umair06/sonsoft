import { GET_LEGAL_HOLDS, GET_ON_HOLD_DOCUMENTS, CLEAR_ON_HOLD_DOCUMENTS, TOTAL_ON_HOLD_DOCS, ON_HOLD_API_BODY_DATA } from "../../Types/LegalHoldTypes/LegalHoldTypes";

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEGAL_HOLDS:
      return {
        ...state,
        legalHolds: action.payload.legalHolds
      }
    case TOTAL_ON_HOLD_DOCS:
      return {
        ...state,
        onHoldDataLength: action.payload.onHoldDataLength
      }
    case GET_ON_HOLD_DOCUMENTS:
      return {
        ...state,
        onHoldDocuments: action.payload.onHoldDocuments
      }
    case CLEAR_ON_HOLD_DOCUMENTS:
      return {
        ...state,
        onHoldDocuments: undefined
      }
    case ON_HOLD_API_BODY_DATA:
      return {
        ...state,
        apiBodyData: action.payload.apiBodyData
      }
    default:
      return state
  }
}