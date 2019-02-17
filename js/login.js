const login = document.getElementById('loginbtn');


function logIn(event) {
  event.preventDefault();

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
        window.location.href = 'meetuptop.html';
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        const responseMessage = document.getElementById('loginresp');

        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}

login.addEventListener('click', logIn);
