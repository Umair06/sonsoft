import { GET_STUBPOLICY,GET_STUBPOLICYSETTING,GET_ARCHIVEDUSERLIST } from '../../Types/PoliciesTypes/PoliciesTypes'


const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_STUBPOLICY:
            return {
                ...state,
                stubpolicy: action.payload.stubpolicy
            }
            case GET_STUBPOLICYSETTING:
            return {
                ...state,
                stubsetting: action.payload.stubsetting
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