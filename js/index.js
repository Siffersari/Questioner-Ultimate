const signupbtn = document.getElementById('signupbtn');


function signUp(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: document.getElementById('signfirst').value,
      othername: document.getElementById('signother').value,
      lastname: document.getElementById('signlast').value,
      username: document.getElementById('signuname').value,
      email: document.getElementById('signmail').value,
      password: document.getElementById('signpwd').value,
      confirmPass: document.getElementById('signcpwd').value,
      phoneNumber: document.getElementById('signno').value,
    }),
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('signresp');

      if (resp.ok) {
        const data = await resp.json();

        responseMessage.innerHTML = data.data[0].message;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);


        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();

        responseMessage.innerHTML = dataOne.error;

        responseMessage.className += ' show';

        setTimeout(() => {
          responseMessage.className = responseMessage.className.replace('show', '');
        }, 3000);
      }
    });
}


signupbtn.addEventListener('click', signUp);
