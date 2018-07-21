const express = require('express');
const validator = require('validator');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user');

function validateRegisterForm(formData) {
    const errors = {};
    const name = decodeURIComponent(formData.name);
    const username = decodeURIComponent(formData.username);
    const email = decodeURIComponent(formData.email);
    const password = decodeURIComponent(formData.password);
    const passwordTwo = decodeURIComponent(formData.passwordTwo);

    let isFormValid = true;
	  let message = '';

  	if (typeof name !== 'string' || validator.isEmpty(name)) {
  		isFormValid = false;
  		errors.name = "Name is required."
	  }

  	if (typeof username !== 'string' || validator.isEmpty(username) || !validator.isAlphanumeric(username)) {
  		isFormValid = false;
  		errors.username = "Username is required, and must contain only letters and numbers."
  	}

  	if (typeof email !== 'string' || validator.isEmpty(email) || !validator.isEmail(email))  {
  		isFormValid = false;
  		errors.email = "Please enter a proper e-mail address.";
  	}

  	if (typeof password !== 'string' || validator.isEmpty(password)) {
  		isFormValid = false;
  		errors.password = "Password is required.";
  	}

  	if (typeof passwordTwo !== 'string' || validator.isEmpty(passwordTwo) || !(password === passwordTwo)) {
  		  isFormValid = false;
  		    errors.passwordTwo = "Confirmed password doesn't match.";
  	}

    if (password.length < 4) {
        isFormValid =false;
        errors.password = "The password must be at least 4 characters long."
    }

    if (name.length < 2) {
        isFormValid = false;
        errors.name = "The name must be at least 2 characters long."
    }

    if (username.length < 4) {
        isFormValid = false;
        errors.username = "The username must be at least 4 characters long."
    }

  	if (!isFormValid) {
  		message = "Check the form for errors.";
  	}

  	return {
  			success: isFormValid,
  			message: message,
  			errors: errors
  	};

}

// Registration
router.post('/auth/reg', (request, response) => {
    var validationResult = validateRegisterForm(request.body);

    if (!validationResult.success) {
        response.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    else {
        const password = request.body.password
        bcrypt.hash(password, null, null, (err, hash) => {
            User.create({
                name: request.body.name,
                username: request.body.username,
                email: request.body.email,
                password: hash
            }).then(user => {
                console.log('user',user)
                response.status(200).json({
                    success: true,
                    message: 'You successfully created an account! Please login.'
                })
            })
                .catch(error => {
                    let authenticationResult = {
                				success: false,
                				message: 'Check the form for errors.',
                				errors: {}
                			};

                    if (error.name === 'MongoError' && error.code === 11000 && error.message.indexOf('username_1') > 0) {
                				  authenticationResult.errors.username = 'This username is already taken.';
                			}

                    if (error.name === 'MongoError' && error.code === 11000 && error.message.indexOf('email_1') > 0) {
              				    authenticationResult.errors.email = 'This e-mail address is already taken.';
              			}

                    response.status(409).json(authenticationResult)
                })
        })
    }
})

function validateLoginForm(formData) {
  	const errors = {};
  	let isFormValid = true;
  	let message = '';

  	if (!formData || typeof formData.username !== 'string' || formData.username.trim().length === 0) {
  		isFormValid = false;
  		errors.username = 'Please provide your username.';
  	}

  	if (!formData || typeof formData.password !== 'string' || formData.password.trim().length === 0) {
  		isFormValid = false;
  		errors.password = 'Please provide your password.';
  	}

  	if (!isFormValid) {
  		message = 'Check the form for errors.';
  	}

  	return {
  		success: isFormValid,
  		message,
  		errors
  	}
}


router.post('/auth/login', (request, response) => {
    var validationResult = validateLoginForm(request.body);

    if (!validationResult.success) {
		 response.status(400).json({
			    success: false,
			    message: validationResult.message,
			    errors: validationResult.errors
		 });
	  }

    else {
        const errors = {};
        User.findOne({ username:request.body.username })
            .then((user) => {
                if (!user) {
                    errors.login="Couldn't find username/password."
                    response.status(400).json({
					                 success: false,
					                 errors: errors
				            });
                }
                else {
                    bcrypt.compare(request.body.password, user.password, (err,result) =>{
                        if (!result) {
                            errors.login="Couldn't find username/password."
                            response.status(400).json({
                                success: false,
                                errors: errors
                            });
                        }
                        else {
                            const payload = {
                                sub: user._id
                            };
                            const userData = {
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                            const token = jwt.sign(payload,"daft punk is best");
                            response.json({
                                success: true,
                                message: 'You have successfully logged in!',
                                userData,
                                token
                            });
                        }
                    })
                }
            })
    }
})


router.get('/auth/logout', (request, response) => {
    if (request.session) {
        // delete session object
        request.session.destroy(() => {
        })
    }

})




module.exports = router;
