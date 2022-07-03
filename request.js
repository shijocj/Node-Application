const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');
const blogRouter = require('./routes/blogRoutes');
const logger = require('./log/logger');

const app = express();

const port = process.env.PORT || 3000;

const dbURI = 'mongodb+srv://shijo:Test1234@nodetut.rmburwb.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(port);
        logger.info('connecting to the port...');
    }).catch((err) => {
        console.log(err.message);
    });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('./blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { 'title':'About'});
})


//blog routes
app.use('/blogs',blogRouter);

 // 404
 app.use((req, res) => {
    res.status(404).render('404', { 'title':'404'});
})

