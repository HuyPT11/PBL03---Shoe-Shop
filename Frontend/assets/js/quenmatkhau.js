var OK = false;
var email;
document.querySelector('#quenmatkhau').addEventListener('click', async function () {
    const usn = document.querySelector('#username').value;
    fetch(`http://localhost:8089/taikhoan/forgot/${usn}`)
        .then(res => res.json())
        .then(async function (data) {
            // console.log(data)
            if (data.status === 'ok') {
                OK = true;
                email = data.data.email;

                if (OK) {
                    try {
                        var uid = Date.now().toString(36) + Math.random().toString(36).slice(2);
                        uid = uid.toUpperCase();
                        uid = uid.slice(9);
                        //   console.log(uid);
                        const MJSON = JSON.stringify(uid.toString());
                        localStorage.setItem("IDConfirm", MJSON);
                        const MJSON1 = JSON.stringify(document.querySelector('#username').value);
                        localStorage.setItem("username", MJSON1);

                        const recipient = email;
                        const msgBody = "Mã xác nhận của bạn là: " + uid.toString();
                        const subject = "NKH Shop - Xác nhận tài khoản ";

                        const data3 = {
                            recipient: recipient,
                            msgBody: msgBody,
                            subject: subject
                        };

                        console.log(data3);

                        const url3 = 'http://localhost:8089/sendMail';
                        const options3 = {
                            method: 'POST',
                            body: JSON.stringify(data3),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        const response3 = await fetch(url3, options3);
                        console.log(response3);
                        window.location.href = '/xacnhanemail.html';
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    alert('Tên đăng nhập không tồn tại');
                }
            }
        })
        .catch(error => console.log(error));
});
