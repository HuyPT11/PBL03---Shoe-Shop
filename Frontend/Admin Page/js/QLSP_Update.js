// Button Update
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);
function loadFiles(event) {
  var images = document.getElementById('output-images');
  images.innerHTML = '';
  var image = document.createElement('img');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.width = 200;
  images.appendChild(image);
  document.querySelector('#input-images').name = event.target.files[0].name;
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

const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');
const SIZE = urlParams.get('size');
const COLOR = urlParams.get('color');
const url = `http://localhost:8089/sanpham/dto/${ID}`;



fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.querySelector("#MaSP").value = data.maSP;
    document.querySelector("#TenSP").value = data.tenSP;
    document.querySelector("#giaban").value = data.giaBan;
    document.querySelector("#brand-select").value = data.maNH;
    document.querySelector("#category-select").value = data.maMH;
    document.querySelector("#discount-select").value = data.maKM;
    const inputImages = document.getElementById('input-images');
    inputImages.setAttribute('name', data.hinhAnh);
    const images = document.getElementById('output-images');
    images.innerHTML = '';
    const image = document.createElement('img');
    image.src = `/assets/img/${data.hinhAnh}`;
    console.log(inputImages.name);
    image.width = 200;
    images.appendChild(image);



    document.querySelector("#input_mota").value = data.moTa;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function UpdateProduct(id) {
  const inputImages = document.getElementById('input-images');
  console.log(inputImages.name);
  const product = {
    maSP: document.querySelector("#MaSP").value,
    tenSP: document.querySelector("#TenSP").value,
    giaBan: document.querySelector("#giaban").value,
    maNH: document.querySelector("#brand-select").value,
    maMH: document.querySelector("#category-select").value,
    maKM: document.querySelector("#discount-select").value,
    hinhAnh: inputImages.name,
    moTa: document.querySelector("#input_mota").value
  };
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
    alert("Vui lòng nhập thông tin đầy đủ'");
  }
  else {
    fetch(`http://localhost:8089/sanpham/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => {
        if (res.ok) {
          console.log('Product updated successfully');
          window.location.href = `QLSP_UpdateDetail.html?id=${id}&size=${SIZE}&color=${COLOR}`;
        } else {
          throw new Error('Failed to update product');
        }
      })
      .catch(error => {
        alert('Cập nhật sản phẩm thất bại. Vui lòng nhập thông tin hợp lệ');
        console.error(error);
      });
  }
}

const UpdateButton = document.querySelector("#continue");
UpdateButton.addEventListener("click", function () {
  UpdateProduct(ID);
});

// Active
// $(document).ready(function(){
//       $('#ul-size li').click(function(){
//            $('#ul-size li.select-size-active').removeClass('select-size-active');
//            $(this).UpdateClass('select-size-active');
//        });
// });

// $(document).ready(function(){
//       $('#ul-color li').click(function(){
//            $('#ul-color li.select-color-active').removeClass('select-color-active');
//            $(this).UpdateClass('select-color-active');
//        });
// });