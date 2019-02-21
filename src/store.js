import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store;