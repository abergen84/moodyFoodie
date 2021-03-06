import React from 'react'
import ACTIONS from '../actions'
import Header from './Header'

const LoginView = React.createClass({
	render: function() {
		return (
			<div className="loginView">
				<Header />
				<RegisterBox />
				<LoginBox />
			</div>
			)
	}
})

const RegisterBox = React.createClass({

	_handleRegister: function(evt) {
		evt.preventDefault()
		ACTIONS.registerUser({
			email: evt.currentTarget.email.value,
			password: evt.currentTarget.password.value,
			name: evt.currentTarget.username.value,
		})
		evt.currentTarget.reset()
	},

	render: function() {
		return (
			<div className="loginBox register">
				<form onSubmit={this._handleRegister} >
					<h3>Register</h3>
					<input type="text" name="username" placeholder="please enter your name" />
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">sign up!</button>
				</form>
			</div>
			)
	}
})

const LoginBox = React.createClass({
	_handleLogin: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
	},

	render: function() {
		return (
			<div className="loginBox login">
				<form onSubmit={this._handleLogin} >
					<h3>Log in</h3>
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">log in!</button>
				</form>
			</div>
			)
	}
})
export default LoginView