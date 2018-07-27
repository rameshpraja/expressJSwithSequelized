const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const companyController = require('../controllers').company;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create); // insert new records 
  app.get('/api/todos', todosController.list); // get all records
  app.get('/api/todos/:todoId', todosController.retrieve); //retrive single value
  app.put('/api/todos/:todoId', todosController.update); //update single value
  app.delete('/api/todos/:todoId', todosController.destroy); //delete record by id
  /** Start Todo Items */
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
  
  /** Start - Company Create routes for createing new record*/
  app.post('/api/company', companyController.create); // insert new records 
  /** End - Company create routes for createing new record*/
};