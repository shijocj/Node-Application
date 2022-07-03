const http = require('http');
const fs = require('fs');
const lodash = require('lodash');

const server = http.createServer((req,res) => {
 
    const num = lodash.random(0, 20);
    console.log(num);
     
    const greet = lodash.once(() => {
        console.log('hello');
    });

    greet();

    res.setHeader('Content-Type', 'text/html');
    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':        
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err);
            res.end();
        }
       // res.write(data);
        res.end(data);
    });

});

server.listen(3000, 'localhost', () => {
    console.log('listerning request on port 3000');
})
