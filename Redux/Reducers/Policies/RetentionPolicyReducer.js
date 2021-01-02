import { GET_RETENTIONPOLICYLIST,GET_RETENTIONPOLICYSETTINGLIST,GET_DEFAULTRETENTION,GET_RETENTIONPOLICYBYID,GET_DELETEDDOCUMENTPOLICY ,GET_DELETEDDOCUMENTPOLICYRUNNINGSTATUS,GET_DELETEDDOCUMENTDATA} from '../../Types/PoliciesTypes/PoliciesTypes'


const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_RETENTIONPOLICYLIST:
            return {
                ...state,
                retention: action.payload.retention
            }
            case GET_RETENTIONPOLICYSETTINGLIST:
                return {
                    ...state,
                    retentionsetting: action.payload.retentionsetting
                }
                case GET_DEFAULTRETENTION:
                return {
                    ...state,
                defaultretention:action.payload.defaultretention
                }
               
                case GET_RETENTIONPOLICYBYID:
                return {
                    ...state,
                    retentionbyid: action.payload.retentionbyid
                }
                case GET_DELETEDDOCUMENTPOLICY:
                return {
                    ...state,
                    deleteddocument: action.payload.deleteddocument
                }
                case GET_DELETEDDOCUMENTPOLICYRUNNINGSTATUS:
                return {
                    ...state,
                    deleteddocumentrunning: action.payload.deleteddocumentrunning
                }
                case GET_DELETEDDOCUMENTDATA:
                    return {
                        ...state,
                        deleteddocumentdata: action.payload.deleteddocumentdata
                    }
            default:
            return state
    }
};