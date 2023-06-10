// Button Add
$(".hover").mouseleave(function () {
    $(this).removeClass("hover");
});
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

function AddCustomer() {
    let Gender = "Nam";

    if (document.querySelector("#Female").checked) {
        Gender = "Nữ";
    }

    const maTk = document.querySelector("#Username").value;
    const tenKH = document.querySelector("#Name").value;
    const diachi = document.querySelector("#Address").value;
    const sdt = document.querySelector("#Phone").value;
    const email = document.querySelector("#Email").value;
    const matkhau = document.querySelector("#Password").value;


    if (
        maTk === "" ||
        tenKH === "" ||
        diachi === "" ||
        sdt === "" ||
        email === "" ||
        matkhau === ""
    ) {
        alert("Vui lòng nhập thông tin đầy đủ");
        return;
    }

    if (maTk.length > 10) {
        alert("Tên đăng nhập phải có độ dài nhỏ hơn 10");
        return;
    }
    if (fr[maTk] === 1) {
        alert('Tên đăng nhập đã tồn tại');
        return;
    }
    const customer = {
        maKH: maTk,
        tenKH: tenKH,
        gt: Gender,
        diachi: diachi,
        sdt: sdt,
        email: email,
    };

    const staff = {
        maTk: maTk,
        customer: customer,
        employee: null,
        matkhau: matkhau,
        phanQuyen: {
            maQuyen: "3",
            tenQuyen: "customer",
        },
        email: email,
        sdt: sdt,
    };

    console.log(staff);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
    };

    fetch("http://localhost:8089/taikhoan/addcustomer", options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                alert("Thêm thành công");
            }
        })
        .catch((error) => console.error(error));
}

const AddButton = document.querySelector("#Add_Bt");
AddButton.addEventListener("click", function () {
    AddCustomer();
});
