import { createAction } from "redux-starter-kit";

export const setBoxSize = createAction("inventory/setBoxSize");
export const addRow = createAction("inventory/addRow");
export const removeRow = createAction("inventory/removeRow");
export const addColumn = createAction("inventory/addColumn");
export const removeColumn = createAction("inventory/removeColumn");