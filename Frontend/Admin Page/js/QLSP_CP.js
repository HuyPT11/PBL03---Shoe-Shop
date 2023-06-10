
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
        { id: 2, name: "Tên sản phẩm: A đến Z" },
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

    fetch(`http://localhost:8089/sanpham/filterproduct/name=&id=1`)
        .then(res => res.json())
        .then(data => {
            //  console.log(data);
            data.data.forEach(user => {
                console.log(user);
                for (let i = 0; i < user.productDetails.length; i++) {
                     console.log(user.productDetails[i].hinhAnh);
                    const arr = user.productDetails[i].hinhAnh.split(',');
                    console.log(arr);
                    if ($("#productTable tbody").length == 0) {
                        $("#productTable").append("<tbody></tbody>");
                    }
                    $("#productTable tbody").append("<tr>" +
                        "<td>" +
                        `<button type='button' onclick='window.location.href="QLSP_Update.html?id=${user.maSP}&size=${user.productDetails[i].maKC}&color=${user.productDetails[i].maMau} ";'class='btn btn-defaul'>` +
                        "<span class='glyphicon glyphicon-edit' />" +
                        "</button>" +
                        "</td>" +
                        "</td>" +
                        `<td>${user.maSP}</td>` +
                        `<td>${user.tenSP}</td>` +
                        `<td>${Size[user.productDetails[i].maKC]}</td>` +
                        `<td>${color[user.productDetails[i].maMau]}</td>` +
                        `<td>${user.nh.tenNH}</td>` +
                        `<td>${user.mh.tenMH}</td>` +
                        `<td>${user.km.mucKM * 100}%</td>` +
                        `<td>${user.productDetails[i].soLuong}</td>` +
                        `<td>${user.giaban + user.productDetails[i].gia}</td>` +
                        `<td><img src="/assets/img/${arr[0]}" width="100" height="100" ></td>` +
                        "<td>" +
                        `<button type='button' onclick="deleteSanPham('${user.maSP}','${user.productDetails[i].maMau}','${user.productDetails[i].maKC}')" class='btn btn-default'>` +
                        "<span class='glyphicon glyphicon-remove' />" +
                        "</button>" +
                        // "<td>" +
                        // `<button type='button' onclick='window.location.href="QLSP_Update.html?id=${user.maSP}&size=${user.productDetails[i].maKC}&color=${user.productDetails[i].maMau} ";'class='btn btn-defaul'>` +
                        // "<span class='glyphicon glyphicon-edit' />" +
                        // "</button>" +
                        // "</td>" +
                        "</tr>");
                }
            });
        })
        .catch(error => console.log(error));





    document.querySelector('#Search').addEventListener('click', function () {
        $("#productTable tbody").empty();
        const search = document.querySelector('#search').value;
        const s = document.querySelector("#Sort-select").value;
        console.log(search, ' ', s);
        fetch(`http://localhost:8089/sanpham/filterproduct/name=${search}&id=${s}`)
            .then(res => res.json())
            .then(data => {
                //  console.log(data);
                data.data.forEach(user => {
                    //   console.log(user.maSP);
                    for (let i = 0; i < user.productDetails.length; i++) {
                        if ($("#productTable tbody").length == 0) {
                            $("#productTable").append("<tbody></tbody>");
                        }
                        $("#productTable tbody").append("<tr>" +
                            "<td>" +
                            `<button type='button' onclick='window.location.href="QLSP_Update.html?id=${user.maSP}&size=${user.productDetails[i].maKC}&color=${user.productDetails[i].maMau} ";'class='btn btn-defaul'>` +
                            "<span class='glyphicon glyphicon-edit' />" +
                            "</button>" +
                            "</td>" +
                            "</td>" +
                            `<td>${user.maSP}</td>` +
                            `<td>${user.tenSP}</td>` +
                            `<td>${Size[user.productDetails[i].maKC]}</td>` +
                            `<td>${color[user.productDetails[i].maMau]}</td>` +
                            `<td>${user.nh.tenNH}</td>` +
                            `<td>${user.mh.tenMH}</td>` +
                            `<td>${user.km.mucKM * 100}%</td>` +
                            `<td>${user.productDetails[i].soLuong}</td>` +
                            `<td>${user.giaban + user.productDetails[i].gia}</td>` +
                            `<td><img src="/assets/img/${user.productDetails[i].hinhAnh}" width="100" height="100" ></td>` +
                            "<td>" +
                            `<button type='button' onclick="deleteSanPham('${user.maSP}','${user.productDetails[i].maMau}','${user.productDetails[i].maKC}')" class='btn btn-default'>` +
                            "<span class='glyphicon glyphicon-remove' />" +
                            "</button>" +
                            // "<td>" +
                            // `<button type='button' onclick='window.location.href="QLSP_Update.html?id=${user.maSP}&size=${user.productDetails[i].maKC}&color=${user.productDetails[i].maMau} ";'class='btn btn-defaul'>` +
                            // "<span class='glyphicon glyphicon-edit' />" +
                            // "</button>" +
                            // "</td>" +
                            "</tr>");
                    }
                });
            })
            .catch(error => console.log(error));
    })
}




Show();
  //Sort();
