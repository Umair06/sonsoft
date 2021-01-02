import { MOVE_TO_TEMPLATE } from '../../../Types/MoveToTemplate/MoveToTemplate';

const moveToTemplate = (history, cardTitle, children, uid) => dispatch => {
  let route;
  let cardName = cardTitle.toLowerCase()
  let cardPath = cardName.split(' ').join('');
  // if (cardPath === "policies") {
  //   console.log("children", children)
  //   route = "/policies" + children
  //   history.push(route)
  // } else {
    if (cardPath === "control center") {
      route = "/controlcenter" + children 
      history && history.push(route)
    } else {
      if (cardPath === "scheduler") {
        route = "/scheduler" + children
        history && history.push(route)
      } else {
        route = "/" + cardPath + children 
        history && history.push(route)
      }
    // }
  }
  dispatch({
    type: MOVE_TO_TEMPLATE,
    payload: {
      updatedHistory: history
    }
  })
}

export default moveToTemplate