const cancelPostForm = async (event) => {
  event.preventDefault();
  document.location.replace('/dashboard');
}

const updatePostForm = async (event) => {
  event.preventDefault();

  //get post info
  const postInfo = {
    title: document.querySelector('#post-title').value.trim(),
    contents: document.querySelector('#post-content').value.trim(),
  }

  if (!postInfo.title || !postInfo.contents) {
    alert('Please enter input in all fields.');
    return;
  }

  //new post
  const info = await fetch(`/api/posts/`, {

    method: 'POST',
    body: JSON.stringify(postInfo),
    headers: { 'Content-Type': 'application/json' },
  });

  if (info.ok) {
    document.location.replace('/dashboard');
  } else {
    console.log(info)
    alert('Please try again!')
  }
}

document.querySelector('.post-cancel').addEventListener('click', cancelPostForm);
document.querySelector('.post-create').addEventListener('click', updatePostForm);