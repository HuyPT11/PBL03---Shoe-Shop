document.querySelector('#setPass').addEventListener('click', function () {
    var pass = document.querySelector('#pass').value;
    var usn = localStorage.getItem("username");
    usn = usn.replace(/"/g, '');
    // console.log(usn);
    var confirmpass = document.querySelector('#confirmpass').value;
    if (pass === confirmpass) {
        //  console.log(usn);
        fetch(`http://localhost:8089/taikhoan/changepass=${usn}&${confirmpass}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(res => {
                if (res.ok) {
                    alert('Đổi mật khẩu thành công');
                    window.location.href = '/dangnhap.html';
                } else {
                    throw new Error('Failed ');
                }
            })
            .catch(error => {
                alert(error);
            });
    }
    else {
        alert('Mật khẩu mới không khớp');
    }
})