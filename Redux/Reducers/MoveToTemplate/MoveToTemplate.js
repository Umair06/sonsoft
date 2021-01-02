import { MOVE_TO_TEMPLATE } from '../../Types/MoveToTemplate/MoveToTemplate';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVE_TO_TEMPLATE:
      return {
        ...state,
        customHistory: action.payload.updatedHistory
      }
    default:
      return state
  }
}