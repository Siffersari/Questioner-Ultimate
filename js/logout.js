const logoutbtn = document.getElementById('logoutbtn');

function logoutUser(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        document.getElementById('response').innerText = 'Logging out';

        document.getElementById('response').className += ' show';

        setTimeout(() => {
          document.getElementById('response').className = document.getElementById('response').className.replace('show', '');
        }, 3000);

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
      if (resp.status !== 200) {
        const dataOne = await resp.json();
        document.getElementById('response').innerHTML = JSON.stringify(dataOne.error);

        document.getElementById('response').className += ' show';

        setTimeout(() => {
          document.getElementById('response').className = document.getElementById('response').className.replace('show', '');
        }, 3000);
      }
    });
}

logoutbtn.addEventListener('click', logoutUser);
