const helmet = require("helmet");
const Joi = require('joi');
const express = require('express');
const app = express();
const posts = require('./controllers/posts');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', posts); //telling express to use courses for any route starting with /api/posts
app.use(express.static('public'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));