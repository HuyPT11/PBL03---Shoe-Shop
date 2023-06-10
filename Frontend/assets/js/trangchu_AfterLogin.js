function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
}

const User5 = getUserInfo();
console.log(User5);
if (User5 !== null) {
    const nameLink = document.querySelector('#displayName');
    if (User5.data.phanQuyen.maQuyen === '3') nameLink.textContent = User5.data.customer.maKH;
    else {
        nameLink.textContent = User5.data.employee.maNV;
        const cart = document.querySelector('#cart');
        cart.style.display = 'none';
    }
    const register = document.querySelector('#register');
    const login = document.querySelector('#login');
    register.style.display = 'none';
    login.style.display = 'none';
    (() => {
        const lgout = document.querySelector('#LOGOUT');
        console.log(lgout);
        lgout.addEventListener('click', () => {
            localStorage.removeItem("MyJSON");
            window.location = '/trangchu.html';
        })
    })()
}
else {
    const cart = document.querySelector('#cart');
    cart.style.display = 'none';
    const user = document.querySelector('#user');
    user.style.display = 'none';
    const displayname = document.querySelector('#displayName');
    displayname.style.display = 'none';
    const lg = document.querySelector('#LOGOUT');
    lg.style.display = 'none';
}



function redirectToDetailsPage(productId) {
    console.log(productId);
    window.location.href = `chitietsanpham.html?id=${productId}`;
}



var count = 0;
fetch('http://localhost:8089/sanpham/filter/type=MH1&min=0&max=5000000&mau=all&kc=all&nh=all&name=')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        const productsList = document.getElementById('main__similarproduct-listproduct--giaythethao');
        data.data.forEach(product => {
            if (count === 4) {
                return;
            }
            if (product.mh.tenMH === "Giày thể thao") {
                const productItem = document.createElement('li');
                productItem.classList.add('main__similarproduct--item');
                productItem.innerHTML = `
                 <div class="main__products-item--img" style="position: relative; background: url(assets/img/${product.hinhanh}); width: 290px; height: 290px; background-repeat: no-repeat; background-size: 100%;" onclick="redirectToDetailsPage('${product.maSP}')">
                   <img src="./assets/img/logosanpham.png" alt="" style="position: absolute; top: 0px; left: 0px; width: 90px; height: 80px;">
                   ${product.km.mucKM ? `<div class="main__products-item--discount"><label class="main__products-item--discount-label">${product.km.mucKM * 100}%</label></div>` : ''}
                 </div>
                 <div class="main__products-item--name">
                   <label class="main__products-item--name-label">${product.tenSP}</label>
                 </div>
                 <div class="main__products-item--price">
                   <label class="main__products-item--label-giakhuyenmai">${(1 - product.km.mucKM) * product.giaban}đ</label>
                   <label class="main__products-item--label-giagoc">${product.giaban}đ</label>
                 </div>`;
                count++;
                productsList.appendChild(productItem);
            }
        });
    })
    .catch(error => console.error(error));


var count1 = 0;
fetch('http://localhost:8089/sanpham/filter/type=MH3&min=0&max=5000000&mau=all&kc=all&nh=all&name=')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        const productsList = document.getElementById('main__similarproduct-listproduct--giaysneaker');
        data.data.forEach(product => {
            if (count1 === 4) {
                return;
            }
            if (product.mh.tenMH === "Giày Sneaker") {
                const productItem = document.createElement('li');
                productItem.classList.add('main__similarproduct--item');
                productItem.innerHTML = `
                 <div class="main__products-item--img" style="position: relative; background: url(assets/img/${product.hinhanh}); width: 290px; height: 290px; background-repeat: no-repeat; background-size: 100%;" onclick="redirectToDetailsPage('${product.maSP}')">
                   <img src="./assets/img/logosanpham.png" alt="" style="position: absolute; top: 0px; left: 0px; width: 90px; height: 80px;">
                   ${product.km.mucKM ? `<div class="main__products-item--discount"><label class="main__products-item--discount-label">${product.km.mucKM * 100}%</label></div>` : ''}
                 </div>
                 <div class="main__products-item--name">
                   <label class="main__products-item--name-label">${product.tenSP}</label>
                 </div>
                 <div class="main__products-item--price">
                   <label class="main__products-item--label-giakhuyenmai">${(1 - product.km.mucKM) * product.giaban}đ</label>
                   <label class="main__products-item--label-giagoc">${product.giaban}đ</label>
                 </div>`;
                count1++;
                productsList.appendChild(productItem);
            }
        });
    })
    .catch(error => console.error(error));


var count2 = 0;
fetch('http://localhost:8089/sanpham/filter/type=MH2&min=0&max=5000000&mau=all&kc=all&nh=all&name=')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        const productsList = document.getElementById('main__similarproduct-listproduct--giayda');
        data.data.forEach(product => {
            if (count2 === 4) {
                return;
            }
            if (product.mh.tenMH === "Giày da") {
                const productItem = document.createElement('li');
                productItem.classList.add('main__similarproduct--item');
                productItem.innerHTML = `
                 <div class="main__products-item--img" style="position: relative; background: url(assets/img/${product.hinhanh}); width: 290px; height: 290px; background-repeat: no-repeat; background-size: 100%;" onclick="redirectToDetailsPage('${product.maSP}')">
                   <img src="./assets/img/logosanpham.png" alt="" style="position: absolute; top: 0px; left: 0px; width: 90px; height: 80px;">
                   ${product.km.mucKM ? `<div class="main__products-item--discount"><label class="main__products-item--discount-label">${product.km.mucKM * 100}%</label></div>` : ''}
                 </div>
                 <div class="main__products-item--name">
                   <label class="main__products-item--name-label">${product.tenSP}</label>
                 </div>
                 <div class="main__products-item--price">
                   <label class="main__products-item--label-giakhuyenmai">${(1 - product.km.mucKM) * product.giaban}đ</label>
                   <label class="main__products-item--label-giagoc">${product.giaban}đ</label>
                 </div>`;
                count2++;
                productsList.appendChild(productItem);
            }
        });
    })
    .catch(error => console.error(error));