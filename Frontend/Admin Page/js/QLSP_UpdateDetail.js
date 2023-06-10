function loadFiles(event) {
  var images = document.getElementById('output-images');
  images.innerHTML = '';
  var image = document.createElement('img');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.width = 200;
  images.appendChild(image);
  document.querySelector('#input-images').name = event.target.files[0].name;
};
const select_Size = document.getElementById("size-select");
fetch("http://localhost:8089/sanpham/kc")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maKC;
      option.textContent = valuee.soKC;
      select_Size.appendChild(option);
    });
  })
  .catch(error => console.error(error));


const select_Color = document.getElementById("color-select");
fetch("http://localhost:8089/sanpham/mau")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.maMau;
      option.textContent = valuee.tenMau;
      select_Color.appendChild(option);
    });
  })
  .catch(error => console.error(error));
const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');
const SIZE = urlParams.get('size');
const COLOR = urlParams.get('color');
const url = `http://localhost:8089/productdetail/get/${ID}&${SIZE}&${COLOR}`;



fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.querySelector("#MaSP").value = data.data.maSP;
    document.querySelector("#gia").value = data.data.gia;
    document.querySelector("#soluong").value = data.data.soLuong;
    document.querySelector("#size-select").value = data.data.maKC;
    document.querySelector("#color-select").value = data.data.maMau;
    const inputImages = document.getElementById('input-images');
    inputImages.setAttribute('name', data.data.hinhAnh);
    const images = document.getElementById('output-images');
    images.innerHTML = '';
    const image = document.createElement('img');
    image.src = `/assets/img/${data.data.hinhAnh}`;
    console.log(data.data.hinhAnh);
    image.width = 200;
    images.appendChild(image);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function UpdateProduct(id) {
  const inputImages = document.getElementById('input-images');
  //console.log(inputImages.name);
  const product = {
    maSP: document.querySelector("#MaSP").value,
    gia: document.querySelector("#gia").value,
    maKC: document.querySelector("#size-select").value,
    maMau: document.querySelector("#color-select").value,
    soLuong: document.querySelector("#soluong").value,
    hinhAnh: inputImages.name,
    trangthai: 1
  };
  if (
    product.maSP === "" ||
    product.gia === "" ||
    product.maMau === "" ||
    product.maKC === "" ||
    product.soLuong === "" ||
    product.hinhAnh === ""
  ) {
    alert('Vui lòng nhập thông tin đầy đủ');
  }
  else {
    fetch(`http://localhost:8089/productdetail/update/${ID}&${SIZE}&${COLOR}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => {
        if (res.ok) {
          console.log('Product updated successfully');
          alert('Cập nhật thành công');

        } else {
          throw new Error('Failed to update product');
          alert('Xảy ra lỗi cập nhật');
        }
      })
      .catch(error => {
        alert('Cập nhật sản phẩm thất bại. Vui lòng nhập thông tin hợp lệ');
        console.error(error);
      });
  }
}

const UpdateButton = document.querySelector("#Add");
UpdateButton.addEventListener("click", function () {
  UpdateProduct(ID);
});
