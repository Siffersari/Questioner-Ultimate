

let start = 0;

let finish = 6;

const pagearray = [];


window.onload = function getTopQuestions(event) {
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


  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/questions', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        const numberQuestions = data.data.length;
        if (numberQuestions === 0) {
          document.getElementById('questiondivision').innerHTML = '<h2 class="top-response"> No questions asked yet</h2>';
          const paginationdiv = document.getElementById('viewpagination');
          paginationdiv.style.display = 'none';
        } else {
          let i = 0;

          while (i < numberQuestions) {
            pagearray.push(`<div class="questioner-message">            
              <div class="questioner-message-name">
                  <h3>${data.data[i].createdBy}</h3>
                  <p>${data.data[i].createdOn}</p>
              </div>
              <div class="questioner-message-body">
              <h2> <a href="question.html?mi=${data.data[i].meetup}" class="questioner-list-anchor">${data.data[i].meetupTopic}</a></h2>
                  <a href="comment.html?qi=${data.data[i].id}"><strong>${data.data[i].title}</strong></a>
                  <p>
                      ${data.data[i].body}
                  </p>
                  <div class="questioner-question-accessories">
                    <span>${data.data[i].votes}</span> <i class="fa fa-thumbs-up questioner-votes"></i>
                    <span class="questioner-comments">70</span> <i class="fa fa-comment"></i>
                </div>
              </div>
              </div>`);

            i += 1;
          }
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
        document.getElementById('questiondivision').innerHTML = '<h2 class="top-response"> Nothing to display</h2>';
        const nextselect = document.getElementById('next');
        nextselect.style.display = 'none';
      } else {
        const finalres = displaycurr.join(' ');


        document.getElementById('questiondivision').innerHTML = finalres;
      }
    });


  document.getElementById('next').addEventListener('click', getNext);

  document.getElementById('prev').addEventListener('click', getPrev);
};
