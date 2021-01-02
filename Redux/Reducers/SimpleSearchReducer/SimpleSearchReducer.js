import {
  GET_SIMPLESEARCH,
  CLEAR_SEARCHED_RESULTS,
  TOTAL_SIMPLE_SEARCHED_DOCS,
  GET_SIMPLESEARCHRESULT,
  LOADING,
  GET_SAVEDSEARCH,
  ERROR,
  EMPTY_ATTACHMENT,
  SUCCESS,
  QUERYBUILDER,
  GET_ATTACHMENTID,
  MOVED_TO_FILTER,
  GET_ATTACHMENT_SAVE,
  SMARTSEARCHACESSTOKEN,
  GETFILTERAGGREGATIONS
} from "../../Types/SimpleSearchTypes/SimpleSearchTypes";
// import { GetAttachmentSave } from "../../Actions/SimpleSearchAction/SimpleSearchAction";

const initialState = {
  ReturnValueOfReadingPane: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case QUERYBUILDER:
      return {
        ...state,
        query: action.payload.query,
        moveToFilter: true
      };
    case GET_ATTACHMENTID:
      return {
        ...state,
        attachmentid: action.payload.attachmentid
      };
    case EMPTY_ATTACHMENT:
      return {
        ...state,
        attachmentid: undefined
      };

    case (CLEAR_SEARCHED_RESULTS):
      if (!action.payload.notRemoveFilter) {
        return {
          ...state,
          simplesearchresult: null,
          moveToFilter: false,
          filterAggregations: null
        };
      } else {
        return {
          ...state,
          simplesearchresult: null
        };
      }

    case TOTAL_SIMPLE_SEARCHED_DOCS:
      return {
        ...state,
        searchedDataLength: action.payload.searchedDataLength
      };
    case SUCCESS:
      return {
        ...state,
        success: action.payload.success
      };
    case LOADING:
      return {
        ...state,
        loaded: action.payload.loaded
      };
    case GET_SIMPLESEARCH:
      return {
        ...state,
        simpleSearch: action.payload.simplesearch
      };
    case GET_SAVEDSEARCH:
      return {
        ...state,
        savedSearch: action.payload.savedSearch
      };
    case GET_SIMPLESEARCHRESULT:
      return {
        ...state,
        simplesearchresult: action.payload.simplesearchresult,
        moveToFilter:
          action.payload.simplesearchresult &&
          action.payload.simplesearchresult.length &&
          true
        // loading: action.payload.loading
      };
    case MOVED_TO_FILTER:
      return {
        ...state,
        moveToFilter: action.payload.filter
      };
    case ERROR:
      return {
        ...state,
        [action.payload.errorVariable]: action.payload.isError
        // moveToFilter: false
      };

    case GET_ATTACHMENT_SAVE:
      return {
        ...state,
        ReturnValueOfReadingPane: action.payload
      }

    case SMARTSEARCHACESSTOKEN:
      return {
        ...state,
        smartSearchAccessToken: action.payload.token
      }

    case GETFILTERAGGREGATIONS:
      return {
        ...state,
        filterAggregations: action.payload.filterAggregations
      }

    default:
      return state;
  }
}
