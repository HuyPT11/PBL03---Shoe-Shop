// Button Add
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);

const select_Brand = document.getElementById("brand-select");
fetch("http://localhost:8089/sanpham/nh")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maNH;
      option.textContent = valuee.tenNH;
      console.log(valuee.maNH)
      select_Brand.appendChild(option);
    });
  })
  .catch(error => console.error(error));
function Import() {



  const importOrder = {
    makv: document.querySelector("#ID").value,
    tenkv: document.querySelector("#Name").value,
    tinhtrang: document.querySelector("#Status").value,
    nhanhieu:
    {
      maNH: document.getElementById("brand-select").value,
      tenNH: document.getElementById("brand-select").textContent,
    }
  }
  if (importOrder.makv === "" || importOrder.tenkv === "" || importOrder.tinhtrang === "" || importOrder.nhanhieu.maNH === ""
    || importOrder.nhanhieu.tenNH === "") {
    alert("Vui lòng nhập thông tin đầy đủ");
  }
  else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(importOrder)
    };

    fetch('http://localhost:8089/area/create', options)
      .then(response => {
        if (response.status === 200) {
          alert('Thêm thành công');
        }
      })
      .catch(error => console.error(error));
  }
}
const AddButton = document.querySelector("#Add");
AddButton.addEventListener("click", function () {
  Import();
});
