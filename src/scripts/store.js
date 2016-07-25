import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

const DISHSTORE = _.extend(Backbone.Events, {
	data: {
		dishCollection: new DishCollection()
	},

	emitChange: function(){
		this.trigger('updateContent')  //we gave this our own name
	},

	getData: function(){ //going to be used to always get the state of the app (getInitialState, setState)
		return _.clone(this.data) //making a clone because we dont want to modify the state (original data)
	},

	// setStore: function(storeProp, payload){
	// 	if( typeof this.data[storeProp] === 'undefined' ) { throw Error(`${storeProp} property not on store.data, make sure to declare`) }
	// 	this.data[storeProp] = payload
	// 	this.emitChange()
	// },

	// getDataFor: function(storeProp){
	// 	return this.data[storeProp]
	// },

	initialize: function(){
		this.data.dishCollection.on('sync update', this.emitChange.bind(this))
	}
})

DISHSTORE.initialize()


export default DISHSTORE