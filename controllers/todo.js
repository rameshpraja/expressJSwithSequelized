const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
module.exports = {

  // insert data in Todo table
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  // get all records include child tables data
  list(req, res) {
    return Todo
      .findAll({
          include : [{
              model: TodoItem,
              as: 'todoItems',
          }],
      })
      .then(todos  => res.status(200).send(todos ))
      .catch(error => res.status(400).send(error));
  },

  // Retrive single Values include child tables data
  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId,{
          include : [{
              model: TodoItem,
              as: 'todoItems',
          }],
      })
      .then(todos  => {
        if(!todos){
          return res.status(404).send({
              message: 'Todo Not Found'
          });
        }
        res.status(200).send(todos )
      })
      .catch(error => res.status(400).send(error));
  },
  // udpate record
  update(req, res) {
    return Todo
      .findById(req.params.todoId,{
          include : [{
              model: TodoItem,
              as: 'todoItems',
          }],
      })
      .then(todo  => {
        if(!todo){
          return res.status(404).send({
              message: 'Todo Not Found'
          });
        }
        return todo
        .update({
          title: req.body.title || todo.title,
        })
        .then(()=>res.status(200).send(todo)) //send back updated todo
        .catch((error) => res.status(400).send(error))
        
      })
      .catch(error => res.status(400).send(error));
  },

  // Delete record By Id
  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo  => {
        if(!todo){
          return res.status(404).send({
              message: 'Todo Not Found'
          });
        }
        return todo
        .destroy()
        .then(()=>res.status(200).send({ message: 'Todo deleted successfully.' }))
        .catch((error) => res.status(400).send(error))
        
      })
      .catch(error => res.status(400).send(error));
  },

};