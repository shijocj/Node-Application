const express = require('express');

const app = express();

// listen for requests
app.listen(3000);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const blogs = [{ title: 'Yoshi finds Eggs', snippet: 'somethings about Yoshi' },
    { title: 'Mario finds Stars', snippet:'somethings about Mario' },
    { title: 'How to defeat bowser', snippet:'somethings about bower' }];
    res.render('index', { 'title':'Home',blogs:blogs});
})

app.get('/about', (req, res) => {
    res.render('about', { 'title':'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { 'title':'Create Blog'});
})

 // 404
 app.use((req, res) => {
    res.status(404).render('404', { 'title':'404'});
})
