const upvote = document.getElementById('upvote');
const downvote = document.getElementById('downvote');
const responseMessage = document.getElementById('response');

function upvoteQuestion(event) {
  event.preventDefault();
  const query = window.location.search.substring(1);
  const questionId = query.split('=')[1];

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions/${questionId}/upvote`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        document.getElementById('questionvotes').innerText = data.data[0].votes;
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}

function downvoteQuestion(event) {
  event.preventDefault();
  const query = window.location.search.substring(1);
  const questionId = query.split('=')[1];

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions/${questionId}/downvote`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        document.getElementById('questionvotes').innerText = data.data[0].votes;
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}

upvote.addEventListener('click', upvoteQuestion);
downvote.addEventListener('click', downvoteQuestion);
