
window.onload = function getQuestion(event) {
  event.preventDefault();
  const query = window.location.search.substring(1);
  const questionId = query.split('=')[1];

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions/${questionId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (response) => {
      if (response.ok) {
        const questiondata = await response.json();

        const numberQuestions = questiondata.data.length;

        if (numberQuestions === 0) {
          document.getElementById('questiondivision').innerHTML = 'No questions asked yet';
        }


        let result = '<div class="questioner-message bottomless"> ';

        result += `
              <img src="http://placehold.it/50x50" alt="" class="questioner-avatar-small" id="message-avatar">
              <div class="questioner-message-name">
                  <h3>${questiondata.data[0].user}</h3>
                  <p>${questiondata.data[0].createdOn}</p>
              </div>
              <div class="questioner-message-body">
                  <p><strong>${questiondata.data[0].title}</strong></p>
                  <p>
                      ${questiondata.data[0].body}
                  </p>
                  <div class="questioner-question-accessories">
                      <span class="questioner-comments">0</span> <i class="fa fa-comment"></i>
                  </div>
              </div>
              </div>`;

        document.getElementById('questiondivision').innerHTML = result;
        document.getElementById('questionvotes').innerText = questiondata.data[0].votes;
      }
      if (response.status !== 200) {
        const dataOne = await response.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/comments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (commentresponse) => {
      if (commentresponse.ok) {
        const commentdata = await commentresponse.json();

        const numberComments = commentdata.data.length;
        if (numberComments === 0) {
          document.getElementById('questiondivision').innerHTML = 'No comments posted yet';
        }
        let i = numberComments - 1;
        let result = ' ';
        while (i >= 0) {
          result += `<div class="questioner-message">
          <img src="http://placehold.it/50x50" alt="" class="questioner-avatar-small" id="message-avatar">
          <div class="questioner-message-name">
              <h3>${commentdata.data[i].createdBy}</h3>

          </div>
          <div class="questioner-message-body" id="questioner-comment">

              <p>
                  ${commentdata.data[i].comment[0]}
              </p>

              <div class="questioner-comment-time">
                  <p>${commentdata.data[i].createdOn}</p>
              </div>

          </div>
      </div>`;
          i--;
        }
        document.getElementById('commentdivision').innerHTML = result;
      }
      if (commentresponse.status !== 200) {
        const dataOne = await commentresponse.json();
        if (JSON.stringify(dataOne.error).includes('expired')) {
          window.alert(JSON.stringify('Sorry this session has expired. Please log in to continue'));

          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          window.alert(JSON.stringify(dataOne.error));
        }
      }
    });
};
