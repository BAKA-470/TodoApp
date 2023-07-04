// importing the dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
// declaring the port
const port = 7000;
// setting the view engine
app.set('view engine', 'ejs')
    // using the static css page
app.use(express.static('public'))
    // using bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connecting the database
const dburl = 'mongodb://127.0.0.1:27017/tododb'
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });


// getting the data and rendering it
app.get('/', (req, res) => {
    Todo.find()
        .then(result => {
            res.render('index', { data: result });
            console.log(result);
        })
        // res.render('index');
});

// posting the data for the user to see
app.post('/', (req, res) => {
    const todo = new Todo({
        todo: req.body.todoValue
    })
    todo.save()
        .then(result => {
            res.redirect('back')
        })
});

// deleting a particular task by id from mongodb collection
app.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log(result);
        });
});

// listner
app.listen(port, () => {
    console.log('server is up and running on port', port);
});