let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Dish = require('../db/schema.js').Dish

  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err)
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err)
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err)
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })

    //DISH AREA

    //this route will create a brand new dish that will be put on the mongo database
    apiRouter
      .post('/dishes/', function(request,response){ //time to create a brand new dish on the database
        let dish = new Dish(request.body) //create new instance of the Schema, response.body is all the info created from client
        dish.save(function(error){
          if(error) {
            response.send(error)
          } else {
            response.json(dish)
          }
        })
      })
      .get('/dishes/', function(request,response){
        Dish.find(request.query, function(error,records){ //request.query parses the parameters and turns them into an object
          if(error) {
            response.send(error)
          } else {
            response.json(records)
          }
        })
      })

    apiRouter
      .get('/users/dishes', function(request,response){
        //if there is a user session then there is a user object on the request object
        //i want to get all dishes where the author ID on the dish matches the current ID of the user
        Dish.find({authorId: request.user._id}, function(error,records){
          if(error){
            response.send(error)
          } else {
            response.json(records)
          }
        })
      })





    // Routes for a Model(resource) should have this structure

//STEP FOUR (build your server side apiroutes)

//this route will create a brand new dish that we will put in the db
apiRouter.post('/dishes', function(request, response) {
    let dish = new Dish(request.body) //create new instance of schema from a MONGOOSE model, request.body is all the information that we have taken from the client side and we send it on the body of the request to the server
    dish.save(function(error) { //saves to db
        if(error) {
            response.send(error)
        }
        else {
            response.json(dish)
        }
    })
})

apiRouter.put('/dishes/:_id', function(request,response){
  Dish.findByIdAndUpdate(request.params._id, request.body, function(error, records){
    if(error){
      console.log(error)
      response.send(error)
    }
    else {
      console.log(records)
      response.json(records)
    }
  })
})

apiRouter.delete('/dishes/:_id', function(request,response){
  Dish.remove({_id: request.params._id}, function(error){
    if(error){
      response.json(error)
    }
    response.json({
      msg: `record ${request.params._id} successfully deleted`,
      // _id: request.params._id
    })
  })
})



//this route will show us all the dishes posted by all users
apiRouter.get('/dishes', function(request, response) {
    Dish.find(request.query, function(error, records){  //some methods live directly on the model, so you don't need to create a new instance.
    // request.query parses the parameters and turns them into an object (at this moment we have it just in case)
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})

//get dishes posted by the logged in user
apiRouter.get('/user/dishes', function(request, response) {
    Dish.find({authorId: request.user._id}, function(error, records) { //I want to get all dishes where the author id matches the current id of the user
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
})


module.exports = apiRouter