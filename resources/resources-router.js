const express = require('express');
const db = require('./resources-model.js');

const router = express.Router();

router.post( '/', (req,res)=> {

    db.add(req.body)
    .then(resources => {
      const resource = resources[0];
  
      res.status(201).json(resource);
      
    })
    .catch(error => {
      res.status(500).json(error);
    });

});


router.get('/', (req,res) => {

  db.find()
  .then(Resources => {
    res.json(Resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});





module.exports = router;