import { combineReducers } from "redux";
import { createStore } from "redux";
import { SinhVienReducer } from "./SinhVienReducer";

const rootReducer = combineReducers({
    SinhVienReducer
})

export const store = createStore(rootReducer)