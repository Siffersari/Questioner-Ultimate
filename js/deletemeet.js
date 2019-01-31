const deletemeetbtn = document.getElementById('deletemeetup');


function getMeetup(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({
      location: document.getElementById('venue').innerText,
      topic: document.getElementById('meetuptopic').innerText,

    }),
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
}


deletemeetbtn.addEventListener('click', getMeetup);
