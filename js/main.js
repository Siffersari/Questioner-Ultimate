const responseMessage = document.getElementById('response');

const pagearray = [];

function promptSignup() {
  responseMessage.innerHTML = 'Please sign up first to see more.';

  responseMessage.className += ' show';

  setTimeout(() => {
    responseMessage.className = responseMessage.className.replace('show', '');
  }, 3000);

  setTimeout(() => {
    window.location.href = 'register.html';
  }, 2000);
}

window.onload = function fetchUpcoming(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/upcoming', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        const numberMeetups = data.data.length;
        if (numberMeetups === 0) {
          const meetDiv = document.getElementById('meetupdivision');
          meetDiv.className += ' top-response';
          meetDiv.innerHTML = '<br><br><h2> Oops! <br> There seems to be no upcoming meetups!</h2>';
          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
        }
        let i = numberMeetups - 1;

        while (i >= 0) {
          pagearray.push(`
          <div class="questioner-column pad-bottom">
                <div class="questioner-card-detail" onclick="promptSignup();">
                    <div class="questioner-card">
                        <span class="questioner-card-category">${data.data[i].createdBy}</span>

                        <img src="http://placehold.it/50x50" alt="" class="questioner-avatar-small questioner-card-image">
                    </div>
                    <div class="questioner-card-description">
                    <h2 class="pad-left-half"><a class="questioner-explore-card">${data.data[i].topic}</a></h2>
                        <p></p>
                        <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[i].location}</span>
                        <br><br>
                        <span class="questioner-span"> ${data.data[i].happeningOn}</span>
                    </div>
                </div>
            </div>`);
          i -= 1;
        }
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }

      const displaycurr = pagearray.slice(0, 6);

      const finalres = displaycurr.join(' ');

      document.getElementById('meetupdivision').innerHTML = finalres;
    });
};
