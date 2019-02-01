const postquestionbtn = document.getElementById('postquestion');


function postQuestion(event) {
  event.preventDefault();

  const topic = document.getElementById('meetuptopic').innerText;

  const location = document.getElementById('venue').innerText;

  const url = `https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${topic}/${location}`;

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        const meetupId = data.data[0].id;

        fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({
            meetup: meetupId,
            title: document.getElementById('questiontitle').value,
            body: document.getElementById('questiondescription').value,
          }),
        })
          .then(async (resp) => {
            if (resp.ok) {
              const data = await resp.json();

              document.getElementById('questionresp').innerHTML = 'Your question is now live';

              setTimeout(() => {
                window.location.href = 'question.html';
              }, 2000);
            }
            if (resp.status !== 201) {
              const dataOne = await resp.json();
              window.alert(JSON.stringify(dataOne.error));
            }
          });
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
}

window.onload = function getQuestions(event) {
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
          document.getElementById('questiondivision').innerHTML = 'No questions asked yet';
        }
        let i = numberQuestions - 1;
        let result = ' ';
        while (i >= 0) {
          result += `<div class="questioner-message">
          <div class="questioner-vote-div">
                <i class="fa fa-caret-up"></i><br> <span class="questioner-votes">${data.data[i].votes}</span> <br> <i class="fa fa-caret-down"></i>
            </div>
            
            <div class="questioner-message-name">
                <h3>${data.data[i].createdBy}</h3>
                <p>${data.data[i].createdOn}</p>
            </div>
            <div class="questioner-message-body">
                <p><strong>${data.data[i].topic}</strong></p>
                <p>
                    ${data.data[i].body}
                </p>
                <div class="questioner-question-accessories">
                    <span class="questioner-comments">0</span> <i class="fa fa-comment"></i>
                </div>
            </div>
            </div>`;
          i--;
        }
        document.getElementById('questiondivision').innerHTML = result;
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
};


postquestionbtn.addEventListener('click', postQuestion);
