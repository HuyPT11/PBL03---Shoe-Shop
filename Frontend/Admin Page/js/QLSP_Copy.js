
$(document).ready(function () {

  $(".fa-search").click(function () {
    $(".container__search, .input__search").toggleClass("active");
    $("input[type='text']").focus();
  });

});

// Sort
$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
  template += '<div class="custom-options">';
  $(this).find("option").each(function () {
    template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
  });
  template += '</div></div>';

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function () {
  $(this).parents(".custom-options").addClass("option-hover");
}, function () {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function () {
  $('html').one('click', function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});
// Button Add
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);

document.addEventListener("DOMContentLoaded", function () {
const select_Sort = document.getElementById("Sort-select");

  const SortArr = [
    { id: 1, name: "Mặc định" },
    { id: 2, name: "Giá bán: thấp đến cao" },
    { id: 3, name: "Giá bán: cao xuống thấp" },
    { id: 4, name: "Số lượng: thấp đến cao" },
    { id: 5, name: "Số lượng: cao xuống thấp" }
  ];

  SortArr.forEach(valuee => {
    const option = document.createElement("option");
    option.value = valuee.id;
    option.textContent = valuee.name;
   // console.log(option.value,' ',option.textContent);
    select_Sort.appendChild(option);
  });
});

function Sort() {
  const select_Sort = document.getElementById("Sort-select");
  // console.log(select_Sort);
  select_Sort.addEventListener('change', () => {
    // console.log(select_Sort.value);
    // handle sort
    $("#productTable tbody").empty();
    const textSearch ='';
    fetch(`http://localhost:8089/sanpham/list/${select_Sort.value}&${textSearch}`)
  .then(res => res.json())
  .then(data => {
    //console.log(data);
    data.forEach(user => {
      
     // console.log(arr);
      if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
      }
      $("#productTable tbody").append("<tr>" +
        "<td>" +
        `<button type='button' onclick='window.location.href="QLSP_Update.html?id: ${user.maSP}";'class='btn btn-default'>` +
        "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        "</td>" +
        `<td>${user.maSP}</td>` +
        `<td>${user.tenSP}</td>` +
        `<td>${user.size.soKC}</td>` +
        `<td>${user.mau.tenMau}</td>` +
        `<td>${user.nh.tenNH}</td>` +
        `<td>${user.mh.tenMH}</td>` +
        `<td>${user.km.mucKM * 100}%</td>` +
        `<td>${user.soluong}</td>` +
        `<td>${user.giaban}</td>` +
        `<td><img src="/Admin Page/img/${arr[0]}" width="100" height="100" ></td>` +
        "<td>" +
            `<button type='button' onclick="deleteSanPham('${user.maSP}','${user.productDetails[i].maMau}','${user.productDetails[i].maKC}')" class='btn btn-default'>` +
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +        
          "</td>" +
        "</tr>");
    });
  })
  .catch(error => console.log(error));
  })

  // console.log(SortCBB.id,' ',textSearch);
  
}
let currentPage = 1; //1
let perPage = 7; //5
let totalPage = 0; //0
// let perUser = [];

// let users = [
//   {
//     maSP: '1',
//     tenSP: 'x',
//     kichco: 32,
//     mau: 'Đỏ',
//     nhanhieu: 'a',
//     mathang: 'ds',
//     khuyenmai: 0.5,
//     soluong: 11,
//     giaban: 23232,
//     hinhanh: 'dfdfd'
//   },
//   {
//     maSP: '2',
//     tenSP: 'x',
//     kichco: 32,
//     mau: 'Đỏ',
//     nhanhieu: 'a',
//     mathang: 'ds',
//     khuyenmai: 0.5,
//     soluong: 11,
//     giaban: 23232,
//     hinhanh: 'dfdfd'
//   },
//   {
//     maSP: '3',
//     tenSP: 'x',
//     kichco: 32,
//     mau: 'Đỏ',
//     nhanhieu: 'a',
//     mathang: 'ds',
//     khuyenmai: 0.5,
//     soluong: 11,
//     giaban: 23232,
//     hinhanh: 'dfdfd'
//   },
//   {
//     maSP: '4',
//     tenSP: 'x',
//     kichco: 32,
//     mau: 'Đỏ',
//     nhanhieu: 'a',
//     mathang: 'ds',
//     khuyenmai: 0.5,
//     soluong: 11,
//     giaban: 23232,
//     hinhanh: 'dfdfd'
//   },{
//     maSP: '5',
//     tenSP: 'x',
//     kichco: 32,
//     mau: 'Đỏ',
//     nhanhieu: 'a',
//     mathang: 'ds',
//     khuyenmai: 0.5,
//     soluong: 11,
//     giaban: 23232,
//     hinhanh: 'dfdfd'
//   }
// ];
let users = [];
function Show() {
  const color = {};
  fetch('http://localhost:8089/sanpham/mau')
    .then(response => response.json())
    .then(data => {
      data.forEach(valuee => {
        color[valuee.maMau] = valuee.tenMau;
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
  fetch('http://localhost:8089/sanpham')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(user => {  //user: mỗi sp trong bảng sp
        const arr = user.hinhanh.split("|");
        console.log(user.maSP);
        for (let i = 0; i < user.productDetails.length; i++){  //productDetails: các màu,size của sp đó
          users.push({
            maSP: user.maSP,
            tenSP: user.tenSP,
            kichco: Size[user.productDetails[i].maKC],
            mau: color[user.productDetails[i].maMau],
            nhanhieu: user.nh.tenNH,
            mathang: user.mh.tenMH,
            khuyenmai: user.km.mucKM,
            soluong: user.productDetails[i].soLuong,
            giaban: user.giaban + user.productDetails[i].gia,
            hinhanh: user.productDetails[i].hinhAnh
          });
        //   getUser();
        // if ($("#productTable tbody").length == 0) {
        //   $("#productTable").append("<tbody></tbody>");
        // }
        // $("#productTable tbody").append("<tr>" +
        //   "<td>" +
        //   `<button type='button' onclick='window.location.href="QLSP_Update.html?id: ${user.maSP}";'class='btn btn-default'>` +
        //   "<span class='glyphicon glyphicon-edit' />" +
        //   "</button>" +
        //   "</td>" +
        //   `<td>${user.maSP}</td>` +
        //   `<td>${user.tenSP}</td>` +
        //    `<td>${Size[user.productDetails[i].maKC]}</td>` +
        //    `<td>${color[user.productDetails[i].maMau]}</td>` +
        //   `<td>${user.nh.tenNH}</td>` +
        //   `<td>${user.mh.tenMH}</td>` +
        //   `<td>${user.km.mucKM * 100}%</td>` +
        //    `<td>${user.productDetails[i].soLuong}</td>` +
        //   `<td>${user.giaban + user.productDetails[i].gia }</td>` +
        //   `<td><img src="./img/${user.productDetails[i].hinhAnh}" width="100" height="100" ></td>` +
        //   "<td>" +
        //   `<button type='button' onclick="deleteSanPham('${user.maSP}','${user.productDetails[i].maMau}','${user.productDetails[i].maKC}')" class='btn btn-default'>` +
        //   "<span class='glyphicon glyphicon-remove' />" +
        //   "</button>" +
        //   "</td>" +
        //   "</tr>");
      }
      });
    })
    .catch(error => console.log(error));
}

Show();
//Sort();

async function getUser() {
  try {
    // users=...users.;
    perUser = users.slice (
      (currentPage-1)*perPage,
      (currentPage-1)*perPage + perPage,
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
  perUser = users.slice (
      (currentPage-1)*perPage,
      (currentPage-1)*perPage + perPage,
    ) 
  renderUser();
}

function renderPageNumber() {
  totalPage = users.length / perPage + 0.5;
  for (let i = 1 ; i<= totalPage; i++) {
    document.getElementById("pagination").innerHTML += `<li onclick="handlePageNumber(${i})">${i}</li>`;
  }
}

function renderUser() { 
  let element =
  // `thead
   `<tr>
          
          <th>Mã sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Kích cỡ</th>
          <th>Màu</th>
          <th>Nhãn hiệu</th>
          <th>Loại mặt hàng</th>
          <th>Khuyến mãi</th>
          <th>Số lượng</th>
          <th>Giá bán</th>
          <th>Hình ảnh</th>
          <th>Xóa</th>
          <th>Sửa</th>
      </tr>`
      // </thead>
  ;

  perUser.map(value => {
    element += 
      "<tr>" +
          `<td>${value.maSP}</td>` +
          `<td>${value.tenSP}</td>` +
           `<td>${value.kichco}</td>` +
           `<td>${value.mau}</td>` +
          `<td>${value.nhanhieu}</td>` +
          `<td>${value.mathang}</td>` +
          `<td>${value.khuyenmai*100}%</td>` +
           `<td>${value.soluong}</td>` +
          `<td>${value.giaban}</td>` +
          `<td><img src="./img/${value.hinhanh}" width="100" height="100" ></td>` +
          "<td>" +
          `<button type='button' onclick="deleteSanPham('${value.maSP}','${value.mau}','${value.kichco}')" class='btn btn-default'>` +
          "<span class='glyphicon glyphicon-remove' />" +
          "</button>" +
          "</td>" +
        "<td>" +
          `<button type='button' onclick='window.location.href="QLSP_Update.html?id: ${value.maSP}";'class='btn btn-default'>` +
          "<span class='glyphicon glyphicon-edit' />" +
          "</button>" +
          "</td>" +
      "</tr>"});
    document.getElementById("productTable").innerHTML = element;
  }
