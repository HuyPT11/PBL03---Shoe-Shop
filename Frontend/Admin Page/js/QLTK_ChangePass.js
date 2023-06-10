function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
}

const User = getUserInfo();
console.log(User);
const bt_save = document.querySelector('#Save');
bt_save.addEventListener('click', function () {
    const oldpass = document.getElementById('OldPass').value;
    const newpass = document.getElementById('NewPass').value;
    const confirmpass = document.getElementById('ConfirmPass').value;
    // console.log(oldpass, ' ', newpass, ' ', confirmpass);
    if (oldpass === "" || newpass === "" || confirmpass === "") {
        alert("Hãy nhập mật khẩu đầy đủ");
    }
    else
        if (oldpass === User.data.matkhau) {
            const newpass = document.querySelector('#NewPass').value;
            const confirmpass = document.querySelector('#ConfirmPass').value;
            if (newpass === confirmpass) {
                fetch(`http://localhost:8089/taikhoan/changepass=${User.data.maTk}&${newpass}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
                    .then(res => {
                        if (res.ok) {
                            alert('Đổi mật khẩu thành công');
                        } else {
                            throw new Error('Failed ');
                        }
                    })
                    .catch(error => {
                        alert('Đổi mật khẩu thất bại');
                        console.error(error);
                    });
            }
            else {
                alert('Mật khẩu mới không khớp');
            }
        }
        else alert('Mật khẩu cũ không đúng');
})
