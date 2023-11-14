import reducer from './reducer.jsx';
import { createStore, applyMiddleware, combineReducers } from "redux";
// import persistReducer from 'redux-persist/es/persistReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
// import logger from "redux-logger";

const rootreducer = combineReducers({
    oneMinuteStory: reducer,
});

const persistConfig = {
    key: 'root',
    versions: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootreducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

window.myStore = store;

export const persistor = persistStore(store);
// export default store;