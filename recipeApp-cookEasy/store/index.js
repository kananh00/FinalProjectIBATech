import { createStore, combineReducers,applyMiddleware } from "redux";
import { dataReducer } from "./data";
import { updateAS, getDataFromAS } from "../utils/storeDataAS";
import {AsyncStorage} from 'react-native'
import {persistStore,persistReducer} from 'redux-persist';
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {
    MODULE_NAME as recipesModuleName,
    dataReducer as recipesReducer,
  } from "./data";

  import {
    MODULE_NAME as authModuleName,
    reducer as authReducer,
  } from "./auth";
  
  import {
    MODULE_NAME as favWishModuleName,
    reducer as favWishReducer,
  } from "./wishAndFav";
  import {
    MODULE_NAME as themeModuleName,
    reducer as themeReducer,
  } from "./theme";
  
const config = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  data: dataReducer,
  [authModuleName]: authReducer,
  [favWishModuleName]: favWishReducer,
  [themeModuleName]: themeReducer,
});
// const rootReducer = combineReducers({
//     [recipesModuleName]: recipesReducer,
    
//   })
  // const rootReducer = combineReducers({
  //   [authModuleName]: authReducer,
    
  // })
  


 const rootPersistReducer = persistReducer(config, rootReducer);

 const store = createStore(
   rootPersistReducer,
   composeWithDevTools(applyMiddleware(thunk))
 );
 
 export const persistor = persistStore(store);

store.subscribe(() => updateAS(store));

export default store;