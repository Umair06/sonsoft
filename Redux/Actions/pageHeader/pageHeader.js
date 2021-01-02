import {DATATABLEACTIONS} from "../../Types/pageHeaderTypes";

export const updateDataTableActions = actions => dispatch => {
  dispatch({
    type: DATATABLEACTIONS,
    payload: {
      updatedActions: actions
    }
  })
}

