const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/createpost', withAuth, async (req, res) => {
  try {
    const userData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [{ model: Post, attributes: ['title'] },
      ],
      where: {
        user_id: req.session.user_id
      }
    });

    if (!userData) {
      res.status(404).json('Id not found');
      return;
    }
    const postData = data.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, logged_in: req.seesion.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [
        { model: Post, attributes: ['id', 'title'] },
        { model: User, attributes: ['id'] }
      ],
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;