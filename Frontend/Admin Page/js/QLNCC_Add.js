// Button Add
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);

function AddProvider() {
  const provider = {
    maNCC: document.querySelector("#MaNCC").value,
    tenNCC: document.querySelector("#TenNCC").value,
    nguoiDaiDien: document.querySelector("#NguoiDD").value,
    linhVucKinhDoanh: document.querySelector("#LVKD").value,
    diaChi: document.querySelector("#DiaChi").value,
    email: document.querySelector("#Email").value,
    sdt: document.querySelector("#Sdt").value,
  };
  console.log(provider);
  if (provider.maNCC === "" || provider.tenNCC === "" || provider.nguoiDaiDien === "" ||
    provider.linhVucKinhDoanh === "" || provider.diaChi === "" || provider.email === "" || provider.sdt === "") {
    alert('Vui lòng nhập thông tin đầy đủ');
  }
  else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(provider)
    };

    fetch('http://localhost:8089/supplier/create', options)
      .then(response => {
        console.log(response);
        // Handle response
        if (response.status === 200)
          alert('Thêm thành công');
      })
      .catch(error => console.error(error));
  }
}
const AddButton = document.querySelector("#Add");
AddButton.addEventListener("click", function () {
  AddProvider();
});
