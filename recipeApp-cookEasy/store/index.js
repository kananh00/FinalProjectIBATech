import { createStore, combineReducers } from "redux";
import { dataReducer } from "./data";
import { updateAS, getDataFromAS } from "../utils/storeDataAS";

import {
    MODULE_NAME as recipesModuleName,
    dataReducer as recipesReducer,
  } from "./data";
  
const rootReducer = combineReducers({
  data: dataReducer,
});
// const rootReducer = combineReducers({
//     [recipesModuleName]: recipesReducer,
    
//   })
  

const store = createStore(rootReducer);

store.subscribe(() => updateAS(store));
getDataFromAS(store);

export default store;