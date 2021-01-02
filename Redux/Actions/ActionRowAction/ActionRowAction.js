

import { ROWACTIONS } from "../../Types/ActionRowType/ActionRowType";


export const updateRowActions = updatedRowActions => {
    return {
        type: ROWACTIONS,
        payload: {
            updatedRowActions
        }
    }
};