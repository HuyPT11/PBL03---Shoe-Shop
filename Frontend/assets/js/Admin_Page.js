
function getUserInfo() {
    const token = localStorage.getItem("MyJSON");
    const obj = JSON.parse(token);
    //if (!token) return null;
    return obj;
}

const User2 = getUserInfo();
//console.log(User2);

if (User2 !== null) {
    if (User2.data.phanQuyen.maQuyen === '3') {

        const dashboard = document.getElementById('Dashboard');
        dashboard.style.display = 'none';

        const QLSP = document.getElementById('QLSP');
        QLSP.style.display = 'none';

        const QLKH = document.getElementById('QLKH');
        QLKH.style.display = 'none';

        const QLNV = document.getElementById('QLNV');
        QLNV.style.display = 'none';

        const QLKho = document.getElementById('QLKho');
        QLKho.style.display = 'none';

        const QLNCC = document.getElementById('QLNCC');
        QLNCC.style.display = 'none';




    }
    else if (User2.data.phanQuyen.maQuyen === '2') {
        const dashboard = document.getElementById('Dashboard');
        dashboard.style.display = 'none';
        const QLNV = document.getElementById('QLNV');
        QLNV.style.display = 'none';
    }
}