
window.onload = function getDetails(event) {
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

        const result = `
        
        <div class="questioner-product pad-top">

        <img src="https://picsum.photos/200/150?image=0" alt="" class="questioner-product-image">
        <div class="questioner-product-description">
            <h3> <a href=# class="questioner-list-anchor" id="meetuptopic">${data.data[0].topic}</a></h3>
            <p></p>
            <span class="questioner-span" id="venue"><i class="fa fa-map-marker"></i> ${data.data[0].location}</span>
            <br><br>
            <span class="questioner-span"> ${data.data[0].happeningOn}</span>
        </div>

    </div>`;

        document.getElementById('meetupdivision').innerHTML = result;
      }
      if (resp.status !== 200) {
        const responseMessage = document.getElementById('response');
        const dataOne = await resp.json();
        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });

  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/meetups/${meetupId}/questions`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        let numberQuestions = data.data.length;

        if (typeof data.data === 'string') {
          numberQuestions = 0;
        }
        if (numberQuestions === 0) {
          document.getElementById('questiondivision').innerHTML = '<h2 class="top-response">No questions asked yet</h2>';
        } else {
          let i = 0;
          let result = ' ';
          while (i < numberQuestions) {
            result += `<div class="questioner-message">            
            <div class="questioner-message-name">
                <h3>${data.data[i].createdBy}</h3><br>
                <p class="marginless">${data.data[i].createdOn}</p>
            </div>
            <div class="questioner-message-body">
                <a href="comment.html?qi=${data.data[i].id}"><strong>${data.data[i].title}</strong></a>
                <p>
                    ${data.data[i].body}
                </p>
                <div class="questioner-question-accessories">
                <span>${data.data[i].votes}</span> <i class="fa fa-thumbs-up questioner-votes"></i>
                    <span class="questioner-comments">0</span> <i class="fa fa-comment"></i>
                </div>
            </div>
            </div>`;
            i++;
            document.getElementById('questiondivision').innerHTML = result;
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
        }
      }
    });
};
