const postcommentbtn = document.getElementById('postcomment');


function postComment(event) {
  event.preventDefault();

  const query = window.location.search.substring(1);
  const questionId = query.split('=')[1];

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({
      question: questionId,
      comment: document.getElementById('commentbody').value,
    }),
  })
    .then(async (resp) => {
      if (resp.ok) {
        document.getElementById('commentresp').innerText = 'Comment posted successfully';
        setTimeout(() => {
          window.location.href = `comment.html?qi=${questionId}`;
        }, 2000);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
}

postcommentbtn.addEventListener('click', postComment);
