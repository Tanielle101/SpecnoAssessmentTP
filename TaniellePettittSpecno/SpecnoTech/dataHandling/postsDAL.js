const mongoose = require('mongoose');

class PostsDAL {

    commentSchema;
    Comment;
    Post;

    constructor() {

        mongoose.connect('mongodb://localhost/Reddit')
            .then(() => console.log('Connected to MongoDB.'))
            .catch(err => console.log('Could not connect to MongoDB...', err));


        this.commentSchema = new mongoose.Schema({

            comment: String,
            creator: String,
            upVotes: { type: Number, default: 0 },
            downVotes: { type: Number, default: 0 },
            date: { type: Date, default: Date.now }

        });

        this.Comment = mongoose.model('Comment', this.commentSchema);

        this.Post = mongoose.model('Post', new mongoose.Schema({

            title: String,
            creator: String,
            upVotes: { type: Number, default: 0 },
            downVotes: { type: Number, default: 0 },
            comments: [this.commentSchema], //embed comment document 
            date: { type: Date, default: Date.now }

        }));
    }

    async createPost(title, creator) {

        const post = new this.Post({
            title,
            creator
        });

        const result = await post.save();

    }

    async getPosts() {
        const posts = await this.Post.find();
        return posts;
    }

    async updatePost(id) {
        const post = await Post.findById(id);
        if (!post) return;

        post.isPublished = true;
        post.author = 'Another Author';

        const result = await post.save();
        console.log('Updatingggg', result);
    }

    async removePost(id) {
        const result = await Post.deleteOne({ _id: id });

    }
}

module.exports = { PostsDAL };


