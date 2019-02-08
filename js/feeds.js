window.onload = function getTopQuestions(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        const numberQuestions = data.data.length;
        if (numberQuestions === 0) {
          document.getElementById('questiondivision').innerHTML = '<h2 class="top-response"> No questions asked yet</h2>';
          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
        } else {
          let i = 0;
          let result = ' ';
          while (i < numberQuestions) {
            result += `<div class="questioner-message">            
              <div class="questioner-message-name">
                  <h3>${data.data[i].createdBy}</h3>
                  <p>${data.data[i].createdOn}</p>
              </div>
              <div class="questioner-message-body">
              <h2> <a href="question.html?mi=${data.data[i].meetup}" class="questioner-list-anchor">${data.data[i].meetupTopic}</a></h2>
                  <a href="comment.html?qi=${data.data[i].id}"><strong>${data.data[i].title}</strong></a>
                  <p>
                      ${data.data[i].body}
                  </p>
                  <div class="questioner-question-accessories">
                    <span>${data.data[i].votes}</span> <i class="fa fa-thumbs-up questioner-votes"></i>
                    <span class="questioner-comments">70</span> <i class="fa fa-comment"></i>
                </div>
              </div>
              </div>`;
            i++;
          }
          document.getElementById('questiondivision').innerHTML = result;
        }
      }
      if (resp.status !== 200) {
        const responseMessage = document.getElementById('response');
        const dataOne = await resp.json();
        if (JSON.stringify(dataOne.error).includes('expired') || JSON.stringify(dataOne.error).includes('valid')) {
          responseMessage.innerHTML = 'Sorry this session has expired. Please log in to continue';

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          responseMessage.innerHTML = JSON.stringify(dataOne.error);

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
    });
};
