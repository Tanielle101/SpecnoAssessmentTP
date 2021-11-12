const express = require('express');
const { PostsDAL } = require('../dataHandling/postsDAL');
const router = express.Router();

const postDataService = new PostsDAL();


router.get('/', async (req, res) => {
    const response = await postDataService.getPosts();
    console.log(response);
    res.render('index', { posts: response });

});

module.exports = router;