import { GET_USER_TASKS } from '../../Types/UserTasksTypes/UserTasksTypes';
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload.userTasks
      }
    default:
      return state
  }
};