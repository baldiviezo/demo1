const sideBar = document.querySelector('.sidebar');
sideBar.innerHTML = `
<a href="#" class="logo">
    <img src="../imagenes/icono.svg">
    <div class="logo-name"><span>SMS </span>IC</div>
</a>
<ul class="side-menu">
    <li class="monitoreo"><a href="./monitoreo.html"><img src="../imagenes/dashboard.svg">Monitoreo</a></li>
    <li class="indicadores"><a href="./indicadores.html"><img src="../imagenes/gauge.svg">Indicadores</a></li>
    <li class="graficas"><a href="./graficas.html"><img src="../imagenes/chart.svg">Graficas</a></li>
    <li class="historicos"><a href="./historicos.html"><img src="../imagenes/file.svg">Historicos</a></li>
    <li class="usuarios"><a href="./usuarios.html"><img src="../imagenes/user.svg"></i>Usuarios</a></li>
</ul>
<ul class="side-menu">
    <li><a href="./login.html"><img src="../imagenes/logout.svg">Salir</a></li>
</ul>           
`;
const header = document.querySelector('header');
header.innerHTML = `
<nav>
    <img src="../imagenes/menu.svg" id="menu">
    <div>
    </div>
</nav>
`;
const menuBar = document.querySelector('#menu');
const menuBarClose = document.querySelector('#menuClose');
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});
let vista = document.querySelector('header').id;
const li = document.querySelector(`li.${vista}`);
li.classList.add('active');
