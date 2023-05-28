import reducer from './reducer.jsx';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";

const rootreducer = combineReducers({
    oneMinuteStory: reducer,
})

const store = createStore(rootreducer, applyMiddleware(thunk));

window.myStore = store;

export default store;