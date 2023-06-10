
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
)
const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');


function Update(id, password) {
    let Gender = "Nam";
    if (document.querySelector("#Female").checked) {
        Gender = "Nữ";
    }
    const staff = {
        maTk: document.querySelector("#ID").value,
        customer: null,
        employee:
        {
            maNV: document.querySelector("#ID").value,
            tenNV: document.querySelector("#Name").value,
            gt: Gender,
            ns: document.querySelector("#BirthDay").value,
            diachi: document.querySelector("#Address").value,
            sdt: document.querySelector("#Phone").value,
            email: document.querySelector("#Email").value,
            luong: parseInt(document.querySelector("#Salary").value),
        },
        matkhau: password,
        phanQuyen:
        {
            maQuyen: "2",
            tenQuyen: "employee",
        },
        email: document.querySelector("#Email").value,
        sdt: document.querySelector("#Phone").value

    };
    if (
        staff.employee.tenNV === "" ||
        staff.employee.diachi === "" ||
        staff.employee.sdt === "" ||
        staff.employee.email === "" ||
        staff.employee.sdt === "" ||
        staff.employee.luong === null
    ) {
        alert('Vui lòng nhập thông tin đầy đủ');
    }
    else {
        fetch(`http://localhost:8089/taikhoan/employee/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staff)
        })
            .then(res => {
                if (res.ok) {
                    alert('Cập nhật thành công');
                } else {
                    throw new Error('Failed ');
                }
            })
            .catch(error => {
                alert('Cập nhật nhân viên thất bại. Vui lòng nhập thông tin hợp lệ');
                console.error(error);
            });
    }
}


var Pass;
const url = `http://localhost:8089/taikhoan/employee/get/${ID}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed');
        }
        return response.json();
    })
    .then(data => {
        if (data.employee.gt === "Nam") document.getElementById("Male").setAttribute("checked", "checked");
        else document.getElementById("Female").setAttribute("checked", "checked");
        document.querySelector("#ID").value = data.maTk;
        document.querySelector("#Name").value = data.employee.tenNV;
        document.querySelector("#Address").value = data.employee.diachi;
        document.querySelector("#Phone").value = data.employee.sdt;
        document.querySelector("#Email").value = data.employee.email;
        document.querySelector("#BirthDay").value = data.employee.ns;
        document.querySelector("#Salary").value = data.employee.luong;
        Pass = data.matkhau;
        outsideFetch(Pass);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function outsideFetch(passValue) {
    const UpdateButton = document.querySelector("#Update");
    UpdateButton.addEventListener("click", function () {

        Update(ID, passValue);
    });
}


