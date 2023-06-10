// Button Add
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);
function loadFiles(event) {
  var images = document.getElementById('output-images');
  for (var i = 0; i < event.target.files.length; i++) {
    var image = document.createElement('img');
    image.src = URL.createObjectURL(event.target.files[i]);
    image.width = 200;
    images.appendChild(image);


  }
};



const select_Brand = document.getElementById("brand-select");
fetch("http://localhost:8089/sanpham/nh")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maNH;
      option.textContent = valuee.tenNH;
      select_Brand.appendChild(option);
    });
  })
  .catch(error => console.error(error));

const select_Category = document.getElementById("category-select");
fetch("http://localhost:8089/sanpham/mh")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maMH;
      option.textContent = valuee.tenMH;
      select_Category.appendChild(option);
    });
  })
  .catch(error => console.error(error));

const select_Discount = document.getElementById("discount-select");
fetch("http://localhost:8089/sanpham/km")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maKM;
      option.textContent = `${valuee.mucKM * 100}%`;
      select_Discount.appendChild(option);
    });
  })
  .catch(error => console.error(error));
var productId;
function AddProduct() {
  const product = {
    maSP: document.querySelector("#MaSP").value,
    tenSP: document.querySelector("#TenSP").value,
    giaBan: document.querySelector("#giaban").value,
    maNH: document.querySelector("#brand-select").value,
    maMH: document.querySelector("#category-select").value,
    maKM: document.querySelector("#discount-select").value,
    hinhAnh: "",
    moTa: document.querySelector("#input_mota").value
  };

  try {
    const file = document.getElementById('input-images').files[0];
    if (file) {
      product.hinhAnh = file.name;
    }
  } catch (error) {
    console.error(error);
  }

  console.log(product.hinhAnh);

  if (
    product.maSP === "" ||
    product.tenSP === "" ||
    product.giaBan === "" ||
    product.maMH === "" ||
    product.maNH === "" ||
    product.maKM === "" ||
    product.hinhAnh === "" ||
    product.moTa === ""
  ) {
    alert("Vui lòng nhập thông tin đầy đủ");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    };

    fetch("http://localhost:8089/sanpham/create", options)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          window.location.href = `QLSP_AddDetail.html?id=${product.maSP}`;
        } else {
          alert("Thêm sản phẩm thất bại. Vui lòng nhập thông tin hợp lệ");
        }
      })
      .catch(error => {
        alert("Thêm sản phẩm thất bại. Vui lòng nhập thông tin hợp lệ");
        console.error(error);
      });
  }
}

const AddButton = document.querySelector("#continue");

AddButton.addEventListener("click", function () {
  AddProduct();
});

// Active
$(document).ready(function () {
  $('#ul-size li').click(function () {
    $('#ul-size li.select-size-active').removeClass('select-size-active');
    $(this).addClass('select-size-active');
  });
});

$(document).ready(function () {
  $('#ul-color li').click(function () {
    $('#ul-color li.select-color-active').removeClass('select-color-active');
    $(this).addClass('select-color-active');
  });
});

