
window.onload = function getQuestion(event) {
  event.preventDefault();
  const query = window.location.search.substring(1);
  const questionId = query.split('=')[1];

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions/${questionId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (response) => {
      const responseMessage = document.getElementById('response');
      if (response.ok) {
        const questiondata = await response.json();

        const numberQuestions = questiondata.data.length;

        if (numberQuestions === 0) {
          document.getElementById('questiondivision').innerHTML = 'No questions asked yet';
        }

        const meetupId = questiondata.data[0].meetup;

        const url = `https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${meetupId}`;

        fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
          .then(async (resp) => {
            if (resp.ok) {
              const data = await resp.json();

              const meetupData = `
        <div class="questioner-product" id="questioner-product-comment">

        <div class="questioner-product-description">
            <h3> <a href="#" class="questioner-list-anchor questioner-comment-head" id="meetuptopic">${data.data[0].topic}</a></h3>
            <p></p> <br>
            <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[0].location}</span>
            <br><br>
            <span class="questioner-span"> ${data.data[0].happeningOn}</span>
        </div>

    </div>`;

              document.getElementById('meetupdivision').innerHTML = meetupData;
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


        let result = '<div class="questioner-message bottomless"> ';

        result += `
              <img src="http://placehold.it/50x50" alt="" class="questioner-avatar-small" id="message-avatar">
              <div class="questioner-message-name">
                  <h3>${questiondata.data[0].user}</h3><br>
                  <p class="marginless">${questiondata.data[0].createdOn}</p>
              </div>
              <div class="questioner-message-body">
                  <p><strong>${questiondata.data[0].title}</strong></p>
                  <p>
                      ${questiondata.data[0].body}
                  </p>
                  <div class="questioner-question-accessories">
                  </div>
              </div>
              </div>`;

        document.getElementById('questiondivision').innerHTML = result;
        document.getElementById('questionvotes').innerText = questiondata.data[0].votes;
      }
      if (response.status !== 200) {
        const dataOne = await response.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions/${questionId}/comments`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (commentresponse) => {
      if (commentresponse.ok) {
        const commentdata = await commentresponse.json();

        let numberComments = commentdata.data.length;

        if (typeof commentdata.data === 'string') {
          numberComments = 0;
        }
        if (numberComments === 0) {
          document.getElementById('commentdivision').innerHTML = '<h2 class="top-response"> No comments yet</h2>';
        } else {
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
      }
      if (commentresponse.status !== 200) {
        const responseMessage = document.getElementById('response');
        const dataOne = await commentresponse.json();
        if (JSON.stringify(dataOne.error).includes('expired')) {
          responseMessage.innerHTML = 'Sorry this session has expired. Please log in to continue';

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          responseMessage.innerHTML = dataOne.error;

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
    });
};
