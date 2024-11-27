import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

import {persistCombineReducers} from 'redux-persist';

const persistConfig = {
    key:'root',
    storage,
    // whitelist:['auth']
};

const persistedReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer)
});

const store = configureStore({
    reducer:persistedReducer
});

export const persistor = persistStore(store);
export default store;
