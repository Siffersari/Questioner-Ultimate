const deletemeetbtn = document.getElementById('deletemeetup');


function deleteMeetup(event) {
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

        fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${meetupId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
          .then(async (resp) => {
            if (resp.ok) {
              const data = await resp.json();
              console.log(data);
              document.getElementById('dmeetupresp').innerHTML = 'Meetup deleted successfully';

              setTimeout(() => {
                window.location.href = 'meetups.html';
              }, 2000);
            }
            if (resp.status !== 200) {
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


deletemeetbtn.addEventListener('click', deleteMeetup);
