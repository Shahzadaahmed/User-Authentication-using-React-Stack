// Note: Main Reducer File...!

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth-reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users']
}

const rootReducer = combineReducers({
    users: authReducer
});

export default persistReducer(persistConfig, rootReducer);