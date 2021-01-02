import { GET_SMTP,GET_NOTIFICATION,GET_SELECTED_NOTIFICATION,GET_NOTIFICATION_DROPDOWN_LIST} from "../../Types/NotificationTypes/NotificationTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SMTP:
      return {
        ...state,
        SMTPdata: action.payload.SMTPdata
      }

      case GET_NOTIFICATION:
      return {
        ...state,
        notificationlist: action.payload.notificationlist
      }
      case GET_SELECTED_NOTIFICATION:
      return {
        ...state,
        selectednotification: action.payload.selectednotification
      }
      case GET_NOTIFICATION_DROPDOWN_LIST:
      return {
        ...state,
        notificationdropdownlist: action.payload.notificationdropdownlist
      }
    default:
      return state
  }
}