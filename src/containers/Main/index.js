import React from 'react'
import {Route, Link} from 'react-router-dom'
import { Alert} from 'react-bootstrap';

import App from '../App/App'
import Login from '../../components/Auth/login.js'
import Registration from '../../components/Auth/registration.js'
import Logout from '../../components/Auth/logout.js'
import AuthM from '../../modules/Auth.js';

import './index.scss'

export default class Auth extends React.Component {

    render() {

        let message = ''
        let successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            message = <Alert bsStyle="success">{successMessage}</Alert>;
            localStorage.removeItem('successMessage');

        }

        let welcomeMsg = ''
        console.log('this.state',this.state)
        if (this.props.location.state)
            welcomeMsg = <Alert>Welcome, {this.props.location.state.referrer.name}!</Alert>



        let navigationItems = "";

        		if (AuthM.isUserAuthenticated()) {
        			navigationItems = <ul><li><Link to='/logout'>Logout</Link></li></ul>;
        		} else {
        			navigationItems = <ul><li><Link to='/'>Home</Link></li><li><Link to='/login'>Login</Link></li><li><Link to='/registration'>Register</Link></li></ul>;
        		}


        console.log('redirect props', this.props.location.state)
        return (
            <div className="container">
                <header>

                    <h1>Weather App</h1>
                    <div>{message}</div>
                    <div>{welcomeMsg}</div>
                    <nav>{navigationItems}</nav>
                    </header>
                    <main>
                        <Route exact path="/" component={App}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/logout" component={Logout} />
                    </main>

            </div>
        )
    }
}
