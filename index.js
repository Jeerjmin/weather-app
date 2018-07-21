import React from 'react'
import { render } from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    browserHistory
} from 'react-router-dom'

import Main from './src/containers/Main'

render(

        <Router history={browserHistory}>
            <Route path="/" component={Main}/>
        </Router>,

    document.getElementById('root')
);
