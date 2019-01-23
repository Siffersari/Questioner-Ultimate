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
      phoneNumber: document.getElementById('signno').value,
    }),
  })
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();

        document.getElementById('signresp').innerHTML = JSON.stringify(data.data[0].message);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        window.alert(JSON.stringify(dataOne.error));
      }
    });
}

signupbtn.addEventListener('click', signUp);
