const resetBtn = document.getElementById('requestbtn');

function requestReset(event) {
  event.preventDefault();
  const responseMessage = document.getElementById('response');
  const email = document.getElementById('email').value;

  if (!email.includes('@')) {
    responseMessage.innerHTML = 'Please enter a valid email address';

    responseMessage.className += ' show';

    setTimeout(() => {
      responseMessage.className = responseMessage.className.replace('show', '');
    }, 3000);
  } else {
    fetch(`https://questioner-apiv2-siffersari.herokuapp.com/api/v2/users/${email}`)
      .then(async (resp) => {
        if (resp.ok) {
          const data = await resp.json();

          responseMessage.innerHTML = data.message;

          responseMessage.className += ' show';

          setTimeout(() => {
            responseMessage.className = responseMessage.className.replace('show', '');
          }, 3000);
        }
        if (resp.status !== 200) {
          const dataOne = await resp.json();

          if (JSON.stringify(dataOne.error).includes('exist')) {
            responseMessage.innerHTML = 'Please check your email for instructions';

            responseMessage.className += ' show';

            setTimeout(() => {
              responseMessage.className = responseMessage.className.replace('show', '');
            }, 3000);
          } else {
            responseMessage.innerHTML = dataOne.error;

            responseMessage.className += ' show';

            setTimeout(() => {
              responseMessage.className = responseMessage.className.replace('show', '');
            }, 3000);
            window.location.reload();
          }
        }
      });
  }
}


resetBtn.addEventListener('click', requestReset);
