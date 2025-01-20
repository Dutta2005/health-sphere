import { configureStore, combineReducers} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import themeSlice from './themeSlice'

const persistCofig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    theme: themeSlice
});

const persistedReducer = persistReducer(persistCofig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })    
})