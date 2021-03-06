let start = 0;

let finish = 6;

const pagearray = [];

window.onload = function getMeetups(event) {
  event.preventDefault();

  const path = window.location.pathname;

  localStorage.setItem('currentPage', path.split('/').pop());

  const currentPage = localStorage.getItem('currentPage');

  const prevPage = localStorage.getItem('prevPage');


  if (currentPage !== prevPage) {
    localStorage.setItem('start', 0);

    localStorage.setItem('finish', 6);
  }

  function getNext() {
    start = finish;

    finish = Number(finish);

    finish += 6;

    if (start < 0 || finish < 0) {
      start = 0;
      finish = 6;
    }


    localStorage.setItem('start', start);
    localStorage.setItem('finish', finish);

    localStorage.setItem('prevPage', path.split('/').pop());


    window.location.reload();
  }

  function getPrev() {
    start = Number(start) - 6;
    finish = Number(finish) - 6;

    if (start < 0 || finish < 0) {
      start = 0;
      finish = 6;
    }

    localStorage.setItem('start', start);
    localStorage.setItem('finish', finish);

    window.location.reload();
  }


  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
      if (resp.ok) {
        const data = await resp.json();
        let numberMeetups = data.data[0].scheduledMeets.length;
        if (numberMeetups === 0 || (data.data[0].scheduledMeets).includes('None')) {
          document.getElementById('adminmeetsection').innerHTML = 'No meetups found yet';
          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
          numberMeetups = 0;
        }
        let i = numberMeetups - 1;

        while (i >= 0) {
          pagearray.push(`<div class="questioner-meetup-container">

          <div class="questioner-product" id="questioner-scheduled">

              <img src="https://picsum.photos/200/150?image=0" alt="" class="questioner-product-image">
              <div class="questioner-product-description">
                  <h3> <a href="question.html?mi=${data.data[0].scheduledMeets[i][0][0]}" class="questioner-list-anchor">${data.data[0].scheduledMeets[i][0][2]}</a></h3>
                  <p></p>
                  <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[0].scheduledMeets[i][0][4]}</span>
                  <br><br>
                  <span class="questioner-span"> ${data.data[0].scheduledMeets[i][0][3]}</span>

              </div>
              <div class="questioner-product-upvotes">

              </div>

          </div>
      </div>`);
          i -= 1;
        }
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
          responseMessage.innerHTML = dataOne.error;

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
      start = Number(localStorage.getItem('start'));

      finish = Number(localStorage.getItem('finish'));


      const displaycurr = pagearray.slice(start, finish);


      if (start === 0) {
        document.getElementById('prev').style.display = 'none';
      }

      if (displaycurr.length === 0) {
        document.getElementById('adminmeetsection').innerHTML = '<h2 class="top-response"> Nothing to display</h2>';
        const nextselect = document.getElementById('next');
        nextselect.style.display = 'none';
      } else {
        const finalres = displaycurr.join(' ');

        document.getElementById('adminmeetsection').innerHTML = finalres;
      }
    });

  document.getElementById('next').addEventListener('click', getNext);

  document.getElementById('prev').addEventListener('click', getPrev);
};
