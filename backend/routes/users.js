const router = require('express').Router();
//requires the model
let User = require('../models/user.model');

//First end point that handles get request for users 
//so for this one below 
//localhost:5000/users/
//users.find is a mongoose method which returns a promise
// in json format
//res.json means we're returning something in JSON format (users)
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//For HTPP post requests
//new username is part of the request body
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;