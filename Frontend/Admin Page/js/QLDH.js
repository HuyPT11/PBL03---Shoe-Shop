
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
    { id: 2, name: "Trạng thái" },
    // { id: 3, name: "Khuyến mãi: Thấp đến cao" },
  ];

  SortArr.forEach(valuee => {
    const option = document.createElement("option");
    option.value = valuee.id;
    option.textContent = valuee.name;
    // console.log(option.value,' ',option.textContent);
    select_Sort.appendChild(option);
  });
});


function Show() {
  function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
  }

  const User = getUserInfo();
  if (User.data.phanQuyen.maQuyen === '3') {
    fetch(`http://localhost:8089/bill/get/id=${User.data.customer.maKH}&text=&stt=1`)
      .then(res => res.json())
      .then(data => {
        $("#productTable tbody").empty();
        data.data.forEach(user => {
          if (user.status === true) tt = "Đã xác nhận";
          else tt = "Đang chờ xác nhận";
          var nv;
          if (user.employee === null) nv = null;
          else nv = user.employee.maNV;
          if ($("#productTable tbody").length == 0) {
            $("#productTable").append("<tbody></tbody>");
          }
          $("#productTable tbody").append("<tr>" +
            "</td>" +
            `<td>${user.maHD}</td>` +
            `<td>${User.data.customer.maKH}</td>` +
            `<td>${nv}</td>` +
            `<td>${user.donvivanchuyen.name}</td>` +
            `<td>${user.date}</td>` +
            `<td>${user.province.name}</td>` +
            `<td>${user.address}</td>` +
            `<td>${user.sumPrice}</td>` +
            `<td>${tt}</td>` +
            "<td>" +
            `<a href="QLDH_detail.html?id=${user.maHD}&sum=${user.sumPrice}">` +
            "Xem chi tiết" +
            "</a>" +
            "</td>" +
            `<td>${user.province.time}</td>` +
            "<td>" +
            `<button type='button' onclick='deleteHoaDon(\"${user.maHD}\");' class='btn btn-default'>` +   //Chú ý
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +
            "</td>" +
            "</tr>");
        })
      })
      .catch(error => console.log(error));





    document.querySelector('#Search').addEventListener('click', function () {
      const search = document.querySelector('#search').value;
      console.log(search);
      const s = document.querySelector("#Sort-select").value;
      fetch(`http://localhost:8089/bill/get/id=${User.data.customer.maKH}&text=${search}&stt=${s}`)
        .then(res => res.json())
        .then(data => {
          $("#productTable tbody").empty();
          data.data.forEach(user => {
            if (user.status === true) tt = "Đã xác nhận";
            else tt = "Đang chờ xác nhận";
            var nv;
            if (user.employee === null) nv = null;
            else nv = user.employee.maNV;
            if ($("#productTable tbody").length == 0) {
              $("#productTable").append("<tbody></tbody>");
            }
            $("#productTable tbody").append("<tr>" +
              "</td>" +
              `<td>${user.maHD}</td>` +
              `<td>${User.data.customer.maKH}</td>` +
              `<td>${nv}</td>` +
              `<td>${user.donvivanchuyen.name}</td>` +
              `<td>${user.date}</td>` +
              `<td>${user.province.name}</td>` +
              `<td>${user.address}</td>` +
              `<td>${user.sumPrice}</td>` +
              `<td>${tt}</td>` +
              "<td>" +
              `<a href="QLDH_detail.html?id=${user.maHD}&sum=${user.sumPrice}">` +
              "Xem chi tiết" +
              "</a>" +
              "</td>" +
              `<td>${user.province.time}</td>` +
              "<td>" +
              `<button type='button' onclick='deleteHoaDon(\"${user.maHD}\");' class='btn btn-default'>` +   //Chú ý
              "<span class='glyphicon glyphicon-remove' />" +
              "</button>" +
              "</td>" +
              "</tr>");
          })
        })
        .catch(error => console.log(error));
    })
  }
  else {
    fetch(`http://localhost:8089/bill/getlist/id=&stt=1`)
      .then(res => res.json())
      .then(data2 => {
        $("#productTable tbody").empty();
        console.log(data2);
        data2.data.forEach(user => {
          var tt;
          if (user.status === true) tt = "Đã xác nhận";
          else tt = "Đang chờ xác nhận";
          var nv;
          if (user.employee === null) nv = null;
          else nv = user.employee.maNV;
          if ($("#productTable tbody").length == 0) {
            $("#productTable").append("<tbody></tbody>");
          }
          $("#productTable tbody").append("<tr>" +
            "</td>" +
            `<td>${user.maHD}</td>` +
            `<td>${user.customer.maKH}</td>` +
            `<td>${nv}</td>` +
            `<td>${user.donvivanchuyen.name}</td>` +
            `<td>${user.date}</td>` +
            `<td>${user.province.name}</td>` +
            `<td>${user.address}</td>` +
            `<td>${user.sumPrice}</td>` +
            `<td>
        ${tt}
        ${user.status === true ? '' : `<div><button onClick="UpdateTT('${user.maHD}','${user.customer.maKH}','${user.donvivanchuyen.id}','${user.date}','${user.province.id}','${user.address}','${user.sumPrice}','${User.data.employee.maNV}','${user.mota}')" ${user.status === 1 ? 'disabled' : ''}><span>Xác nhận</button></div>`}
        </td>`+
            "<td>" +
            `<a href="QLDH_detail.html?id=${user.maHD}&sum=${user.sumPrice}">` +
            "Xem chi tiết" +
            "</a>" +
            "</td>" +
            `<td>${user.province.time}</td>` +
            "<td>" +
            `<button type='button' onclick='deleteHoaDon(\"${user.maHD}\");' class='btn btn-default'>` +   //Chú ý
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +
            "</td>" +
            "</tr>");
        })
      })
      .catch(error => console.log(error));



    document.querySelector('#search').addEventListener('change', function () {
      $("#productTable tbody").empty();
      const search = document.querySelector('#search').value;
      const s = document.querySelector("#Sort-select").value;
      console.log(search);
      fetch(`http://localhost:8089/bill/getlist/id=${search}&stt=${s}`)
        .then(res => res.json())
        .then(data2 => {
          console.log(data2);
          data2.data.forEach(user => {
            var tt;
            if (user.status === true) tt = "Đã xác nhận";
            else tt = "Đang chờ xác nhận";
            var nv;
            if (user.employee === null) nv = null;
            else nv = user.employee.maNV;
            if ($("#productTable tbody").length == 0) {
              $("#productTable").append("<tbody></tbody>");
            }
            $("#productTable tbody").append("<tr>" +
              "</td>" +
              `<td>${user.maHD}</td>` +
              `<td>${user.customer.maKH}</td>` +
              `<td>${nv}</td>` +
              `<td>${user.donvivanchuyen.name}</td>` +
              `<td>${user.date}</td>` +
              `<td>${user.province.name}</td>` +
              `<td>${user.address}</td>` +
              `<td>${user.sumPrice}</td>` +
              `<td>
            ${tt}
            ${user.status === true ? '' : `<div><button onClick="UpdateTT('${user.maHD}','${user.customer.maKH}','${user.donvivanchuyen.id}','${user.date}','${user.province.id}','${user.address}','${user.sumPrice}','${User.data.employee.maNV}','${user.mota}')" ${user.status === 1 ? 'disabled' : ''}><span>Xác nhận</button></div>`}
            </td>`+
              "<td>" +
              `<a href="QLDH_detail.html?id=${user.maHD}&sum=${user.sumPrice}">` +
              "Xem chi tiết" +
              "</a>" +
              "</td>" +
              `<td>${user.province.time}</td>` +
              "<td>" +
              `<button type='button' onclick='deleteHoaDon(\"${user.maHD}\");' class='btn btn-default'>` +   //Chú ý
              "<span class='glyphicon glyphicon-remove' />" +
              "</button>" +
              "</td>" +
              "</tr>");
          })
        })
        .catch(error => console.log(error));
    })
  }
}
Show();
// Sort();
