function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
}

const User = getUserInfo();
console.log(User);

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
document.querySelector('#ACtype').value = User.data.phanQuyen.tenQuyen;
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


