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
// router.put('/:id', async (req, res) => {
//   try {
//     const updatePost = await Post.update(req.body);
//     res.status(200).json(updatePost);

//   } catch (err) {
//     res.status(400).json(err);
//   }
// })

// Updates post based on its id
router.put('/:id', (req, res) => {
  // Calls the update method on the Post model
  Post.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.body.user_id,
      date_created: req.body.date_created
    },
    {
      // Gets the posts based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatePost) => {
      // Sends the updated Post as a json response
      res.json(updatePost);
    })
    .catch((err) => res.json(err));
});

//delete route
router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
