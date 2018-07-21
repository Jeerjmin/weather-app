class AuthM {

  	// authenticate a user. save a token string in local storage.
  	static authenticateUser(token) {
  		  localStorage.setItem('token', token);
  	}

  	static isUserAuthenticated() {
  		  return localStorage.getItem('token') !== null;
  	}

  	// deauthenticate a user. remove a token from local storage.
  	static deauthenticateUser() {
  		  localStorage.removeItem('token');
  	}

  	static getToken() {
  		  return localStorage.getItem('token');
  	}

}

export default AuthM;
