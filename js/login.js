const login = document.getElementById('loginbtn');


function logIn(event) {
  event.preventDefault();

  const responseMessage = document.getElementById('loginresp');

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('loguname').value,
      password: document.getElementById('logpwd').value,
    }),
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        localStorage.setItem('token', data.data[0].token);

        fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
          .then(async (response) => {
            if (response.ok) {
              const profileData = await response.json();

              if (profileData.data[0].isAdmin === 'true') {
                window.location.href = 'administrator.html';
              } else {
                window.location.href = 'meetuptop.html';
              }
            }
            if (resp.status !== 200) {
              const dataTwo = await response.json();

              responseMessage.innerHTML = dataTwo.error;

              responseMessage.className += ' show';

              setTimeout(() => {
                responseMessage.className = responseMessage.className.replace('show', '');
              }, 3000);
            }
          });
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

login.addEventListener('click', logIn);
