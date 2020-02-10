const express = require('express');
const db = require('./projects-model.js');

const router = express.Router();

router.post( '/', (req,res)=> {

    db.add(req.body)
    .then(projects => {
      const project = projects[0];
  
      res.status(201).json(project);
      
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.post( '/:id/tasks', (req,res) => {

    const { id } = req.params;
    
    db.addTask(req.body, id)
    .then(projects => {
      const project = projects[0];
  
      res.status(201).json(project);
      
    })
    .catch(error => {
      res.status(500).json(error.message);
    });


})

router.get('/', (req,res) => {

    db.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  
});

router.get('/tasks', (req,res) => {

    db.findTasks()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });

});



module.exports = router;