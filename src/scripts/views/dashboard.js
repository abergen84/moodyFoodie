import React from 'react'
import Header from './header'
import DISHSTORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({
	 
	getInitialState: function(){
		return DISHSTORE.getData()  //return the clone of the data object
	},

	componentWillMount: function(){ //start listening to the store
		console.log('mounting')
		ACTIONS.fetchDishes()
		DISHSTORE.on('updateContent', ()=>{
			this.setState(DISHSTORE.getData())
		})
	},

	componentWillUnmount: function(){
		DISHSTORE.off('updateContent')
	},

	_handleTagSearch: function(evt){
		if(evt.keyCode === 13){
			ACTIONS.fetchDishes(evt.target.value)
			evt.target.value = ''
		}
	},

	render: function() {
		console.log('rendering')
		console.log(this.state.dishCollection)
	 	return (
	 		<div>
	 			<Header />
		 		<div className='dashboard' >
		 			<h1>dashboard</h1>
		 			<h4>search: </h4>
		 			<input onKeyDown={this._handleTagSearch} type="text" name="tags" placeholder="search for dishes" />
		 			<DishContainer dishColl={this.state.dishCollection}/>
		 		</div>
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
				{this.props.dishColl.map(this._handleMap)}
			</div>
			)
	}
})

const Dish = React.createClass({
	
	_handleLikes: function(){
		ACTIONS.likeDish(this.props.dishModel,User.getCurrentUser())
	},

	render: function() {
		console.log(this)
		return (
			<div className="dish">
				<h3>{this.props.dishModel.get('title')}</h3>
				<p>{this.props.dishModel.get('description')}</p>
				<img src={this.props.dishModel.get('imageUrl')} />
				<p>tags: {this.props.dishModel.get('tags')}</p>
				<button onClick={this._handleLikes}>like</button>
				<p>likes: {this.props.dishModel.get('likes').length}</p>
			</div>
			)
	}
})

export default Dashboard
