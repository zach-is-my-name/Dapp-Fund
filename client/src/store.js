import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './Reducers/reducers';

const store = createStore(reducers.appReducer, applyMiddleware(thunk));
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers.appReducer, composeEnhancers(applyMiddleware(thunk));

// import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import * as reducers from './reducers/reducers';
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default createStore(reducers.appReducer, composeEnhancers(applyMiddleware(thunk,logger())));

export default store;
