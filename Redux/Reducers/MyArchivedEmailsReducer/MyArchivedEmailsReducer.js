import { GET_FOLDER_STRUCTURE, GET_ALL_MAILBOXES, GET_FOLDER_RELATED_DOCUMENTS, TOTAL_FOLDER_DOCS } from "../../Types/MyArchivedEmailsTypes/MyArchivedEmailsTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOLDER_STRUCTURE:
      return {
        ...state,
        mailboxFolderStructure: action.payload.mailboxFolderStructure
      }
    case GET_ALL_MAILBOXES:
      return {
        ...state,
        mailboxes: action.payload.mailboxes
      }
    case TOTAL_FOLDER_DOCS:
      return {
        ...state,
        totalFolderDocs: action.payload.totalFolderDocs
      }
    case GET_FOLDER_RELATED_DOCUMENTS:
      return {
        ...state,
        folderRelatedDocuments: action.payload.folderRelatedDocuments
      }
    default:
      return state
  }
}