const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// router.get('dashboard/create-post', withAuth, async (req, res) => {
//   try {
//     const userData = await Post.findAll({
//       attributes: ['id', 'title', 'content', 'date_created'],
//       include: [{ model: Post, attributes: ['title'] },
//       ],
//       where: {
//         user_id: req.session.user_id
//       }
//     });

//     if (!userData) {
//       res.status(404).json('Id not found');
//       return;
//     }
//     const postData = userData.map((post) => post.get({ plain: true }));

//     res.render('dashboard', { postData, logged_in: req.seesion.logged_in });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// create new product
router.post('/dashboard/create-post', (req, res) => {
  console.log(req.body)
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Post.create({
    title: req.body.title,
    contents: req.body.contents,
    date_created: true
  })
  console.log("body", req.body)
    .then((newPost) => {
      // Send the newly created row as a JSON object
      res.json(newPost);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post('/dashboard/create-post', async (req, res) => {
//   try {
//     const userData = await User.create((req.body) {

//       attributes: ['id', 'title', 'content', 'date_created'],
//       include: [{ model: Post, attributes: ['title'] },
//       ],
//       where: {
//         user_id: req.session.user_id
//       }
//     })
//   });

// req.session.save(() => {
//   req.session.user_id = userData.id;
//   req.session.logged_in = true;

//   res.status(200).json(userData);
// });
//   } catch (err) {
//   res.status(400).json(err);
// }
// });

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'contents', 'created_at'],
      include: [

        { model: User, attributes: ['id'] }
      ],
    });
    const post = postData.get({ plain: true })
    res.render('edit', { post, logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;