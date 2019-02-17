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
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        responseMessage.innerText = 'Comment posted successfully';

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);

        setTimeout(() => {
          window.location.href = `comment.html?qi=${questionId}`;
        }, 2000);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}

postcommentbtn.addEventListener('click', postComment);
