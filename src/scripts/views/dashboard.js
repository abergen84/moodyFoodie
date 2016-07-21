import React from 'react'
import Header from './header'
import DISHSTORE from '../store'
import ACTIONS from '../actions'

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

	render: function() {
		console.log('rendering')
		console.log(this.state.dishCollection)
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<h3>dashboard</h3>
	 			<DishContainer dishColl={this.state.dishCollection}/>
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
	render: function() {
		console.log(this)
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
				<img src={this.props.dishModel.get('imageUrl')} />
			</div>
			)
	}
})

export default Dashboard
