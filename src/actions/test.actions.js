import { actionTypes } from "../constants";

export const testAction = val => {
    return {
        type: actionTypes.test.TEST_ACTION,
        payload: val
    };
};