import { UPDATE_SEARCH_CRITERIA, SEARCH_CRITERIA_FOR_ADVANCE_SEARCH, UPDATE_SEARCH_CRITERIA_FOR_MY_ARCHIVED_EMAIL, SEARCH_CRITERIA_FOR_ADVANCE_SEARCH_FOR_MY_ARCHIVED_EMAIL } from "../../Types/UpdateSearchCriteriaTypes/UpdateSearchCriteriaTypes";

export const updateSearchCriteria = (searchedData, searchType, searchTypeTree, savedSearchName) => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_CRITERIA,
    payload: {
      updatedSearchCriteria: searchedData,
      searchType: searchType,
      searchTypeTree: searchTypeTree || "",
      savedSearchName : savedSearchName || ""
    }
  });
};

export const updateAdvanceSearch = criteriaData => dispatch => {
  dispatch({
    type: SEARCH_CRITERIA_FOR_ADVANCE_SEARCH,
    payload: {
      updatedAdvanceSearch: criteriaData,
    }
  });
};

export const updateSearchCriteria_MYARCHIVEDEMAILS = (searchedData, searchType) => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_CRITERIA_FOR_MY_ARCHIVED_EMAIL,
    payload: {
      updatedSearchCriteria: searchedData,
      searchType: searchType
    }
  });
};

export const updateAdvanceSearch_MYARCHIVEDEMAILS = criteriaData => dispatch => {
  dispatch({
    type: SEARCH_CRITERIA_FOR_ADVANCE_SEARCH_FOR_MY_ARCHIVED_EMAIL,
    payload: {
      updatedAdvanceSearch: criteriaData,
    }
  });
};