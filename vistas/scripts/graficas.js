/********************************************* */
let ejey = [];
let ejex = [];
const chart = document.getElementById('chart');
const variable = document.getElementById('variable');
const showChart = document.getElementById('showChart');
showChart.addEventListener('click',()=>{
  chart.innerHTML = '';
  let canvas= document.createElement('canvas');
  chart.appendChild(canvas);
  fetch('../graficas', {
    method: "POST",
    body: JSON.stringify(variable.value)
  }).then(response => response.json()).then(data => {
    data.forEach((valor) => {
      ejey.push(valor[`${variable.value}`]);
      ejex.push(valor.hora_tmp);
    });
    const myChart = chart.children[0];
    new Chart(myChart, {
      type: 'line',
      data: {
        labels: ejex,
        datasets: [{
          backgroundColor: 'rgba(54,162,235,0.2)',
          borderColor: 'blue',
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
const inputDesde = document.getElementById('inputDesde');
const inputHasta = document.getElementById('inputHasta');
inputDesde.addEventListener('change', prueba);
inputHasta.addEventListener('change', prueba);
function prueba() {
  console.log(inputDesde.value);
  console.log(inputHasta.value);
}