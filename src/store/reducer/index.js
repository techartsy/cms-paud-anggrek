import { combineReducers } from "redux";
import cmsReducer from "./cmsReducer";

const rootReducer = combineReducers({
  cmsReducer: cmsReducer,
});

export default rootReducer;
