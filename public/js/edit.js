const cancelPostForm = async (event) => {
  event.preventDefault();
  document.location.replace('/dashboard');
}

const updatePostForm = async (event) => {
  event.preventDefault();

  //get post info
  const postInfo = {
    id: document.querySelector('#post-id').value.trim(),
    title: document.querySelector('#post-title').value.trim(),
    content: document.querySelector('#post-content').value.trim(),
  }

  if (!postInfo.title || !postInfo.content) {
    alert('Please enter input in all fields.');
    return;
  }

  //update info
  const info = await fetch(`/api/post/${postInfo.id}`, {
    method: 'PUT',
    body: JSON.stringify(postInfo),
    headers: { 'Content-Type': 'application/json' },
  });

  //back to dashboard
  if (info.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Please try again!')
  }
}

const deletePost = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('#post-id').value.trim();

  console.log(post_id);

  //update post info
  const info = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  //back to dashboard
  if (info.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Please try again!');
  }
}

document.querySelector('.post-cancel').addEventListener('click', cancelPostForm);
document.querySelector('.post-update').addEventListener('click', updatePostForm);
document.querySelector('.post-delete').addEventListener('click', deletePost);