import { GET_EXPORTDROPDOWN,GET_EXPORTDOWNLOADLINK } from '../../Types/ExportTypes/ExportTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EXPORTDROPDOWN:
      return {
        ...state,
        exportDropDown: action.payload.exportDropDown
      }
    case GET_EXPORTDOWNLOADLINK:
      return {
        ...state,
        exportDownloadLink: action.payload.exportDownloadLink
     }
    default:
      return state
  }
};