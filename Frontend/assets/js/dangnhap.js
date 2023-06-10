const loginButton = document.getElementById('loginForm');

loginButton.addEventListener('click', function () {
   //  console.log('OK ne');
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
   // console.log(username,' ',password);
    fetch('http://localhost:8089/taikhoan/checklogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, pass })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 'ok') {
                const MJSON = JSON.stringify(data);
                localStorage.setItem("MyJSON", MJSON);

                // const token = localStorage.getItem("MyJSON");
                // const obj = JSON.parse(token);
                // console.log(obj);
                window.location = '/trangchu.html';
            } else {
                alert('Đăng nhập thất bại');
            }
        })
        .catch(error => {
            console.error('Login failed', error);
        });
});

