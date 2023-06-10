
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
//console.log(ID);

let Pass;
const url = `http://localhost:8089/taikhoan/customer/get/${ID}`;

(async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to retrieve data');
        }
        const data = await response.json();
        console.log(data);
        if (data.data.customer.gt === 'Nam') {
            document.getElementById('Male').setAttribute('checked', 'checked');
        } else {
            document.getElementById('Female').setAttribute('checked', 'checked');
        }
        document.querySelector('#ID').value = data.data.maTk;
        document.querySelector('#Name').value = data.data.customer.tenKH;
        document.querySelector('#Address').value = data.data.customer.diachi;
        document.querySelector('#Phone').value = data.data.customer.sdt;
        document.querySelector('#Email').value = data.data.customer.email;
        Pass = data.data.matkhau;
        console.log(Pass);
        outsideFetch(Pass);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
})();
function Update(id, password) {
    let Gender = "Nam";
    if (document.querySelector("#Female").checked) {
        Gender = "Nữ";
    }
    const staff = {
        maTk: document.querySelector("#ID").value,
        customer:
        {
            maKH: document.querySelector("#ID").value,
            tenKH: document.querySelector("#Name").value,
            gt: Gender,
            diachi: document.querySelector("#Address").value,
            sdt: document.querySelector("#Phone").value,
            email: document.querySelector("#Email").value,
        },
        employee: null,
        matkhau: password,
        phanQuyen:
        {
            maQuyen: "3",
            tenQuyen: "customer",
        },
        email: document.querySelector("#Email").value,
        sdt: document.querySelector("#Phone").value

    };
    //  console.log(staff);
    if (
        staff.customer.tenKH === "" ||
        staff.customer.diachi === "" ||
        staff.customer.sdt === "" ||
        staff.customer.email === "") {
        alert('Vui lòng nhập thông tin đầy đủ');
    }
    else {
        fetch(`http://localhost:8089/taikhoan/customer/update/${id}`, {
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
                    alert('Cập nhật thất bại');
                    throw new Error('Failed ');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}
function outsideFetch(passValue) {
    const UpdateButton = document.querySelector("#Update");
    UpdateButton.addEventListener("click", function () {

        Update(ID, passValue);
    });
}





