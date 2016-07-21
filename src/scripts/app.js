import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginView'
import Dashboard from './views/dashboard'
import DishesView from './views/dishesView'
import ComposeView from './views/composeView'

//STEP 5 (build your client side api routes)
const app = function() {

    var AppRouter = Backbone.Router.extend ({
        routes: {
            'home': 'goHome',
            'dish/postDishes': 'handleDishPost', // VVV these routes were determined by the routes we used in the Header
            'dish/myDishes': 'handleMyPosts',
            'login': 'handleLogin',
            '*catchall': 'redirectHome'
        },

        goHome: function() {
            ReactDOM.render(<Dashboard />, document.querySelector('.container')) //don't need to pass anything onto props because we will be doing that in the store
        },

        handleDishPost: function() {
            ReactDOM.render(<ComposeView />, document.querySelector('.container'))
        },

        handleMyPosts: function() {
            ReactDOM.render(<DishesView />, document.querySelector('.container'))
        },

        handleLogin: function() {
            ReactDOM.render(<LoginView />, document.querySelector('.container'))
        },

        redirectHome: function() {
            location.hash = 'home'
        },

        initialize: function() { //good way to add logic to check if a user is logged in to protect certain routes
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