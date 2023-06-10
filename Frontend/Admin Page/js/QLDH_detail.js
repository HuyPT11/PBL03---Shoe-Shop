$(document).ready(function () {

  $(".fa-search").click(function () {
    $(".container__search, .input__search").toggleClass("active");
    $("input[type='text']").focus();
  });

});

// Button Add
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);

const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');
const sum = urlParams.get('sum');
document.querySelector("#ID").value = ID;
const url2 = `http://localhost:8089/bill/detail/${ID}`;
fetch(url2)
  .then(response => response.json())
  .then(data => {
    //  console.log(data);
    data.data.forEach(product => {
      console.log(product);
      if ($("#listProductTable tbody").length == 0) {
        $("#listProductTable").append("<tbody></tbody>");
      }
      $("#listProductTable tbody").append(
        "<tr>" +
        `<td>${product.maSP}</td>` +
        `<td>${product.tenSP}</td>` +
        `<td>${product.maMau}</td>` +
        `<td>${product.maKC}</td>` +
        `<td>${product.soluong}</td>` +
        // `<td>${product.soluong*}</td>` +
        // `<td>${product.thanhtien}</td>` +  //soluong*(giaban+gia);
        "</tr>");
      document.querySelector("#Total").value = sum;
    });
  })
  .catch(error => console.error(error));




