import produce from "immer";
import { actionTypes } from "../constants"

const initialState = {
    val: 0
};

export default (state = initialState, action) => {
    return produce(state, draft => {
        const actions = {
            [actionTypes.test.TEST_ACTION]: () => {
                draft.val = action.payload;
            }
        };

        actions[action.type] ? actions[action.type]() : undefined;
    });
};