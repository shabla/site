import { createReducer } from "redux-starter-kit";

import actions from "actions";

const initialState = [];

export default createReducer(initialState, {
    [actions.items.add]: (state, action) => {
        state.push(action.payload.item);
    },
    [actions.items.remove]: (state, action) => {
        const item = action.payload;
        const index = state.indexOf(item);
        if (index === -1) {
            console.warn("couldn't find item to remove", item);
            return state;
        }
        state.splice(index, 1);
    },
});