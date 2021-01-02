import { MOVE_TO_TEMPLATE } from '../../Types/MoveToTemplate/MoveToTemplate';

export const updateHistory = (history, pathname, state) => dispatch => {
  history && history.push({
    pathname: pathname,
    state: { navigationState: state }
  })
  dispatch({
    type: MOVE_TO_TEMPLATE,
    payload: {
      updatedHistory: history
    }
  })

}

export const goBack = (history) => dispatch => {
  history && history.goBack()
  // push({
  //   pathname: pathname,
  //   state: { navigationState: state }
  // })
  dispatch({
    type: MOVE_TO_TEMPLATE,
    payload: {
      updatedHistory: history
    }
  })

}

export const replace = (history, pathname) => dispatch => {
  history && history.replace(pathname)
  dispatch({
    type: MOVE_TO_TEMPLATE,
    payload: {
      updatedHistory: history
    }
  })

}