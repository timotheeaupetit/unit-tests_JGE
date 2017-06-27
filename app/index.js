const path = require('path');
const express = require('express');
const UserController = require('./controllers/UserController');

const app = express();

const userController = new UserController();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));

app.get('/', userController.delete.bind(userController));

app.listen(3000, () => {
    console.log("Started on 3000.")
});