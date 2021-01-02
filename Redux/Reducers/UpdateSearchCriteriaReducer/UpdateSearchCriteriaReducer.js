import { UPDATE_SEARCH_CRITERIA, SEARCH_CRITERIA_FOR_ADVANCE_SEARCH, UPDATE_SEARCH_CRITERIA_FOR_MY_ARCHIVED_EMAIL, SEARCH_CRITERIA_FOR_ADVANCE_SEARCH_FOR_MY_ARCHIVED_EMAIL } from "../../Types/UpdateSearchCriteriaTypes/UpdateSearchCriteriaTypes";

const initialState = {
  updatedSearchCriteria: "",
  updatedAdvanceSearch: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_CRITERIA:
      return {
        ...state,
        updatedSearchCriteria: action.payload.updatedSearchCriteria,
        searchType: action.payload.searchType,
        searchTypeTree: action.payload.searchTypeTree,
        savedSearchName: action.payload.savedSearchName,
      }
    case SEARCH_CRITERIA_FOR_ADVANCE_SEARCH:
      return {
        ...state,
        updatedAdvanceSearch: action.payload.updatedAdvanceSearch
      }
    case UPDATE_SEARCH_CRITERIA_FOR_MY_ARCHIVED_EMAIL:
      return {
        ...state,
        updatedSearchCriteriaInMyArchivedEmails: action.payload.updatedSearchCriteria,
        searchTypeInMyArchivedEmails: action.payload.searchType
      }
    case SEARCH_CRITERIA_FOR_ADVANCE_SEARCH_FOR_MY_ARCHIVED_EMAIL:
      return {
        ...state,
        updatedAdvanceSearchInMyArchivedEmails: action.payload.updatedAdvanceSearch
      }
    default:
      return state
  }
}
