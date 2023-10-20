/********************************************* */

const chart = document.getElementById('chart');
const variable = document.getElementById('variable');
const showChart = document.getElementById('showChart');
showChart.addEventListener('click',()=>{
  chart.innerHTML = '';
  let canvas= document.createElement('canvas');
  chart.appendChild(canvas);
  fetch('../graficas', {
    method: "POST",
    body: variable.value
  }).then(response => response.json()).then(data => {
    let ejey = [];
    let ejex = [];
    console.log(data)
    data.forEach((valor) => {
      ejey.push(valor.valor_nvl);
      ejex.push(valor.hora_nvl);
    });
    const myChart = chart.children[0];
    new Chart(myChart, {
      type: 'line',
      data: {
        labels: ejex,
        datasets: [{
          backgroundColor: 'rgba(54,162,235,0.2)',
          borderColor: 'rgba(51,51,255)',
          data: ejey,
          borderWidth: 1
        }]
      },
      options: {
        animation: {
        onComplete: ()=>{
          delayed: false;
        }
        },
        tension: 0.4, 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }).catch(err => console.log(err));
});
/****************************************/
<<<<<<< HEAD
let date = new Date();
date.setHours(date.getHours());
let fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate();
let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
const inputDesde = document.getElementById('inputDesde');
inputDesde.value = fecha;
const inputHasta = document.getElementById('inputHasta');
inputHasta.value = fecha;
=======
const inputDesde = document.getElementById('inputDesde');
const inputHasta = document.getElementById('inputHasta');
>>>>>>> 81b1347b81377cfdf445617ebd4aea9605192c50
inputDesde.addEventListener('change', prueba);
inputHasta.addEventListener('change', prueba);
function prueba() {
  console.log(inputDesde.value);
  console.log(inputHasta.value);
}