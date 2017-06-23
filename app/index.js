const path = require('path');
const express = require('express');
const UserController = require('./controllers/UserController');

const app = express();

const userCtrl = new UserController();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));

app.get('/', userCtrl.register.bind(userCtrl));

app.listen(3000, () => {
    console.log("Started on 3000.")
});