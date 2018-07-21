const express = require('express');
const router = express.Router();
const City = require('../models/city');


module.exports = router;


// Get all cities
router.get('/get', (req, res) => {

    City.find({})
    .then(result => {
      res.json({
        success: "true",
        message: "All cities are getted",
        cities: result
      })
    })

})


// Add city
router.post('/add', (req, res) => {

    let newCity = new City({
        name: req.body.name,
        temp: req.body.temp,
        img: req.body.img,
        username: req.body.username
    });

    newCity.save()
        .then((result) => {
            res.json({
                success: true,
                message: `Successfully added!`,
                _id:result._id
            });
        })
        .catch((error) =>{
          res.status(400).json({
            success: false,
            error: error
          })
        })
})

// Delete city
router.delete('/delete', (req, res) => {


console.log('req delete', req.body)
    City.find({_id:req.body._id}).remove().exec()
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    name: result.name
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });


})
