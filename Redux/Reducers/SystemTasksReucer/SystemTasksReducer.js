import { GET_SYSTEM_TASKS } from '../../Types/SystemTasksTypes/SystemTasks';
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_SYSTEM_TASKS:
      return {
        ...state,
        systemTasks: action.payload.systemTasks
      }
    default:
      return state
  }
};