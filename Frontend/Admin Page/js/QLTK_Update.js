function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
}

const User = getUserInfo();
// console.log(User);

document.querySelector('#username').value = User.data.maTk;

if (User.data.customer === null) {
    document.querySelector('#nameUser').value = User.data.employee.tenNV;
    if (User.data.employee.gt === "Nam") document.getElementById("Male").setAttribute("checked", "checked");
    else document.getElementById("Female").setAttribute("checked", "checked");
    document.querySelector('#Address').value = User.data.employee.diachi;

}
else {
    document.querySelector('#nameUser').value = User.data.customer.tenKH;
    if (User.data.customer.gt === "Nam") document.getElementById("Male").setAttribute("checked", "checked");
    else document.getElementById("Female").setAttribute("checked", "checked");
    document.querySelector('#Address').value = User.data.customer.diachi;
}
document.querySelector('#Email').value = User.data.email;
document.querySelector('#Phone').value = User.data.sdt;
// document.getElementById("BirthDay").value = User.data.;

if ((User.data.phanQuyen.tenQuyen === 'employee') || (User.data.phanQuyen.tenQuyen === 'admin')) {

    console.log(User.data.employee.ns);
    const date = new Date(User.data.employee.ns);
    const dateString = date.toISOString().slice(0, 16);
    document.querySelector('#BirthDay').value = dateString;
}

else {
    const ns = document.querySelector('#ns');
    ns.style.display = 'none';
}

let Gender = "Nam";
if (document.querySelector("#Female").checked) {
    Gender = "Nữ";
}
function Update() {
    if (User.data.phanQuyen.tenQuyen === 'employee') {
        const url = `http://localhost:8089/taikhoan/employee/update/${User.data.maTk}`;
        const data = {
            maTk: document.querySelector('#username').value,
            customer: null,
            employee:
            {
                maNV: document.querySelector('#username').value,
                tenNV: document.querySelector('#nameUser').value,
                gt: Gender,
                ns: document.querySelector('#BirthDay').value,
                diachi: document.querySelector('#Address').value,
                sdt: document.querySelector('#Phone').value,
                email: document.querySelector('#Email').value,
                luong: User.data.employee.luong,
            },
            matkhau: User.data.matkhau,
            phanQuyen:
            {
                maQuyen: "2",
                tenQuyen: "employee"
            },
            email: document.querySelector('#Email').value,
            sdt: document.querySelector('#Phone').value,
        };
        if (data.maTk === "" || data.employee.tenNV === "" || data.employee.ns === null || data.employee.diachi === ""
            || data.employee.email === "" || data.employee.luong === "" || data.employee.sdt === "") {
            alert("Không được để trống thông tin");
        }
        else {
            const headers = {
                'Content-Type': 'application/json',
            };
            fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === "ok") alert('Cập nhật thành công');
                })
                .catch(error => {
                    alert('Cập nhật thất bại');
                });
        }

    }
    else {
        const url = `http://localhost:8089/taikhoan/customer/update/${User.data.maTk}`;
        const data = {
            maTk: document.querySelector('#username').value,
            customer:
            {
                maKH: document.querySelector('#username').value,
                tenKH: document.querySelector('#nameUser').value,
                gt: Gender,
                diachi: document.querySelector('#Address').value,
                sdt: document.querySelector('#Phone').value,
                email: document.querySelector('#Email').value,
            },
            employee: null,

            matkhau: User.data.matkhau,
            phanQuyen:
            {
                maQuyen: "3",
                tenQuyen: "customer"
            },
            email: document.querySelector('#Email').value,
            sdt: document.querySelector('#Phone').value,
        };
        if (data.maTk === "" || data.customer.tenKH === "" || data.customer.diachi === ""
            || data.customer.email === "" || data.customer.sdt === "") {
            alert("Không được để trống thông tin");
        }
        else {
            const headers = {
                'Content-Type': 'application/json',
            };
            fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status === "ok") alert('Cập nhật thành công');
                })
                .catch(error => {
                    alert('Cập nhật thất bại');
                });
        }
    }
}

document.querySelector('#Update').addEventListener('click', function () {
    Update();
})