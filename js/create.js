const meetupbtn = document.getElementById('createmeet');


function createMeetup(event) {
  event.preventDefault();

  let happening = document.getElementById('createdate').value;
  happening = happening.concat(' ', document.getElementById('createtime').value);


  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({
      location: document.getElementById('createloc').value,
      happeningOn: happening,
      topic: document.getElementById('createabout').value,
      tags: document.getElementById('createtags').value,
    }),
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        const data = await resp.json();

        responseMessage.innerHTML = 'Meetup created successfully';

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);

        setTimeout(() => {
          window.location.href = 'meetups.html';
        }, 2000);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
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
          responseMessage.innerHTML = JSON.stringify(dataOne.error);

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
    });
}

meetupbtn.addEventListener('click', createMeetup);
