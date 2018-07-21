import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import AuthM from '../../modules/Auth.js';

const API_URL='http://localhost:3001'

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                name: "",
                username: "",
                email: "",
                password: "",
                passwordTwo: ""
            },
            redirectToLogin: false
        }
    }

    handleChange = (event) => {
        const field = event.target.id;
    		const user = this.state.user;
    		user[field] = event.target.value;

    		this.setState({
    			user: user
    		});

    }

    handleSubmit = (event) => {
        event.preventDefault();

        const name = encodeURIComponent(this.state.user.name);
        const username = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const passwordTwo = encodeURIComponent(this.state.user.passwordTwo);
        const formData = `name=${name}&username=${username}&email=${email}&password=${password}&passwordTwo=${passwordTwo}`;

        console.log(formData,"formData")

        axios({
            method: 'post',
            url: `${API_URL}/auth/reg`,
            data: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('successMessage', response.data.message);
                    this.setState({
                        redirectToLogin: true
                    });
                }
            })
            .catch( (error) => {
                const errors = error.response.data.errors ? error.response.data.errors: {};
                errors.summary = error.response.data.message;
                this.setState({ errors });
            });

    }


    render() {

        if (AuthM.isUserAuthenticated()) {
          console.log('Registration redireto to /')
            return (
                <Redirect to='/' />
            );
        }

        if (this.state.redirectToLogin) {
            return (
                <Redirect push to='/login' />
            )
        }
        var nameError = "";
        var usernameError = "";
        var emailError = "";
        var passwordError = "";
        var passwordTwoError = "";

        if (this.state.errors.name) {
            nameError = <HelpBlock >{this.state.errors.name}</HelpBlock>;
        }

        if (this.state.errors.username) {
            usernameError = <HelpBlock >{this.state.errors.username}</HelpBlock>;
        }

        if (this.state.errors.email) {
            emailError = <HelpBlock >{this.state.errors.email}</HelpBlock>;
        }

        if (this.state.errors.password) {
            passwordError = <HelpBlock >{this.state.errors.password}</HelpBlock>;
        }

        if (this.state.errors.passwordTwo) {
            passwordTwoError = <HelpBlock >{this.state.errors.passwordTwo}</HelpBlock>;
        }

        return (
            <form className="form form-reg" onSubmit={this.handleSubmit}>
                <h3>Registration</h3>
                <div className='reg-wrapper'>
                    <div className='control-labels'>
                        <p>Name</p>
                        <p>Username</p>
                        <p>E-mail</p>
                        <p>Password</p>
                        <p>Confirm Password</p>
                    </div>
                    <div className='form-groups'>
              				<FormGroup className="formgroup" controlId="name">
              					<FormControl type="text" value={this.state.user.name} onChange={this.handleChange} />
              				</FormGroup>

              				<FormGroup className="formgroup" controlId="username">
              					<FormControl type="text" value={this.state.user.username} onChange={this.handleChange} />
              				</FormGroup>

              				<FormGroup className="formgroup" controlId="email">
              					<FormControl type="text" value={this.state.user.email} onChange={this.handleChange} />
              				</FormGroup>

              				<FormGroup className="formgroup" controlId="password">
              					<FormControl type="password" value={this.state.user.password} onChange={this.handleChange} />
              				</FormGroup>

              				<FormGroup className="formgroup" controlId="passwordTwo">
              					<FormControl type="password" value={this.state.user.passwordTwo} onChange={this.handleChange} />
              				</FormGroup>
                    </div>
                    <div className='reg-errors'>
                        <p>{nameError}</p>
                        <p>{usernameError}</p>
                        <p>{emailError}</p>
                        <p>{passwordError}</p>
                        <p>{passwordTwoError}</p>
                    </div>




              </div>
          				<Button className="form-button" type="submit">Submit</Button>
          			</form>
        )
    }
}
