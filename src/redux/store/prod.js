import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducer from '../reducers'

/**
 * Creates the store applying Redux Thunk middleware.
 * @returns {Object} The Redux store.
 */
const configureStore = () => createStore(appReducer, applyMiddleware(thunk))

export default configureStore
