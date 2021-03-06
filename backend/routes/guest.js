const router = require('express').Router();
let Guest =require('../models/guest.model');

//Read a guest 
router.route('/').get((req, res) => {
    Guest.find()
        .then(guests => res.json(guests))
        .catch(err => res.status(400).json('Erorr: ' + err));
});

//Create a guest (CREATE)
router.route('/add').post((req, res) => {
    const guestID = req.body.guestID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;

    const newGuest = new Guest({
        guestID,
        firstName,
        lastName,
        phone,
        email
    });

    newGuest.save()
        .then(() => res.json('Guest created!'))
        .catch(err => res.status(400).json(err));
});

//Get Guest by ID (READ)
router.route('/:id').get((req, res) => {
    Guest.findById(req.params.id)
      .then(guest => res.json(guest))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Guest.findById(req.params.id)
        .then(guest => {
            guest.guestID = req.body.guestID;
            guest.firstName = req.body.firstName;
            guest.lastName = req.body.lastName;
            guest.phone = req.body.phone;
            guest.email = req.body.email;

            guest.save()
                .then(() => res.json('Guest info updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Guest 
router.route('/:id').delete((req, res) => {
    Guest.findByIdAndDelete(req.params.id)
        .then(() => res.json ('Guest deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
