
window.onload = function getMeetup(event) {
  event.preventDefault();

  const query = window.location.search.substring(1);
  const meetupId = query.split('=')[1];


  const url = `https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${meetupId}`;

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        const result = `<div class="questioner-product">

        <img src="https://picsum.photos/200/150?image=0" alt="" class="questioner-product-image">
        <div class="questioner-product-description">
            <h3> <a href="#" class="questioner-list-anchor" id="meetuptopic">${data.data[0].topic}</a></h3>
            <p></p>
            <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[0].location}</span>
            <br><br>
            <span class="questioner-span"> ${data.data[0].happeningOn}</span>
        </div>

    </div>
    <hr class="questioner-rule">

    <div class="questioner-forms">
        <button class="questioner-btn-transround delete" id="deletemeetup" onclick="deleteMeetup(${meetupId});">DELETE</button>
    </div>`;

        document.getElementById('deletemeetdiv').innerHTML = result;
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
          responseMessage.innerHTML = dataOne.error;

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
    });
};

function deleteMeetup(meetupId) {
  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${meetupId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        const data = await resp.json();

        responseMessage.innerHTML = 'Meetup deleted successfully';

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);

        setTimeout(() => {
          window.location.href = 'meetups.html';
        }, 2000);
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
