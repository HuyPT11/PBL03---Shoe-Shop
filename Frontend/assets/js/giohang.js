function getUserInfo() {
  const token = localStorage.getItem("MyJSON");
  const obj = JSON.parse(token);
  //if (!token) return null;
  return obj;
}

const User = getUserInfo();
const color = {};
fetch('http://localhost:8089/sanpham/mau')
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      color[valuee.maMau] = valuee.tenMau;
    });
  })
  .catch(error => console.error(error));

const Province = {};
const Province1 = {};
const select_Province = document.getElementById("province-select");
fetch("http://localhost:8089/bill/province")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.id;
      option.textContent = valuee.name;
      Province[valuee.id] = valuee.fee;
      Province1[valuee.id] = valuee.time;
      select_Province.appendChild(option);
    });
  })
  .catch(error => console.error(error));

const select_Ship = document.getElementById("ship-select");
fetch("http://localhost:8089/bill/dvvc")
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      const option = document.createElement("option");
      option.value = valuee.id;
      option.textContent = valuee.name;
      select_Ship.appendChild(option);
    });
  })
  .catch(error => console.error(error));


const Size = {};
fetch('http://localhost:8089/sanpham/kc')
  .then(response => response.json())
  .then(data => {
    data.forEach(valuee => {
      Size[valuee.maKC] = valuee.soKC;
    });
  })
  .catch(error => console.error(error));



var tong = 0;
var ship = 0;

var uid;
function ThanhToan(x) {
  return new Promise(async (resolve, reject) => {
    uid = Date.now().toString(36) + Math.random().toString(36).slice(2);
    uid = uid.toUpperCase();
    uid = uid.slice(9);
    console.log(uid);

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();

    const dateOnly = `${year}-${month}-${day}`;
    const url = `http://localhost:8089/bill/add`;

    const data = {
      maKH: User.data.customer.maKH,
      maHD: uid,
      maNV: 'Chờ xác nhận',
      maDVVC: document.querySelector("#ship-select").value,
      date: dateOnly,
      maTinh: document.querySelector("#province-select").value,
      address: document.querySelector("#address").value,
      sumPrice: x,
      status: 0,
      mota: document.querySelector("#note").value
    };
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phonenumber').value;
    const email = document.querySelector('#email').value;
    const address = document.querySelector('#address').value;
    if (name === "" || phone === "" || email === "" || address === "") {
      alert('Vui lòng điền đầy đủ thông tin');
    }
    else {
      // console.log(data)
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) alert("Đặt hàng thành công");

        const arr = await fetch(`http://localhost:8089/cart/${User.data.customer.maKH}`)
          .then(response => response.json());

        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
          const url2 = `http://localhost:8089/bill/addbilldetail`;

          const data2 = {
            maSP: arr[i].maSP,
            tenSP: arr[i].tenSP,
            maMau: arr[i].maMau,
            maKC: arr[i].maKC,
            soluong: arr[i].soLuong,
            maHD: uid,
          };
          console.log(data2);
          const options2 = {
            method: 'POST',
            body: JSON.stringify(data2),
            headers: {
              'Content-Type': 'application/json'
            }
          };
          const response2 = await fetch(url2, options2);
          console.log(response2);
        }
        resolve();

        var str = 'Xác nhận đơn hàng - ';
        str += uid.toString() + '\n\n';
        var tsp = 'Tên sản phẩm' + '\n';
        for (let i = 0; i < arr.length; i++) {
          var y = arr[i].tenSP + ' x ' + arr[i].soLuong.toString();
          y += '\n';
          tsp += y;


        }
        str += tsp;
        str += '\n';
        str += '------------------------------------\n'
        str = str + 'Tổng tiền: ' + x.toString() + '\n';
        str += 'Thời gian dự kiến nhận hàng ' + Province1[document.querySelector("#province-select").value];
        const data3 =
        {
          recipient: document.querySelector("#email").value,
          msgBody: str,
          subject: "NKH Shop - Xác nhận đơn hàng " + uid.toString(),
        }
        console.log(data3);
        const url3 = `http://localhost:8089/sendMail`;
        const options3 = {
          method: 'POST',
          body: JSON.stringify(data3),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response3 = await fetch(url3, options3);
        console.log(response3);
        resolve();
        const deleteUrl = `http://localhost:8089/cart/delete/${User.data.customer.maKH}`;
        const deleteOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const deleteResponse = await fetch(deleteUrl, deleteOptions);
        console.log(deleteResponse);
        if (deleteResponse.status === 200) location.reload();
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }

  });

}
function ThanhToan1(x) {
  return new Promise(async (resolve, reject) => {
    uid = Date.now().toString(36) + Math.random().toString(36).slice(2);
    uid = uid.toUpperCase();
    uid = uid.slice(9);
    console.log(uid);

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();

    const dateOnly = `${year}-${month}-${day}`;
    const url = `http://localhost:8089/bill/add`;

    const data = {
      maKH: User.data.customer.maKH,
      maHD: uid,
      maNV: 'Chờ xác nhận',
      maDVVC: document.querySelector("#ship-select").value,
      date: dateOnly,
      maTinh: document.querySelector("#province-select").value,
      address: document.querySelector("#address").value,
      sumPrice: x,
      status: 0,
      mota: document.querySelector("#note").value
    };
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phonenumber').value;
    const email = document.querySelector('#email').value;
    if (name === "" || phone === "" || email === "") {
      alert('Vui lòng điền đầy đủ thông tin');
    }
    else {
      // console.log(data)
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) alert("Đặt hàng thành công");

        const arr = await fetch(`http://localhost:8089/cart/${User.data.customer.maKH}`)
          .then(response => response.json());

        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
          const url2 = `http://localhost:8089/bill/addbilldetail`;

          const data2 = {
            maSP: arr[i].maSP,
            tenSP: arr[i].tenSP,
            maMau: arr[i].maMau,
            maKC: arr[i].maKC,
            soluong: arr[i].soLuong,
            maHD: uid,
          };
          console.log(data2);
          const options2 = {
            method: 'POST',
            body: JSON.stringify(data2),
            headers: {
              'Content-Type': 'application/json'
            }
          };
          const response2 = await fetch(url2, options2);
          console.log(response2);
        }
        resolve();

        var str = 'Xác nhận đơn hàng - ';
        str += uid.toString() + '\n\n';
        var tsp = 'Tên sản phẩm' + '\n';
        for (let i = 0; i < arr.length; i++) {
          var y = arr[i].tenSP + ' x ' + arr[i].soLuong.toString();
          y += '\n';
          tsp += y;

          // console.log(arr[i]);
          // const data2 = {
          //   maSP: arr[i].maSP,
          //   tenSP: arr[i].tenSP,
          //   maMau: arr[i].maMau,
          //   maKC: arr[i].maKC,
          //   soluong: arr[i].soLuong,
          //   maHD: uid,
          // };
        }
        str += tsp;
        str += '\n';
        str += '------------------------------------\n'
        str = str + 'Tổng tiền: ' + x.toString() + '\n';
        str += 'Nhận hàng tại địa chỉ: 122 Nguyễn Lương Bằng - Liên Chiểu - Đà Nẵng';
        const data3 =
        {
          recipient: document.querySelector("#email").value,
          msgBody: str,
          subject: "NKH Shop - Xác nhận đơn hàng " + uid.toString(),
        }
        console.log(data3);
        const url3 = `http://localhost:8089/sendMail`;
        const options3 = {
          method: 'POST',
          body: JSON.stringify(data3),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response3 = await fetch(url3, options3);
        console.log(response3);
        resolve();


        const deleteUrl = `http://localhost:8089/cart/delete/${User.data.customer.maKH}`;
        const deleteOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const deleteResponse = await fetch(deleteUrl, deleteOptions);
        console.log(deleteResponse);
        if (deleteResponse.status === 200) location.reload();

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }
  });
}


$(document).ready(function () {
  let SumCost = 0;
  const fetchPromise = fetch(`http://localhost:8089/cart/${User.data.customer.maKH}`)
    .then(response => response.json())
    .then(data => {

      // console.log(data);
      data.forEach(product => {
        var giaa = product.soLuong * product.gia;
        tong = tong + giaa;
        //console.log(tong);
        $('#product-detail').append(`
            <ul class="product__detail-list">
              <li class="product-detail-item navbar-brand" href="#">
                ${product.tenSP}
              </li>
              <li class="product-detail-item product-price">${product.gia}</li>
              <li class="product-detail-item product-color">${color[product.maMau]}</li>
              <li class="product-detail-item product-size">${Size[product.maKC]}</li>
              <li class="product-detail-item product-quantity">${product.soLuong}</li>
              <li class="product-detail-item product-total">${giaa}</li>
             <li class="product-detail-item product-action product-action--trash">
                            <button class="btn btn-danger delete-btn" 
                             data-product-id="${product.maSP}"  
                             data-product-mau="${product.maMau}" 
                             data-product-kichco="${product.maKC}" 
                             data-product-ten="${User.data.customer.maKH}">
                                Xóa
                            </button>
                        </li>
            </ul>
            <div class="product__detail-line"></div>
          `);
      });
      $(document).on('click', '.delete-btn', function () {
        const productId = $(this).data('product-id');
        const color = $(this).data('product-mau');
        const size = $(this).data('product-kichco');
        const maKh = $(this).data('product-ten');
        // console.log(color);
        //console.log(maKh,' ',productId, ' ', color, ' ',size);
        // console.log(`http://localhost:8089/cart/delete/${maKh}&${productId}&${size}&${color}`);
        fetch(`http://localhost:8089/cart/del/${maKh}&${productId}&${size}&${color}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            location.reload();
          })
          .catch(error => console.error(error));
      });
      ship = Province[document.querySelector("#province-select").value];
      //console.log(ship);
      const shipElement = document.querySelector('.shoppingcart__item--price-phivanchuyen');
      shipElement.textContent = ship.toLocaleString() + ' đ';
      totalCost = tong + ship;
      //console.log(totalCost);
      SumCost = totalCost;
      //console.log(SumCost);
      const priceElement = document.querySelector('.shoppingcart__item--price-tongtienhang');
      priceElement.textContent = tong.toLocaleString() + ' đ';
      const totalElement = document.querySelector('#total');
      totalElement.textContent = totalCost.toLocaleString() + ' đ';
      select_Province.addEventListener('click', function () {
        // console.log(tong);
        ship = Province[document.querySelector("#province-select").value];
        //console.log(ship);
        const shipElement = document.querySelector('.shoppingcart__item--price-phivanchuyen');
        shipElement.textContent = ship.toLocaleString() + ' đ';
        totalCost = tong + ship;
        //console.log(totalCost);
        SumCost = totalCost;
        //console.log(SumCost);
        const priceElement = document.querySelector('.shoppingcart__item--price-tongtienhang');
        priceElement.textContent = tong.toLocaleString() + ' đ';
        const totalElement = document.querySelector('#total');
        totalElement.textContent = totalCost.toLocaleString() + ' đ';


      })



    });
  const btpay = document.querySelector('#off');
  btpay.addEventListener('click', async function () {
    try {
      await fetchPromise;
      await ThanhToan(SumCost);
      console.log(uid);
      const response = await fetch(`http://localhost:8089/bill/updateamount/${uid}`, {
        method: 'PUT'
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
  const btpay1 = document.querySelector('#on');
  btpay1.addEventListener('click', async function () {
    try {
      await fetchPromise;
      await ThanhToan1(SumCost);
      console.log(uid);
      const response = await fetch(`http://localhost:8089/bill/updateamount/${uid}`, {
        method: 'PUT'
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
});


