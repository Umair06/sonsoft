import { ROWACTIONS } from '../../Types/ActionRowType/ActionRowType'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ROWACTIONS:
        return {
          ...state,
          updatedRowActions: action.payload.updatedRowActions
        }
    default:
      return state
  }
}