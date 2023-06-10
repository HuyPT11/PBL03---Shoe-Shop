
(() => {
    const lgout = document.querySelector('#dangxuat');
    console.log(lgout);
    lgout.addEventListener('click', () => {
        localStorage.removeItem("MyJSON");
        //console.log(1);
        window.location = '/trangchu.html';
    })
})()
