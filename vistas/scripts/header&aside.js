/********************************************CONTRUCCION DE HEADER AND SIDEBAR*********************************************/
const sideBar = document.querySelector('.sidebar');
if(localStorage.getItem('usua_rol') == 'Administrador'){
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
        <li><a href="./cerrar.html"><img src="../imagenes/logout.svg">Salir</a></li>
    </ul>           
    `;
}else{
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
    </ul>
    <ul class="side-menu">
        <li><a href="./cerrar.html"><img src="../imagenes/logout.svg">Salir</a></li>
    </ul>           
    `;
}
const header = document.querySelector('header');
header.innerHTML = `
<nav>
    <img src="../imagenes/menu.svg" id="menu">
    <div>
        <a href="#" class="notif">
            <img src="../imagenes/bell.svg" id="seguimiento">
            <span class="count">0</span>
        </a>
    </div>
</nav>
`;
/********************************************************************************************************************/
const menuBar = document.querySelector('#menu');
const menuBarClose = document.querySelector('#menuClose');
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});
let vista = document.querySelector('header').id;
const li = document.querySelector(`li.${vista}`);
li.classList.add('active');


/************************************************TABLA DE SEGUIMIENTO********************************************/
const productSMW = document.getElementById('productSMW');
let seguimiento = document.getElementById('seguimiento');
seguimiento.addEventListener('click', tablaSeguimiento);

function tablaSeguimiento(){
    productSMW.classList.add('modal__show');
    readProductsMW();
    /*****************************REINICIAR COUNT*****************************/
    fetch('../rebootCount', {
        method: "POST",
        body: JSON.stringify({'id_usua': localStorage.getItem('id_usua')})
    }).then(response => response.json()).then().catch(err => console.log(err));
}
const closeProductSMW = document.getElementById('closeProductSMW');
closeProductSMW.addEventListener('click',()=>{
    productSMW.classList.remove('modal__show');
});
/***********************************************SOLICITAR CONTADOR*****************************************************/
const count = document.querySelector('.count');
setInterval(()=>{
    fetch('../count', {
        method: "POST",
        body: JSON.stringify({'id_usua': localStorage.getItem('id_usua')})
    }).then(response => response.text()).then(data=>{
        count.innerHTML = data;
        /*if (data > 0 ){
            readProductsMW();
        }*/
    }).catch(err => console.log(err));
},1000)

//------------------------------------------------TABLA MODAL PRODUCTS--------------------------------------------------
let productsMW = {};
let filterProductsMW = [];
function readProductsMW() {
    fetch('../avisos', {
        method: "POST"
    }).then(response => response.json()).then(data => {
        productsMW = data;
        filterProductsMW = data;
        paginacionProductMW(Object.values(filterProductsMW).length, 1);
    }).catch(err => console.log(err));
}
//------Select utilizado para buscar por columnas
const selectSearchProdMW = document.getElementById('selectSearchProdMW');
selectSearchProdMW.addEventListener('change', searchProductsMW);
//------buscar por input
const inputSearchProdMW = document.getElementById("inputSearchProdMW");
inputSearchProdMW.addEventListener("keyup", searchProductsMW);
//------Clientes por pagina
const selectNumberProdMW = document.getElementById('selectNumberProdMW');
selectNumberProdMW.selectedIndex = 1;
selectNumberProdMW.addEventListener('change', function(){
    paginacionProductMW(Object.values(filterProductsMW).length, 1);
});

//------buscar por:
function searchProductsMW(){
    filterProductsMW = [];
    for(let product in productsMW){
        for(let valor in productsMW[product]){
            if(selectSearchProdMW.value == 'todas'){
                if(valor == 'nombre_avi' ||  valor == 'mensaje_avi' || valor == 'categoria_avi' || valor == 'fecha_avi' || valor == 'hora_avi'){
                    if(productsMW[product][valor].toLowerCase().indexOf(inputSearchProdMW.value.toLowerCase())>=0){
                        filterProductsMW[product] = productsMW[product];
                        break;
                    }
                }
            }else{
                if(valor == selectSearchProdMW.value){
                    if(productsMW[product][valor].toLowerCase().indexOf(inputSearchProdMW.value.toLowerCase())>=0){
                        filterProductsMW[product] = productsMW[product];
                        break;
                    }
                }
            }
        }
    }
    paginacionProductMW(Object.values(filterProductsMW).length, 1);
}
//------PaginacionProductMW
function paginacionProductMW(allProducts, page){
    let numberProducts = Number(selectNumberProdMW.value);
    let allPages = Math.ceil(allProducts/numberProducts);
    let ul = document.querySelector('#wrapperProductMW ul');
    let li = '';
    let beforePages = page-1;
    let afterPages = page +1;
    let liActive;
    if(page > 1){
        li+= `<li class="btn" onclick="paginacionProductMW(${allProducts}, ${page-1})"><img src="../imagenes/arowLeft.svg"></li>`;
    }
    for(let pageLength = beforePages; pageLength <= afterPages; pageLength++){
        if(pageLength > allPages){
            continue;
        }
        if(pageLength == 0){
            pageLength = pageLength +1;
        }
        if(page == pageLength){
            liActive = 'active';
        }else{
            liActive = '';
        }
        li+= `<li class="numb ${liActive}" onclick="paginacionProductMW(${allProducts}, ${pageLength})"><span>${pageLength}</span></li>`;
    }
    if(page < allPages){
        li += `<li class="btn" onclick="paginacionProductMW(${allProducts}, ${page+1})"><img src="../imagenes/arowRight.svg"></li>`;
    }
    ul.innerHTML = li;
    let h2= document.querySelector('#showPageProductMW h2');
    h2.innerHTML =`Pagina ${page}/${allPages}, ${allProducts} avisos`;
    tableProductsMW(page);
}
//------Crear la tabla
function tableProductsMW(page) {
    let tbody = document.getElementById('tbodyProductMW');
    inicio = (page-1)*Number(selectNumberProdMW.value); 
    final = inicio + Number(selectNumberProdMW.value);
    i=1;
    tbody.innerHTML = '';
    for(let product in filterProductsMW){
       if( i > inicio && i <= final){
        let tr = document.createElement('tr');
        for(let valor in filterProductsMW[product]){
            let td = document.createElement('td');
            if(valor == 'id_avi'){
                td.innerText = filterProductsMW[product][valor];
                td.setAttribute('hidden', '');
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = i;
                tr.appendChild(td);
                i++;
            }else if(valor == 'categoria_avi'){
                if(filterProductsMW[product][valor] == 'Evento' ){
                    tr.setAttribute('style', 'background: #00e81b44');
                }else if(filterProductsMW[product][valor] == 'Advertencia' ){
                    tr.setAttribute('style', 'background: #f3ff57');
                }else if (filterProductsMW[product][valor] == 'Error' ){
                    tr.setAttribute('style', 'background: #f008');
                }       
                td.innerText = filterProductsMW[product][valor];
                tr.appendChild(td);
            }else if(valor == 'fecha_avi'){
                td.innerText = filterProductsMW[product][valor].slice(0,10);
                tr.appendChild(td);
            }else{
                td.innerText = filterProductsMW[product][valor];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
        }else{
            i++;    
        }
    }   
}
/*********************************************************************************************************************/

