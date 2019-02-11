window.onload = function fetchProfile(event) {
  event.preventDefault();


  const url = 'https://questioner-apiv2-siffersari.herokuapp.com/api/v2/users';

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        const result = `<div class="questioner-product pad-top">

        <img src="https://picsum.photos/300/300?image=0" alt="" class="questioner-product-image" id="profile">
        <div class="questioner-product-description">
            <h1 class="pad-left-half"> ${data.data[0].name}</h1>
            <hr class="questioner-rule hang">
            <br><br>
            <span class="questioner-span" id="venue"> Member Since:</span>
            <p>${data.data[0].registeredOn}</p>
            <span class="questioner-span" id="venue">Email</span>
            <p>${data.data[0].email}</p>
            <span class="questioner-span" id="venue">Username</span>
            <p>${data.data[0].username}</p>

        </div>

    </div>
    <h2 class="questioner-center main-heading">MY STATS</h2>
    <hr class="questioner-rule semi">
    <div class="questioner-tabs questioner-margin">
        <div class="questioner-tabs-item active" id="questioner-stats-tab">
            <h3><a href="questions.html" class="questioner-anchor-button"> ${data.data[0].questions} </a></h3>
            <p><a href="questions.html" class="questioner-anchor-button"> POSTED QUESTIONS </a> </p>
        </div>
        <div class="questioner-tabs-item" id="questioner-stats-tab">
            <h3>${data.data[0].comments}</h3>
            <p>COMMENTED QUESTIONS</p>
        </div>

    </div>`;

        document.getElementById('profiledivision').innerHTML = result;
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
