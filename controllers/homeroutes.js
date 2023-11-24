const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');


// get all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'], include: { model: User, attributes: ['name', 'createdAt'] }
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['name', 'title'],
          include: [
            {
              model: User,
              attributes: ['name', 'createdAt'],
            }
          ]
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post, comments: post.comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
//talks about '' url address
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // '' reference handlebars page
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/loginsignup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');// see line 65
    return;
  }

  res.render('loginsignup');
});

//createpost handlebars
router.get('createpost/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title'],
    });
    if (!postData) {
      res.status(404).json('No post found!');
      return
    }

    const post = postData.get({ plain: true });

    res.render('post-page', { ...post, comments: post.comments, logged_in: req.session.logged_in });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
