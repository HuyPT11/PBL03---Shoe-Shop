
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

// document.addEventListener("DOMContentLoaded", function () {
//   const select_Sort = document.getElementById("Sort-select");

//   const SortArr = [
//     { id: 1, name: "Mặc định" },
//     { id: 2, name: "Tên nhà cung cấp" },
//     { id: 3, name: "Lĩnh vực kinh doanh" },
//     { id: 4, name: "Địa chỉ" },
//   ];

//   SortArr.forEach(valuee => {
//     const option = document.createElement("option");
//     option.value = valuee.id;
//     option.textContent = valuee.name;
//     // console.log(option.value,' ',option.textContent);
//     select_Sort.appendChild(option);
//   });
// });

// function Sort() {
//   const select_Sort = document.getElementById("Sort-select");
//   select_Sort.addEventListener('change', () => {
//     console.log(select_Sort.value);
//     // handle sort
//     $("#providerTable tbody").empty();
//     const textSearch = '';
//     fetch(`http://localhost:8089/sanpham/list/${select_Sort.value}&${textSearch}`)             //Thay đổi
//       .then(res => res.json())
//       .then(data => {
//         //console.log(data);
//         data.forEach(provider => {
//           if ($("#providerTable tbody").length == 0) {
//             $("#providerTable").append("<tbody></tbody>");
//           }
//           $("#providerTable tbody").append(
//             "<tr>" +
//             "<td>" +
//             `<button type='button' onclick='window.location.href="QLNCC_Update.html?id=${provider.maNCC}";'class='btn btn-default'>` +
//             "<span class='glyphicon glyphicon-edit' />" +
//             "</button>" +
//             "</td>" +
//             `<td>${provider.maNCC}</td>` +
//             `<td>${provider.tenNCC}</td>` +
//             `<td>${provider.nguoidaidien}</td>` +
//             `<td>${provider.linhvuckindoanh}</td>` +
//             `<td>${provider.sdt}</td>` +
//             `<td>${provider.diachi}</td>` +
//             `<td>${provider.email}</td>` +
//             "<td>" +
//             `<button type='button' onclick='deleteNhaCungCap(\"${provider.maNCC}\");' class='btn btn-default'>` +
//             "<span class='glyphicon glyphicon-remove' />" +
//             "</button>" +
//             "</td>" +
//             "</tr>");
//         });
//       })
//       .catch(error => console.log(error));
//   })

//   // console.log(SortCBB.id,' ',textSearch);

// }
function Show() {
  fetch('http://localhost:8089/supplier/getlist/name=')
    .then(res => res.json())
    .then(data => {
      data.data.forEach(provider => {
        console.log(provider);
        if ($("#providerTable tbody").length == 0) {
          $("#providerTable").append("<tbody></tbody>");
        }
        $("#providerTable tbody").append(
          "<tr>" +
          "<td>" +
          `<button type='button' onclick='window.location.href="QLNCC_Update.html?id=${provider.maNCC}";' class='btn btn-defaul'>` +
          "<span class='glyphicon glyphicon-edit' />" +
          "</button>" +
          "</td>" +
          `<td>${provider.maNCC}</td>` +
          `<td>${provider.tenNCC}</td>` +
          `<td>${provider.nguoiDaiDien}</td>` +
          `<td>${provider.linhVucKinhDoanh}</td>` +
          `<td>${provider.sdt}</td>` +
          `<td>${provider.diaChi}</td>` +
          `<td>${provider.email}</td>` +
          // "<td>" +
          // `<button type='button' onclick='window.location.href="QLNCC_Update.html?id=${provider.maNCC}";' class='btn btn-defaul'>` +
          // "<span class='glyphicon glyphicon-edit' />" +
          // "</button>" +
          // "</td>" +
          "<td>" +
          `<button type='button' onclick='deleteNhaCungCap(\"${provider.maNCC}\");' class='btn btn-default'>` +
          "<span class='glyphicon glyphicon-remove' />" +
          "</button>" +
          "</td>" +
          "<td>" +
          `<button type='button' onclick='window.location.href="QLNCC_Send.html?id=${provider.email}";' class='btn btn-defaultt'>` +
          "<span class='glyphicon glyphicon-envelope' />" +
          "</button>" +
          "</td>" +
          "</tr>");
      });
    })
    .catch(error => console.log(error));


  document.querySelector('#search').addEventListener('change', function () {
    $("#providerTable tbody").empty();
    const search = document.querySelector('#search').value;

    fetch(`http://localhost:8089/supplier/getlist/name=${search}`)
      .then(res => res.json())
      .then(data => {
        data.data.forEach(provider => {
          console.log(provider);
          if ($("#providerTable tbody").length == 0) {
            $("#providerTable").append("<tbody></tbody>");
          }
          $("#providerTable tbody").append(
            "<tr>" +
            "<td>" +
            `<button type='button' onclick='window.location.href="QLNCC_Update.html?id=${provider.maNCC}";' class='btn btn-defaul'>` +
            "<span class='glyphicon glyphicon-edit' />" +
            "</button>" +
            "</td>" +
            `<td>${provider.maNCC}</td>` +
            `<td>${provider.tenNCC}</td>` +
            `<td>${provider.nguoiDaiDien}</td>` +
            `<td>${provider.linhVucKinhDoanh}</td>` +
            `<td>${provider.sdt}</td>` +
            `<td>${provider.diaChi}</td>` +
            `<td>${provider.email}</td>` +
            // "<td>" +
            // `<button type='button' onclick='window.location.href="QLNCC_Update.html?id=${provider.maNCC}";' class='btn btn-defaul'>` +
            // "<span class='glyphicon glyphicon-edit' />" +
            // "</button>" +
            // "</td>" +
            "<td>" +
            `<button type='button' onclick='deleteNhaCungCap(\"${provider.maNCC}\");' class='btn btn-default'>` +
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +
            "</td>" +
            "<td>" +
            `<button type='button' onclick='window.location.href="QLNCC_Send.html?id=${provider.email}";' class='btn btn-defaultt'>` +
            "<span class='glyphicon glyphicon-envelope' />" +
            "</button>" +
            "</td>" +
            "</tr>");
        });
      })
      .catch(error => console.log(error));
  })
}
Show();
// Sort();
