const router = require('express').Router();
const { Post } = require('../../models');

//create new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);

    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});

//update post route

//delete route




module.exports = router;
