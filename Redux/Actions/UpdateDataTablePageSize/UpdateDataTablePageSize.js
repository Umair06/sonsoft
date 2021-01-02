import { UPDATE_DATATABLE_PAGE_SIZE } from "../../Types/UpdateDataTablePageSizeTypes/UpdateDataTablePageSizeTypes";
// import * as ApiInfo from "../../../../src/APIConfig/ApiParameters"
export const updateDataTablePageSize = (pageSize, pageLabel) => dispatch => {
  // ApiInfo.DEBUGER && console.log("pageSize from updateDataTablePageSize", pageSize)
  dispatch({
    type: UPDATE_DATATABLE_PAGE_SIZE,
    payload: {
      pageLabel,
      dataTablePageSize: pageSize
    }
  })
}

