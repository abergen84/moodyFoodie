import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/LoginView.js'



const app = function() {

const AppRouter = Backbone.Router.extend({
	routes: {
		"home":"goHome",
		"dish/postDishes":"postDishesHandler",
		"dish/myPosts":"myPostsHandler",
		"login":"loginHandler",
		"*catchall":"routeHome"
	},

	goHome: function(){
		ReactDOM.render(<DishesView />, document.querySelector('.container'))
	},
	postDishesHandler: function(){
		ReactDOM.render(<ComposeView />, document.querySelector('.container'))	
	},
	myPostsHandler: function(){
		ReactDOM.render(<MyDishesView />, document.querySelector('.container'))		
	},
	loginHandler: function(){
		ReactDOM.render(<LoginView />, document.querySelector('.container'))			
	},
	routeHome: function(){
		location.hash = "home"
	},
	initialize: function(){
		Backbone.history.start()
	}

})

new AppRouter()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..