import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import appReducer from '../reducers'

// instantiate logger middleware
const logger = createLogger()

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const configureStore = () =>
  createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk)),
    // composeEnhancers(applyMiddleware(thunk, logger, middleware)),
  )

export default configureStore
