let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

function returnQLDH(){
    location.replace("QLDH.html");
}
function returnQLKH_Add(){
    location.replace("QLKH_Add.html");
}
function returnQLNV_Add(){
    location.replace("QLNV_Add.html");
}
function returnQLSP_Add(){
    location.replace("QLSP_Add.html");
}
function returnQLTK_Show(){
    location.replace("QLTK_Show.html");
}
function returnQLTK_Update(){
    location.replace("QLTK_Update.html");
}
function returnQLTK_ChangePass(){
    location.replace("QLTK_ChangePass.html");
}
function returnQLKho_Add(){
    location.replace("QLKho_Add.html");
}
function returnQLNCC_Add(){
    location.replace("QLNCC_Add.html");
}
function returnQLSP_AddDetail(){
    location.replace("QLSP_AddDetail.html");
}



