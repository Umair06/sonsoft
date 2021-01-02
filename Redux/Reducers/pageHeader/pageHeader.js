import { DATATABLEACTIONS } from "../../Types/pageHeaderTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATATABLEACTIONS:
      return {
        ...state,
        actions: action.payload.updatedActions
      }
    default:
      return state
  }
}