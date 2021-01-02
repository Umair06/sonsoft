import { UPDATE_SELECTED_RECORDS, RESET_SELECTED_DOCUMENTS } from "../../Types/updateSeletedRecordsTypes/updateSelctedRecords";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_RECORDS:
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys
      }
    case RESET_SELECTED_DOCUMENTS:
      return {
        ...state,
        selectedRowKeys: []
      }
    default:
      return state
  }
}