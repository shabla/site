import { actionTypes } from "../constants";

export const testAction = () => {
    return {
        type: actionTypes.test.TEST_ACTION,
        payload: "hello!"
    };
};