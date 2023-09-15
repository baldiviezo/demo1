/*const historico = document.querySelector('#historico');
historico.addEventListener('click', generarReporte);
function generarReporte() {
    fetch('../historicos', {
        method: "POST"
    }).then(response => response.json()).then(data => {
      downloadAsExcel(data);
    })
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function downloadAsExcel(data){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data' : worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    console.log(excelBuffer);
    saveAsExcel(excelBuffer, 'data_template');
}

function saveAsExcel(buffer, filename){
    const data = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, filename+EXCEL_EXTENSION);
}*/


let logo = {};
let filterLogo = [];
readLogo();
function readLogo() {
    let formData = new FormData();
    formData.append('readLogo','');
    fetch('../historicos', {
        method: "POST",
        body: formData
    }).then(response => response.json()).then(data => {
        logo = data;
        filterLogo = data;
        paginacionCustomer(Object.values(data).length, 1);
    }).catch(err => console.log(err));
}
//------Select utilizado para buscar por columnas
const selectSearchClte = document.getElementById('selectSearchClte');
selectSearchClte.addEventListener('change', searchLogo);
//------buscar por input
const inputSerchClte = document.getElementById("inputSerchClte");
inputSerchClte.addEventListener("keyup", searchLogo);
//------Clientes por pagina
const selectNumberClte = document.getElementById('selectNumberClte');
selectNumberClte.selectedIndex = 1;
selectNumberClte.addEventListener('change', function(){
    paginacionCustomer(Object.values(filterLogo).length, 1);
});
//------buscar por:
function searchLogo(e){
    if(e.keyCode===13){
        filterLogo = [];
        i=0;
        for(let customer in logo){
            for(let valor in logo[customer] ){
                if(valor == selectSearchClte.value){
                    if(String(logo[customer][valor]).toLowerCase().indexOf(inputSerchClte.value.toLowerCase())>=0){
                        filterLogo[i] = logo[customer];
                        i++;
                        break;
                    }  
                }  
            }
            
        }
        
        paginacionCustomer(Object.values(filterLogo).length, 1);
    }
}
//------Ordenar tabla descendente ascendente
let orderLogo = document.querySelectorAll('.tbody__head--customer');
orderLogo.forEach(div=>{
    div.children[0].addEventListener('click', function() {
        let array = Object.entries(filterLogo).sort((a,b)=>{
            let first = a[1][div.children[0].name].toLowerCase();
            let second = b[1][div.children[0].name].toLowerCase();
            if( first < second){return -1}
            if(first > second){return 1}
            return 0;
        })
        filterLogo = Object.fromEntries(array);
        paginacionCustomer(Object.values(filterLogo).length, 1);
    });
    div.children[1].addEventListener('click', function() {
        let array = Object.entries(filterLogo).sort((a,b)=>{
            let first = a[1][div.children[0].name].toLowerCase();
            let second = b[1][div.children[0].name].toLowerCase();
            if( first > second){return -1}
            if(first < second){return 1}
            return 0;
        })
        filterLogo = Object.fromEntries(array);
        paginacionCustomer(Object.values(filterLogo).length, 1);
    });
})
//------PaginacionCustomer
function paginacionCustomer(allCustomers, page){
    let numberCustomers = Number(selectNumberClte.value);
    let allPages = Math.ceil(allCustomers/numberCustomers);
    let ul = document.querySelector('#wrapperCustomer ul');
    let li = '';
    let beforePages = page-1;
    let afterPages = page +1;
    let liActive;
    if(page > 1){
        li+= `<li class="btn" onclick="paginacionCustomer(${allCustomers}, ${page-1})"><img src="../imagenes/arowLeft.svg"></li>`;
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
        li+= `<li class="numb ${liActive}" onclick="paginacionCustomer(${allCustomers}, ${pageLength})"><span>${pageLength}</span></li>`;
    }
    if(page < allPages){
        li += `<li class="btn" onclick="paginacionCustomer(${allCustomers}, ${page+1})"><img src="../imagenes/arowRight.svg"></li>`;
    }
    ul.innerHTML = li;
    let h2= document.querySelector('#showPageCustomer h2');
    h2.innerHTML =`Pagina ${page}/${allPages}, ${allCustomers} items`;
    tableCustomers(page);
}
//------Crear la tabla
function tableCustomers(page) {
    let tbody = document.getElementById('tbodyCustomer');
    inicio = (page-1)*Number(selectNumberClte.value); 
    final = inicio + Number(selectNumberClte.value);
    i=1;
    tbody.innerHTML = '';
    for(let customer in filterLogo){
       if( i > inicio && i <= final){
        let tr = document.createElement('tr');
        for(let valor in filterLogo[customer]){
            let td = document.createElement('td');
            if(valor == 'id_dm'){
                td.innerText = filterLogo[customer][valor];
                td.setAttribute('hidden', '');
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = i;
                tr.appendChild(td);
                i++;
            }else{
                td.innerText = filterLogo[customer][valor];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
        }else{
            i++;    
        }
    }   
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function downloadAsExcel(data){
    console.log(data)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data' : worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    saveAsExcel(excelBuffer, 'data_template');
}

function saveAsExcel(buffer, filename){
    const data = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, filename+EXCEL_EXTENSION);
}

const excelHistorico = document.querySelector('#excelHistorico');
excelHistorico.addEventListener('click', ()=>{
    downloadAsExcel(filterLogo)
})
