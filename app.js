const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// listen for requests

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://shijo:Test1234@nodetut.rmburwb.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then((res) => {
        app.listen(3000);
    }).catch((err) => {
        console.log(err.message);
    })

app.use(morgan('dev'));


app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'New Blog2',
        snippet: 'About my new Blog',
        body: 'More about my new Blog'
    });
    blog.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
})

app.get('/all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('62bdbe972ef26777d2f94c92').then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    //res.sendFile('./views/index.html', {root:__dirname});
    res.redirect('./blogs');
})

app.get('/about', (req, res) => {
    // res.send('<p>About page</p>');
    res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/blogs', (req, res) => {
    Blog.find().then((result) => {
        res.render('index', { title: 'All blogs', blogs: result });
    }).catch((err) => {
        console.log(err.message);
    })
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})
 // 404
 app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root:__dirname});
})
