import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker';

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({
	
	_handlePost: function(event){
		event.preventDefault()
		ACTIONS.saveDish({
			title: event.currentTarget.title.value,
			description: event.currentTarget.description.value,
			location: event.currentTarget.location.value,
			rating: event.currentTarget.rating.value,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url : '/images/empty-plate.jpg',
			tags: event.currentTarget.tags.value.split(',')
		})
	},

	_handleImage: function(result){
		console.log(result)
		this.url = result.url
	},

	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handlePost} >
					<input type="text" name="title" placeholder="Enter the dish title" />
					<textarea type="text" name="description" placeholder="What's the deal, moody foodie?" />
					<input type="text" name="location" placeholder="Enter the location" />
					<input type="text" name="tags" placeholder="input tags separated by comma" />
					<select name="stars">
						<option value="1">1 &#9733;</option>
						<option value="2">2 &#9733;&#9733;</option>
						<option value="3">3 &#9733;&#9733;&#9733;</option>
						<option value="4">4 &#9733;&#9733;&#9733;&#9733;</option>
						<option value="5">5 &#9733;&#9733;&#9733;&#9733;&#9733;</option>
					</select>
					<ReactFilepicker apikey="AmYpS3JRRo2dPNdf5kZ76z" onSuccess={this._handleImage}/>
					<button type="submit">post the dish</button>
				</form>
			</div>
			)
	}
})

export default ComposeView
