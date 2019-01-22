const signupbtn = document.getElementById('signupbtn');


function signUp(event) {
  event.preventDefault();

  fetch('https://questioner-apiv2-siffersari.herokuapp.com/api/v2/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: document.getElementById('signfirst').value,
      othername: 'N/A',
      lastname: document.getElementById('signlast').value,
      username: document.getElementById('signuname').value,
      email: document.getElementById('signmail').value,
      password: document.getElementById('signpwd').value,
      phoneNumber: 'Pass for now',
    }),
  })
    .then(async (resp) => {
      console.log(resp);
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        document.getElementById('signresp').innerHTML = JSON.stringify(data.data[0].message);
      }
      if (resp.status !== 201) {
        const dataOne = await resp.json();
        console.log(dataOne);
        document.getElementById('signresp').innerHTML = JSON.stringify(dataOne.error);
      }
    });
}

signupbtn.addEventListener('click', signUp);
