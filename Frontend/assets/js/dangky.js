(() => {
  const register_bt = document.querySelector('.main__button-dangky');
  register_bt.addEventListener('click', () => {
    const url = 'http://localhost:8089/taikhoan/register';
    const dataa = {
      maTk: document.querySelector("#Username").value,
      customer: {
        maKH: document.querySelector("#Username").value,
        tenKH: document.querySelector("#HoTen").value,
        gt: document.querySelector("#Gender").value,
        email: document.querySelector("#Email").value,
        diachi: document.querySelector("#Address").value,
        sdt: document.querySelector("#Phone").value
      },
      matkhau: document.getElementById('Pass').value,
      employee: null,
      phanQuyen: {
        maQuyen: "3",
        tenQuyen: "customer"
      },
      email: document.querySelector("#Email").value,
      sdt: document.querySelector("#Phone").value
    };

    const confirmpassword = document.querySelector('#ConfirmPassword').value;
    const password = document.querySelector('#Pass').value;

    if (dataa.maTk === "" || dataa.customer.tenKH === "" || dataa.customer.gt === "" || dataa.customer.email === "" || dataa.customer.diachi === ""
      || dataa.customer.sdt === "" || confirmpassword === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin đăng kí");
    } else if (dataa.maTk.length > 10) {
      alert("Mã tài khoản phải có độ dài nhỏ hơn hoặc bằng 10");
    } else {
      if (confirmpassword === password) {
        fetch("http://localhost:8089/taikhoan/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataa),
        })
          .then((response) => {
            if (!response.ok) {
              alert('Tên đăng nhập đã tồn tại!')
            }
            alert("Đăng ký thành công!");
            window.location = '/dangnhap.html';

          })
          .catch((error) => {
            alert("Error registering customer:", error);

          });
      } else {
        alert("Mật khẩu không trùng khớp. Mời nhập lại")
      }
    }
  })
})();
