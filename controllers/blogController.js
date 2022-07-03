// blog_index, blog_details

const Blog = require('../models/blog');
const logger = require('../log/logger');

const blog_index = (req,res) => {
    Blog.find().then((result) => {
        res.render('index', { title: 'All blogs', blogs: result });
        logger.info('in default page.');
    }).catch((err) => {
        logger.error('Error in directing to default page ' + error);
    })
}

const blog_details = (req,res) => {
    const id = req.params.id;   
    Blog.findById(id).then((result) => {
        res.render('details', { blog: result, title: 'Blog Details' });
        logger.info('getting information for ID :' + id);
        logger.error('getting information for ID :' + id);
    }).catch((err) => {
        res.status(404).render('404', { title: 'Blog not found' });
        logger.error('Error in getting blog details : '+ err);
    })
}

const blog_create_get =  (req, res) => {
    res.render('create', { 'title': 'Create Blog' });
    logger.info('creating a new blog ');
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
        logger.info('creating a new blog ' + result);
    }).catch((err) => {
        logger.error('Error in creating a blog ' + error);
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    logger.info('deleting item for Id : ' + id);
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({redirect:'/blogs'})
    }).catch((err) => {
        logger.error('Error in deleteing a blog ' + error);
    })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};