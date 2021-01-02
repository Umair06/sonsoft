import { UPDATE_SELECTED_RECORDS, RESET_SELECTED_DOCUMENTS } from "../../Types/updateSeletedRecordsTypes/updateSelctedRecords";

export const updateSelectedRecords = (selectedRowKeys) => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_RECORDS,
    payload: {
      selectedRowKeys
    }
  });
};

export const resetSelectedRecords = () => dispatch => {
  dispatch({
    type: RESET_SELECTED_DOCUMENTS
  });
};
