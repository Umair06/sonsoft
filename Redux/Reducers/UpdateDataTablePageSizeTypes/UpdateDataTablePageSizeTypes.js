import { UPDATE_DATATABLE_PAGE_SIZE } from "../../Types/UpdateDataTablePageSizeTypes/UpdateDataTablePageSizeTypes";
const initialState = {
  searchDatatablePageSize: 20,
  onHoldDatatablePageSize: 20
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATATABLE_PAGE_SIZE:
      return {
        ...state,
        [action.payload.pageLabel]: action.payload.dataTablePageSize
      }
    default:
      return state
  }
}