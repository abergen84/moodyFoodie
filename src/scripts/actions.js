import {User} from './models/models.js'


const ACTIONS = {
	registerUser: function(userObj){
		User.register(userObj).then(()=>this.logUserIn(userObj.email,userObj.password))
	},
	logUserIn: function(email,password){
		User.login(email,password).then((responseData)=>{
			alert(`user ${email} logged in`)
			console.log(responseData)
			location.hash = "home"
		}, (error)=> {
			alert('Could not log in')
			console.log(error)
		})
	},
	logUserOut: function(){
		User.logout().then(()=> location.hash = "login")
	}
}


export default ACTIONS