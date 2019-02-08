
window.onload = function getMeetups(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/upcoming', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        const data = await resp.json();
        const numberMeetups = data.data.length;
        if (numberMeetups === 0) {
          document.getElementById('adminmeetsview').innerHTML = 'No meetups found yet';
          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
        }
        let i = 0;
        let result = ' ';
        while (i < numberMeetups) {
          result += `<div class="questioner-tabs">
          <div class="questioner-tabs-item active">
              <h3>0</h3>
              <p>Attending</p>
          </div>
          <div class="questioner-tabs-item">
              <h3>0</h3>
              <p>Questions</p>

          </div>
          <div class="questioner-tabs-item">
              <h3>0</h3>
              <p>Comments</p>

          </div>

          <div class="questioner-tabs-item">
              <br>
              <h3><a href="delete.html?mi=${data.data[i].id}" class="questioner-anchor-button"> DELETE </a></h3>
              
              </div>
      </div>
          <div class="questioner-product">

          <img src="images/meetup150.jpeg" alt="" class="questioner-product-image">
          <div class="questioner-product-description">
              <h3> <a href="#" class="questioner-list-anchor">${data.data[i].topic}</a></h3>
              <p class="questioner-tags">${data.data[i].tags}</p>
              <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[i].location} </span>
              <br><br>
              <span class="questioner-span"> ${data.data[i].happeningOn}</span>

          </div>

      </div>`;
          i++;
        }

        document.getElementById('adminmeetsection').innerHTML = result;
      }
      if (resp.status !== 200) {
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
