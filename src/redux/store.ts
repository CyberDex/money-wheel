import { createStore, applyMiddleware, Action } from 'redux'
import { mainReducer } from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
    mainReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)