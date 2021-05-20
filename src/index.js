const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksIfTodoExists (request, response, next) {
  const { username } = request.headers;
  const { id } = request.params;


  const user = users.find(u => u.username === username);

  const todo = user.todos.find(t => t.id === id);

  if (todo) {
    request.todo = todo;
    return next();
  }

  if (!todo) {
    return response.status(404).json({error: "Couldn't find a todo with that ID"});
  }
}

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(u => u.username === username);

  if (user) {
    request.user = user;
    return next();
  }

  return response.status(400).json({
    error: "User with this username doesn't exist"
  })
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const checkIfUsernameIsTaken = users.some(u => u.username === username);

  if (!checkIfUsernameIsTaken) {
    const newUserData = {
      id: uuidv4(),
      name,
      username,
      todos: []
    }
    users.push(newUserData);

    return response.status(201).json(
      newUserData
    )
  }

  return response.status(400).json({
    error: 'User with the same username already exists'
  })

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.status(201).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(newTodo);
  response.status(201).json(newTodo);
});

app.put('/todos/:id', checksExistsUserAccount, checksIfTodoExists, (request, response) => {
  const { todo } = request;
  const { title, deadline } = request.body;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);

});

app.patch('/todos/:id/done', checksExistsUserAccount, checksIfTodoExists, (request, response) => {
  const { user, todo } = request;

  todo.done = true;

  return response.status(201).json(todo);


});

app.delete('/todos/:id', checksExistsUserAccount, checksIfTodoExists, (request, response) => {
  const { user, todo } = request;

  user.todos.splice(todo , 1);

  return response.status(204).json(user.todos);

});

module.exports = app;