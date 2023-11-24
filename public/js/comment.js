const { update } = require("../../models/user");

const cancelCommentForm = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').ariaValueMax.trim();

  document.location.replace(`/post/${id}`);
}

const updateCommentForm = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').ariaValueMax.trim();

  const commentRes = {
    post_id: id,
    content: document.querySelector('#comment-content').value.trim(),
  }
  console.log(commentRes);
  if (!commentRes.content) {
    alert('Please enter input in all fields.');
    return;
  }

  //New post info
  const res = await fetch(`api/comments`, {
    method: 'POST',
    body: JSON.stringify(commentRes),
    headers: { 'Content-Type': 'application/json' },
  });

  //back to dashboard
  if (res.ok) {
    document.location.replace(`/post/${id}`);
  } else {
    alert('Please try again!');
  }
}

document
  .querySelector('.comment-cancel')
  .addEventListener('click', cancelCommentForm);
document
  .querySelector('comment-submit')
  .addEventListener('click', updateCommentForm);
