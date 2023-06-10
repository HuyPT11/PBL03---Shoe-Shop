
const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');


const AddButton = document.querySelector("#Add");
AddButton.addEventListener("click", function () {
    const content = {
        recipient: ID,
        msgBody: document.querySelector('#TenNCC').value,
        subject: document.querySelector('#MaNCC').value,

    };
    if (content.msgBody === "" || content.subject === "") {
        alert("Vui lòng nhập thông tin đầy đủ");
    }
    else {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        };

        fetch('http://localhost:8089/sendMail', options)
            .then(response => {
                console.log(content);
                console.log(response);
                if (response.ok) {
                    alert("Gửi thành công");
                    window.location.href = 'QLNCC.html'
                }

            })
            .catch(error => console.error(error));
    }
});