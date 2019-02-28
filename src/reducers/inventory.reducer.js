import { createReducer } from "redux-starter-kit";

import actions from "actions";

const initialState = {
    width: 10,
    height: 10,
    boxSize: 32
};

export default createReducer(initialState, {
    [actions.inventory.setBoxSize]: (state, action) => {
        state.boxSize = action.payload;
    },
});