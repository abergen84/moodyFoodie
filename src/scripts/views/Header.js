import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				<h1>food mood</h1>
				<NavBar />
			</div>
			)
	}
})

const NavBar = React.createClass({
	render: function() {
		return (
			<div id="navBar">
				<a href="#login">log in</a>
				<a href="#home">home</a>
				<a href="#dishes/myDishes">My Dishes</a>
				<a href="#dishes/postDishes">Post Dish</a>
				<a href="#" onClick={ACTIONS.logUserOut} >log out</a>
			</div>
			)
	}
})

export default Header