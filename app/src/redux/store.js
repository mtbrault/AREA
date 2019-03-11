import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist'
import LocalStorage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage: LocalStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, compose(applyMiddleware(thunk, logger)));

export default store;