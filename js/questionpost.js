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

              const numberQuestions = data.data.length;
              if (numberQuestions === 0) {
                document.getElementById('questiondivision').innerHTML = 'No questions asked yet';
              }
              let i = 0;
              let result = ' ';
              while (i < numberQuestions) {
                result += `<div class="questioner-vote-div">
                <i class="fa fa-caret-up"></i><br> <span class="questioner-votes">0</span> <br> <i class="fa fa-caret-down"></i>
            </div>
            <img src="http://placehold.it/50x50" alt="" class="questioner-avatar-small" id="message-avatar">
            <div class="questioner-message-name">
                <h3></h3>
                <p></p>
            </div>
            <div class="questioner-message-body">
                <p><strong>${data.data[i].title}</strong></p>
                <p>
                    ${data.data[i].body}
                </p>
                <div class="questioner-question-accessories">
                    <span class="questioner-comments">0</span> <i class="fa fa-comment"></i>
                </div>
            </div>`;
                i++;
              }
              document.getElementById('questiondivision').innerHTML = result;
              document.getElementById('questionresp').innerHTML = 'Your question is now live';
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


postquestionbtn.addEventListener('click', postQuestion);
