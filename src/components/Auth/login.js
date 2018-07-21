import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import AuthM from '../../modules/Auth.js';

import { Alert, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const API_URL='http://localhost:3001'


export default class Login extends React.Component {
    constructor(props) {
        super(props);


        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            user: {
                username: '',
                password: ''
            },

            userData: {}
        }
    }

    handleChange = (event) => {
  		const field = event.target.id;
  		const user = this.state.user;
  		user[field] = event.target.value;

  		this.setState({
  			user: user
  		})
	  }

    handleSubmit = (event) => {
		    event.preventDefault();

  		const username = encodeURIComponent(this.state.user.username);
  		const password = encodeURIComponent(this.state.user.password);
  		const formData = `username=${username}&password=${password}`;

        axios({
            method: 'post',
            url: `${API_URL}/auth/login`,
            data: formData
        })
            .then( (response) => {
                if (response.status === 200) {
                    localStorage.setItem('successMessage', response.data.message);
                    localStorage.setItem('username',response.data.userData.username)
                    AuthM.authenticateUser(response.data.token);
                    this.setState({
                        errors: {},
                        userData: response.data.userData
                    });

                }
            })
            .catch( (error) => {
                console.log('error login',error.response)
                const errors = error.response.data.errors ? error.response.data.errors : {};
                errors.summary = error.response.data.message;
                this.setState({ errors });
            })

    }

    render() {

        if (AuthM.isUserAuthenticated()) {
    			return (
              <Redirect to={{
                  pathname: "/",
                  state: {referrer: this.state.userData}
                }} />
    			);
    		}



        var message = "";
        var usernameError = "";
        var passwordError = "";

        if (this.state.successMessage) {
			     message = <Alert bsStyle="success">{this.state.successMessage}</Alert>;
		    }

		    if (this.state.errors.login) {
			     message = <Alert bsStyle="danger">{this.state.errors.login}</Alert>;
		    }

		    if (this.state.errors.username) {
			     usernameError = <HelpBlock >{this.state.errors.username}</HelpBlock>;
		    }

		    if (this.state.errors.password) {
			     passwordError = <HelpBlock >{this.state.errors.password}</HelpBlock>;
		    }

        return (

            <form onSubmit={this.handleSubmit} className="form login-form">
                <h3>Login</h3>
                {message}
                <div className="reg-wrapper">
                    <div className='control-labels'>

                       <p>Username</p>
                        <p>Password</p>
                    </div>
                    <div className='form-groups'>
                        <FormGroup className="formgroup" controlId="username">
                            <FormControl type="text" value={this.state.user.username} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="formgroup" controlId="password">
                            <FormControl type="password" value={this.state.user.password} onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className='reg-errors'>
                        <p>{usernameError}</p>
                        <p>{passwordError}</p>
                    </div>
                </div>
                <Button className="form-button" type="submit">Submit</Button>
            </form>
        )
    }
}
