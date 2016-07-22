//STEP 6 (CREATE ACTIONS MODULE)

import {User} from './models/models'
import {DishModel, DishCollection} from './models/models'
import DISHSTORE from './store'
import toastr from 'toastr'


const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                toastr.info(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                toastr.info('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    saveDish: function(dishObj){
        var dish = new DishModel(dishObj)
        dish.save().then(function(responseData){
            // alert("Thanks for posting!")
            toastr.info('Thanks for posting')
            console.log(responseData)
            location.hash = "home"
        }, function(error){
            toastr.error("Error", error)
            console.log(error)
        })
    },

    fetchDishes: function(tags){
        DISHSTORE.data.dishCollection.fetch({
            data: { 
                tags: tags
            }
        })
    },

    likeDish: function(dish, userObj){ //Step 1: modify dish, adding user ID to the likes
        // console.log(User.getCurrentUser()._id) //Step 2: save dish to server
        // dish.get('likes').push(  userObj._id)
        
        console.log('likes array', dish.get('likes'));
        var newVal = dish.get('likes').concat(userObj._id)
        console.log(newVal)
        
        var mod = new DishModel(dish.toJSON())
        mod.set({
            'likes' : newVal
        })

        console.log('before saving??' , dish.attributes)

        mod.save().then((responseData)=>{
            console.log('server response', responseData)
            console.log('dish model?', dish)

            let dishCollCopy = new DishCollection(DISHSTORE.data.dishCollection.models)
            dishCollCopy._byId[mod.id].set( responseData )
            DISHSTORE.setStore('dishCollection', dishCollCopy)

        })

        // dish.save().then( ()=>  DISHSTORE.data.dishCollection.fetch() )
        
    }


}

export default ACTIONS