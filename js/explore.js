
window.onload = function getMeetups(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/upcoming', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        const numberMeetups = data.data.length;
        if (numberMeetups === 0) {
          const responseDiv = document.getElementById('exploremeetups');
          responseDiv.innerHTML = '<h2 class="top-response">No meetups found yet</h2>';
          responseDiv.className += ' fluid';

          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
        } else {
          let i = 0;
          let result = '<div class="questioner-card-row">';
          while (i < numberMeetups) {
            if (i !== 0 && i % 3 === 0) {
              result += '</div> <div class="questioner-card-row ">';
            }
            result += `
          <div class="questioner-column pad-bottom">
              <div class="questioner-card-detail">
                  <div class="questioner-card">
                      <span class="questioner-card-category">${data.data[i].createdBy}</span>

                      <img src="https://placehold.it/50x50" alt="" class="questioner-avatar-small questioner-card-image">
                  </div>
                  <div class="questioner-card-description">
                      <h2 class="pad-left-half"><a href="details.html" class="questioner-explore-card">${data.data[i].topic}</a></h2>
                      <p></p>
                      <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[i].location} </span>
                      <br><br>
                      <span class="questioner-span"> ${data.data[i].happeningOn}</span>

                  </div>

                  <button class="questioner-btn-transround" id="btn-attend" onclick="attendMeetup(${data.data[i].id});">ATTEND</button>
              </div>
          </div>`;
            i++;
          }

          result += '</div>';

          document.getElementById('exploremeetups').innerHTML = result;
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

function attendMeetup(id) {
  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${id}/rsvps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({
      response: 'yes',
    }),
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        const data = await resp.json();

        responseMessage.innerHTML = 'Success';

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();

        responseMessage.innerHTML = JSON.stringify(dataOne.error);

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}
