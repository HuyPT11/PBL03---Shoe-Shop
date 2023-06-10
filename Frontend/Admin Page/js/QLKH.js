
// Search

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
    { id: 2, name: "ID khách hàng từ A đến Z" },
  ];

  SortArr.forEach(valuee => {
    const option = document.createElement("option");
    option.value = valuee.id;
    option.textContent = valuee.name;
    // console.log(option.value,' ',option.textContent);
    select_Sort.appendChild(option);
  });
});


// Table
function SanPhamShow() {
  fetch(`http://localhost:8089/taikhoan/customer/text=&stt=1`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.data.forEach(user => {
        if ($("#productTable tbody").length == 0) {
          $("#productTable").append("<tbody></tbody>");
        }
        $("#productTable tbody").append("<tr>" +
          "<td>" +
          `<button type='button' onclick='window.location.href="QLKH_Update.html?id=${user.customer.maKH}";' class='btn btn-defaul'>` +
          "<span class='glyphicon glyphicon-edit' />" +
          "</button>" +
          "</td>" +
          `<td>${user.customer.maKH}</td>` +
          `<td>${user.customer.tenKH}</td>` +
          `<td>${user.customer.gt}</td>` +
          `<td>${user.customer.email}</td>` +
          `<td>${user.customer.diachi}</td>` +
          `<td>${user.customer.sdt}</td>` +
          `<td>${user.matkhau}</td>` +
          "<td>" +
          `<button type='button' onclick='deleteKH(\"${user.customer.maKH}\");' class='btn btn-default'>` +
          "<span class='glyphicon glyphicon-remove' />" +
          "</button>" +
          "</td>" +
          "</tr>");
      });
    })
    .catch(error => console.log(error));


  document.querySelector('#Search').addEventListener('click', function () {
    $("#productTable tbody").empty();
    const search = document.querySelector('#search').value;
    const s = document.querySelector("#Sort-select").value;
    console.log(search);
    fetch(`http://localhost:8089/taikhoan/customer/text=${search}&stt=${s}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.data.forEach(user => {
          if ($("#productTable tbody").length == 0) {
            $("#productTable").append("<tbody></tbody>");
          }
          $("#productTable tbody").append("<tr>" +
            "<td>" +
            `<button type='button' onclick='window.location.href="QLKH_Update.html?id=${user.customer.maKH}";' class='btn btn-defaul'>` +
            "<span class='glyphicon glyphicon-edit' />" +
            "</button>" +
            "</td>" +
            `<td>${user.customer.maKH}</td>` +
            `<td>${user.customer.tenKH}</td>` +
            `<td>${user.customer.gt}</td>` +
            `<td>${user.customer.email}</td>` +
            `<td>${user.customer.diachi}</td>` +
            `<td>${user.customer.sdt}</td>` +
            "<td>" +
            `<button type='button' onclick='deleteKH(\"${user.customer.maKH}\");' class='btn btn-default'>` +
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +
            "</td>" +
            "</tr>");
        });
      })
      .catch(error => console.log(error));
  })
}
SanPhamShow();
