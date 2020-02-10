const db = require('../data/db-config.js');

module.exports = {

    find,
    findTasks,
    add,
    addTask,
}


function find() {

    return db('projects');
}

function findTasks() {

    return db('tasks as t')
           .join('projects as p', 'p.id', '=', 't.project-id')
           .select('t.task-name', 
                   't.task-notes', 
                   'p.project-name', 
                   'p.project-description'); 
}

function add(project) {

  return db('projects').insert(project);  
}

function addTask (task, id) {

    return db('tasks').insert({...task, ['project-id']: id});
}