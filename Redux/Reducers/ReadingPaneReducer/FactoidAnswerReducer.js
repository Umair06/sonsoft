import { GET_FACTOID_ANSWER } from '../../Types/ReadingPaneTypes/ReadingPaneTypes'


const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FACTOID_ANSWER:
            return {
                ...state,
                factoidAnswer: action.payload.factoidAnswer
            }
        default:
            return state
    }
};