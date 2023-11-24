const router = require('express').Router();
const { Comment } = require('../../models');

//create new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);



    res.status(200).json(commentData);

  } catch (err) {
    res.status(400).json(err);
  }
});

//delete comment

router.delete('/:id', async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
