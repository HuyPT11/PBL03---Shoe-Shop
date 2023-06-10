document.querySelector('#Confirm').addEventListener('click', function () {
    var idconfirm = document.querySelector('#id_confirm').value;
    var IDConfirm = localStorage.getItem("IDConfirm");
    idconfirm = '"' + idconfirm + '"';
    console.log(idconfirm, ' ', IDConfirm, ' ', idconfirm === IDConfirm);
    if (idconfirm === IDConfirm) {
        localStorage.removeItem("IDConfirm");
        window.location.href = '/datlaimatkhau.html';
    }
    else {
        alert('Mã xác nhận không chính xác. Mời nhập lại')
    }
})