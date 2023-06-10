
// Combobox
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

fr = [];
function getData() {
    fetch("http://localhost:8089/taikhoan")
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                console.log(user.maTk);
                fr[user.maTk] = 1;
            })


        })
        .catch(error => console.error(error));
}

getData();

function AddStaff() {
    let Gender = "Nam";

    if (document.querySelector("#Female").checked) {
        Gender = "Nữ";
    }

    const salary = parseInt(document.querySelector("#Salary").value);

    const maTk = document.querySelector("#ID").value;
    const tenNV = document.querySelector("#Name").value;
    const ns = document.querySelector("#BirthDay").value;
    const diachi = document.querySelector("#Address").value;
    const sdt = document.querySelector("#Phone").value;
    const email = document.querySelector("#Email").value;
    const matkhau = document.querySelector("#Password").value;


    if (
        maTk === "" ||
        tenNV === "" ||
        ns === "" ||
        diachi === "" ||
        sdt === "" ||
        email === "" ||
        matkhau === ""
    ) {
        alert('Vui lòng nhập thông tin đầy đủ');
        return;
    }
    if (maTk.length > 10) {
        alert('Tên đăng nhập phải có độ dài nhỏ hơn 10');
        return;
    }
    if (fr[maTk] === 1) {
        alert('Tên đăng nhập đã tồn tại');
        return;
    }
    const staff = {
        maTk: maTk,
        customer: null,
        employee: {
            maNV: maTk,
            tenNV: tenNV,
            gt: Gender,
            ns: ns,
            diachi: diachi,
            sdt: sdt,
            email: email,
            luong: salary,
        },
        matkhau: matkhau,
        phanQuyen: {
            maQuyen: "2",
            tenQuyen: "employee",
        },
        email: email,
        sdt: sdt
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staff)
    };

    fetch('http://localhost:8089/taikhoan/addemployee', options)
        .then(response => {
            console.log(staff);
            console.log(response);
            if (response.ok) {
                alert("Thêm thành công");
            }
        })
        .catch(error => {
            alert('Thêm nhân viên thất bại. Vui lòng nhập thông tin hợp lệ');
            console.error(error);
        });
}

const AddButton = document.querySelector("#Add_Bt");
AddButton.addEventListener("click", function () {
    AddStaff();
});