const resetbtn = document.getElementById('passresetbtn');

function resetPassword(event) {
  event.preventDefault();
  const query = window.location.search.substring(1);
  const params = query.split('&');
  const token = params[0].split('=')[1];


  fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/auth/reset_password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      password: document.getElementById('pwd').value,
      confirmPass: document.getElementById('cpwd').value,
    }),
  })
    .then(async (resp) => {
      const responseMessage = document.getElementById('response');
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
      if (resp.status !== 200) {
        const dataOne = await resp.json();

        if (JSON.stringify(dataOne.error).includes('token')) {
          responseMessage.innerHTML = 'This reset link has expired. Please request for another one';

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
          setTimeout(() => {
            window.location.href = 'reset.html';
          }, 2000);
        } else {
          responseMessage.innerHTML = dataOne.error;

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
      }
    });
}


resetbtn.addEventListener('click', resetPassword);
