const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Load post model
const Post = require('../../models/Post');

//Load profile model
const Profile = require('../../models/Profile');

//Load user model
const User = require('../../models/User');

//Load input validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
    res.send({name:'Posts'});
});

//@route        POST /api/posts 
//@desc         Create new post
//@access       Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });

    newPost.save().then(post => res.json(post));
});

//@route        GET /api/posts 
//@desc         Get all posts
//@access       Public
router.get('/', (req, res) => {
    Post.find()
    .populate('user', ['name', 'avatar'])
    .sort({ date:-1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
});

//@route        GET /api/posts/:post_id 
//@desc         Get post by post_id
//@access       Public
router.get('/:post_id', (req, res) => {
    Post.findById(req.params.post_id)
    .populate('user', ['name', 'avatar'])
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found'}));
});

//@route        DELETE /api/posts/:post_id 
//@desc         Delete post by post_id
//@access       Private
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user:req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {

                    //Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized.'});
                    }
                    //Delete post
                    post.remove()
                        .then(() => res.json({ success:true }))
                        .catch(err => res.status(404).json(err));

                }).catch(err => res.status(404).json({ postnotfound: 'Post not found.'}));
        });
    
});

//@route        POST /api/posts/like/:post_id 
//@desc         Like post by post_id
//@access       Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user:req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    console.log("INSIDE IF", post);
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
                        return res.status(400).json({ alreadyliked:'User already liked this post'});
                    }

                    //Add user id to likes array
                    post.likes.unshift({ user:req.user.id });

                    post.save()
                        .then(post => res.json(post));

                }).catch(err => res.status(404).json({ postnotfound: 'Post not found.'}));
        });
    
});

//@route        POST /api/posts/unlike/:post_id 
//@desc         Remove like of post by post_id
//@access       Private
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user:req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    console.log("INSIDE IF", post);
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ) {
                        return res.status(400).json({ notliked:'You have not liked this post yet.'});
                    }

                    //Get remove index
                    const removeIndex = post.likes.map(item => item.user.toString())
                        .indexOf(req.user.id);

                    //Splice out of array
                    post.likes.splice(removeIndex, 1);

                    post.save()
                        .then(post => res.json(post));

                }).catch(err => res.status(404).json({ postnotfound: 'Post not found.'}));
        });
    
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          post.comments.unshift(newComment);
  
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );
  
  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Remove comment from post
  // @access  Private
  router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: 'Comment does not exist' });
          }
  
          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
  
          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
  
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );

module.exports = router;