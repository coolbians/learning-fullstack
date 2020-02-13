const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/Business');


// add business
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business was added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// read all businesses
businessRoutes.route('/').get(function (req, res) {
    Business.find(function (err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// read single business
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  update business
businessRoutes.route('/update/:id').post(function (req, res) {

  console.log('attempting to update business')
  Business.findById(req.params.id, function (err, business) {
    if (!business)
      return console.log(`Unable to update the document for _id:${req.params.id}`);
    else {
      business.person_name = req.body.person_name;
      business.business_name = req.body.business_name;
      business.business_gst_number = req.body.business_gst_number;

      business.save().then(business => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("Unable to update the database");
        });
    }
  });
});

// delete business
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json(`${this.business.business_name} Successfully deleted`);
    });
});

module.exports = businessRoutes;