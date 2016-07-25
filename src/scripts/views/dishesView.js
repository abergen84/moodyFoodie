import React from 'react'
import Header from './header'
import DISHSTORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const DishesView = React.createClass({
	 
	 getInitialState: function(){
	 	return DISHSTORE.getData()
	 },

	 componentWillMount: function(){
	 	var queryForDishes = {
	 		authorId: User.getCurrentUser()._id
	 	}
	 	ACTIONS.fetchDishes(queryForDishes)
	 	DISHSTORE.on('updateContent', ()=> {
	 		this.setState(DISHSTORE.getData())
	 	})
	 },

	 componentWillUnmount: function(){
	 	DISHSTORE.off('updateContent')
	 },

	 render: function() {
	 	return (
	 		<div className="dishesView" >
	 			<Header />
	 			<h3>my dishes</h3>
	 			<DishContainer myDishes={this.state.dishCollection} />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	
	_handleMap: function(model){
		return <Dish dishModel={model} key={model.cid} />
	},

	render: function() {
		return (
			<div className="dishContainer">
				{this.props.myDishes.map(this._handleMap)}
			</div>
			)
	}
})

const Dish = React.createClass({
	
	_deleteDish: function(){
		ACTIONS.deleteDish(this.props.dishModel.id)
	},

	render: function() {
		return (
			<div className="dish">
				<h3>{this.props.dishModel.get('title')}</h3>
				<p>{this.props.dishModel.get('description')}</p>
				<img src={this.props.dishModel.get('imageUrl')} />
				<p>tags: {this.props.dishModel.get('tags')}</p>
				<p>likes: {this.props.dishModel.get('likes').length}</p>
				<button onClick={this._deleteDish}>x</button>
			</div>
			)
	}
})

export default DishesView
