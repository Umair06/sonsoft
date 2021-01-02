import {GET_ARCHIVEDUSERLIST,GET_FOLDERSYNCUSERS,GET_FOLDERSYNCHISTORY} from '../../Types/PoliciesTypes/PoliciesTypes'


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case GET_FOLDERSYNCUSERS:
      return {
        ...state,
        foldersyncusers: action.payload.foldersyncusers
      }
      case GET_FOLDERSYNCHISTORY:
      return {
        ...state,
        foldersynchistory: action.payload.foldersynchistory
      }
      
      case GET_ARCHIVEDUSERLIST:
      return {
        ...state,
        archivedusers: action.payload.archivedusers
      }
      
   default:
      return state
  }
};