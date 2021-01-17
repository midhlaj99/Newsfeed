import { applyMiddleware, createStore } from "redux"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import reducer from "../reducers";

// const middleware = applyMiddleware(new promise(), thunk, createLogger())
const middleware = applyMiddleware( thunk, createLogger())
export default createStore(reducer, middleware)
