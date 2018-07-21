import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import AuthM from '../../modules/Auth.js';

const API_URL='http://localhost:3001'

class Logout extends React.Component {
  	componentWillMount() {
        AuthM.deauthenticateUser();
        localStorage.removeItem('username');
  		  axios.get(`${API_URL}/auth/logout`)
	   }

  	render() {
      console.log('getToken',AuthM.getToken())
  		return (
        <Redirect push to='/' />
  		);
  	}
}

export default Logout;
