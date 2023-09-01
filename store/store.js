import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


// export default configureStore({
//     reducer: {
//         cart: cartSlice
//     },
// })

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    cart: cartSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)


export default configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})