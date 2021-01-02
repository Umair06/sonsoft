import {GET_HISTORICDOMAIN,GET_ARCHIVEDUSERLIST} from '../../Types/HistoricDomainTypes/HistoricDomainTypes'

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case GET_HISTORICDOMAIN:
      return {
        ...state,
        historicdomain: action.payload.historicdomain
      }
      case GET_ARCHIVEDUSERLIST:
      return {
        ...state,
        archiveduserlist: action.payload.archiveduserlist
      }
      
     
   default:
      return state
  }
};