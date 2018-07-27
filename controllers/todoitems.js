const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then((todoItem) => {
        res.status(201).send(todoItem)
      })
      .catch(error => res.status(400).send(error));
  },

  // udpate Todo Item by Id
  update(req, res) {
    return TodoItem
      .find({
          where: {
            todoId : req.params.todoId,
            id : req.params.todoItemId,
          }
      })
      .then(todoItem  => {
        if(!todoItem){
          return res.status(404).send({
              message: 'Todo Item Not Found'
          });
        }
        return todoItem
        .update(req.body, { fields: Object.keys(req.body) })
        .then((updatedTodoItem)=>res.status(200).send(updatedTodoItem)) //send back updated todo item
        .catch((error) => res.status(400).send(error))
        
      })
      .catch(error => res.status(400).send(error));
  },

  // Delete record By Id
  destroy(req, res) {
    return TodoItem
      .find({
          where:{
            id: req.params.todoItemId,
            todoId: req.params.todoId
          }
      })
      .then(todoItem  => {
        if(!todoItem){
          return res.status(404).send({
              message: 'Todo Item Not Found'
          });
        }
        return todoItem
        .destroy()
        .then(()=>res.status(200).send({ message: 'Todo Item deleted successfully.' }))
        .catch((error) => res.status(400).send(error))
        
      })
      .catch(error => res.status(400).send(error));
  },
};