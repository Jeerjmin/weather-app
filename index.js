import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import { rootReducer } from './src/reducers'
import  App  from './src/containers/App/App'


const store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunkMiddleware) ) );


render(

    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
);
