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
      tags: document.getElementById('createtags').value,
      topic: document.getElementById('createabout').value,

    }),
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        document.getElementById('cmeetresp').innerHTML = 'Meetup created successfully';

        setTimeout(() => {
          window.location.href = 'meetups.html';
        }, 2000);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
}

meetupbtn.addEventListener('click', createMeetup);
