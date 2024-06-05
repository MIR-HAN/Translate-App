import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlices";
import translateReducer from "./slices/translateSlace";

export default configureStore({
    reducer:{languageReducer,translateReducer}
})