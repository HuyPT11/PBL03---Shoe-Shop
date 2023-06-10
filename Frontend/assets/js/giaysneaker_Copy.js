function redirectToDetailsPage(productId) {
    console.log(productId);
    window.location.href = `chitietsanpham.html?id=${productId}`;
}


// Lọc theo giá
window.onload = function () {
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value + 'đ';
    fillColor();
}
function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value + 'đ';
    fillColor();
}
function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , red ${percent1}% , red ${percent2}%, #dadae5 ${percent2}%)`;
}

let cnt = 0;
const ul_color = document.querySelector('.main__filter-list--color');
fetch(`http://localhost:8089/sanpham/mau`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.forEach(valuee => {
            cnt++;
            const newLi = document.createElement('li');
            newLi.className = 'main__filter--item';
            const newInput = document.createElement('input');
            newInput.className = 'form-check-input';
            newInput.type = 'checkbox';
            newInput.name = 'inlineCheckboxOptions';
            newInput.id = `${valuee.maMau}`;
            newInput.value = `option${cnt}`;

            const newLabel = document.createElement('label');
            newLabel.className = 'form-check-label';
            newLabel.htmlFor = `${valuee.maMau}`;
            newLabel.textContent = valuee.tenMau;

            newLi.appendChild(newInput);
            newLi.appendChild(newLabel);
            ul_color.appendChild(newLi);


        });
    })
    .catch(error => console.error(error));

const ul_size = document.querySelector('.main__filter-list--size');
let cnt1 = 0;
fetch(`http://localhost:8089/sanpham/kc`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.forEach(valuee => {
            cnt1++;
            const newLi = document.createElement('li');
            newLi.className = 'main__filter--item';

            const newInput = document.createElement('input');
            newInput.className = 'form-check-input';
            newInput.type = 'checkbox';
            newInput.name = 'inlineCheckboxOptions1';
            newInput.id = `${valuee.maKC}`;
            newInput.value = `option${cnt1}`;

            const newLabel = document.createElement('label');
            newLabel.className = 'form-check-label';
            newLabel.htmlFor = `${valuee.maKC}`;
            newLabel.textContent = valuee.soKC;

            newLi.appendChild(newInput);
            newLi.appendChild(newLabel);
            ul_size.appendChild(newLi);

        });
    })
    .catch(error => console.error(error));

const ul_brand = document.querySelector('.main__filter-list--brand');
let cnt2 = 0;
fetch(`http://localhost:8089/sanpham/nh`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.forEach(valuee => {
            cnt2++;
            const newLi = document.createElement('li');
            newLi.className = 'main__filter--item';

            const newInput = document.createElement('input');
            newInput.className = 'form-check-input';
            newInput.type = 'checkbox';
            newInput.name = 'inlineCheckboxOptions2';
            newInput.id = `${valuee.maNH}`;
            newInput.value = `option${cnt2}`;

            const newLabel = document.createElement('label');
            newLabel.className = 'form-check-label';
            newLabel.htmlFor = `${valuee.maNH}`;
            newLabel.textContent = valuee.tenNH;

            newLi.appendChild(newInput);
            newLi.appendChild(newLabel);
            ul_brand.appendChild(newLi);

        });
    })
    .catch(error => console.error(error));

let currentPage = 1; //1
let perPage = 3; //5
let totalPage = 0; //0

let users = [];
let perUser = [];
async function getUser() {
    try {
        // users=...users.;
        //alert("fhsfdsf");
        perUser = users.slice(
            (currentPage - 1) * perPage,
            (currentPage - 1) * perPage + perPage,
        )
        renderPageNumber();
        renderUser();
    }
    catch (e) {
        console.log(e);
    }
}
function handlePageNumber(num) {
    currentPage = num;
    perUser = users.slice(
        (currentPage - 1) * perPage,
        (currentPage - 1) * perPage + perPage,
    )
    renderUser();
}

function renderPageNumber() {
    document.getElementById("pagination").innerHTML = '';
    totalPage = Math.floor(users.length / perPage);
    // console.log(users.length,' ',perPage);
    // alert("fhsfdsf");
    if (users.length % perPage) totalPage++;
    console.log(totalPage);
    for (let i = 1; i <= totalPage; i++) {
        // console.log(i);
        document.getElementById("pagination").innerHTML += `<li onclick="handlePageNumber(${i})">${i}</li>`;
    }
}

function renderUser() {
    const productsList = document.getElementById('products-list');
    document.getElementById('products-list').innerHTML = '';
    let element = ``;
    //alert("fhsfdsf");
    //console.log(perUser);
    perUser.map(value => {
        const productItem = document.createElement('li');
        productItem.classList.add('main__products-item');
        element +=
            `<li class="main__products-item">
                <div class="main__products-item--img" style="position: relative; background: url(assets/img/${value.hinhanh}); width: 290px; height: 290px; background-repeat: no-repeat; background-size: 100%;" onclick="redirectToDetailsPage('${value.maSP}')">
                <img src="./assets/img/logosanpham.png" alt="" style="position: absolute; top: 0px; left: 0px; width: 90px; height: 80px;">
                ${value.khuyenmai ? `<div class="main__products-item--discount"><label class="main__products-item--discount-label">${value.khuyenmai * 100}%</label></div>` : ''}
                </div>
                <div class="main__products-item--name">
                    <label class="main__products-item--name-label">${value.tenSP}</label>
                </div>
                <div class="main__products-item--price">
                    <label class="main__products-item--label-giakhuyenmai">${(1 - value.khuyenmai) * value.giaban}đ</label>
                    <label class="main__products-item--label-giagoc">${value.giaban}đ</label>
                </div>
            <\li>`;

    });
    document.getElementById('products-list').innerHTML = element;

}



const url = `http://localhost:8089/sanpham/filter/type=MH3&min=0&max=5000000&mau=all&kc=all&nh=all&name=`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const productsList = document.getElementById('products-list');
        document.getElementById('products-list').innerHTML = '';
        data.data.forEach(product => {
            console.log(product);
            users.push({
                maSP: product.maSP,
                hinhanh: product.hinhanh,
                khuyenmai: product.km.mucKM,
                tenSP: product.tenSP,
                giaban: product.giaban,
            });
        });
        getUser();
    })
    .catch(error => console.error(error));




const bt_Search = document.querySelector('#button-addon2');
bt_Search.addEventListener('click', function () {
    const search_content = document.querySelector('#Search').value;
    console.log(search_content);
    document.getElementById('products-list').innerHTML = '';

    // Get selected values of mau, kc, and nh
    const selectedMauInputs = document.querySelectorAll('.main__filter-list--color input:checked');
    const selectedKcInputs = document.querySelectorAll('.main__filter-list--size input:checked');
    const selectedNhInputs = document.querySelectorAll('.main__filter-list--brand input:checked');

    var selectedMauValues = Array.from(selectedMauInputs).map(input => input.id).join('&');
    var selectedKcValues = Array.from(selectedKcInputs).map(input => input.id).join('&');
    var selectedNhValues = Array.from(selectedNhInputs).map(input => input.id).join('&');
    if (selectedMauValues === '') selectedMauValues = 'all';
    else selectedMauValues += '&';
    if (selectedKcValues === '') selectedKcValues = 'all';
    else selectedKcValues += '&';
    if (selectedNhValues === '') selectedNhValues = 'all';
    else selectedNhValues += '&';
    const minRangeInput = document.querySelector('#slider-1');
    const maxRangeInput = document.querySelector('#slider-2');

    const minValue = minRangeInput.value;
    const maxValue = maxRangeInput.value;

    console.log('Minimum Value:', minValue);
    console.log('Maximum Value:', maxValue);
    console.log(selectedMauValues, ' ', selectedKcValues, ' ', selectedNhValues);
    const url = `http://localhost:8089/sanpham/filter/type=MH3&min=${minValue}&max=${maxValue}&mau=${selectedMauValues}&kc=${selectedKcValues}&nh=${selectedNhValues}&name=${search_content}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('products-list');
            users = [];
            data.data.forEach(product => {
                console.log(product);
                users.push({
                    maSP: product.maSP,
                    hinhanh: product.hinhanh,
                    khuyenmai: product.km.mucKM,
                    tenSP: product.tenSP,
                    giaban: product.giaban,

                });
            });
            getUser();
        })
        .catch(error => console.error(error));
});



