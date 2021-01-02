import {
    APPLY_LEGAL_HOLD_DATA
  } from "../../Types/ApplyLegalHoldType/ApplyLegalHoldType";


export const ApplyLegalHoldData = data => dispatch => {
    dispatch({
        type: APPLY_LEGAL_HOLD_DATA,
        payload: {
            applyLegalHoldData: data
        }
    })
};
