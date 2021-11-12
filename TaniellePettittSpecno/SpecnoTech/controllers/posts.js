const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { PostsDAL } = require('../dataHandling/postsDAL');

const postDataService = new PostsDAL();

router.get('/', async (req, res) => {
    const response = await postDataService.getPosts();
    console.log(response);
    res.render('index', { posts: response });
});

router.get('/newPost', (req, res) => {
    res.render('newPost');
});


router.get('/:id', (req, res) => {
    const post = posts.find(c => c.id == parseInt(req.params.id));
    if (!post) return res.status(404).send('The post with the provided ID does not exist');
    res.send(post);
});

router.post('/api/newPost', (req, res) => {

    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    postDataService.createPost(req.body.title, req.body.creator);
    res.redirect('/');

});



router.put('/:id', (req, res) => {

    const post = posts.find(c => c.id == parseInt(req.params.id));
    if (!post) return res.status(404).send('The post with the provided ID does not exist');


    const { error } = validatePost(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    post.name = req.body.name;
    res.send(post);

});

router.delete('/:id', (req, res) => {

    const post = posts.find(c => c.id == parseInt(req.params.id));
    if (!post) return res.status(404).send('The post with the provided ID does not exist');

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(post);

})

function validatePost(post) {

    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        creator: Joi.string().min(3).required()
    });

    return schema.validate(post);

}

module.exports = router;