const bomba1 = document.getElementById('bomba1');
const bomba2 = document.getElementById('bomba2');
const nivel = document.getElementById('nivel');
let arrayBomba1 = [];
let arrayBomba2 = [];
let arraynivel = [];
let hora = [];
setTimeout(()=>{
  bomba1.innerHTML = '';
  bomba2.innerHTML = '';
  nivel.innerHTML = '';
  let canvasBomba1 = document.createElement('canvas');
  let canvasBomba2 = document.createElement('canvas');
  let canvasNivel = document.createElement('canvas');
  bomba1.appendChild(canvasBomba1);
  bomba2.appendChild(canvasBomba2);
  nivel.appendChild(canvasNivel);
  fetch('../graficas', {
      method: "POST"
  }).then(response => response.json()).then(data => {
    arrayBomba1 = [];
    arrayBomba2 = [];
    arraynivel = [];
    hora = [];
    data.forEach((valor) => {
      hora.push(valor.hora_tmp);
      arraynivel.push(valor.nivel_dm);
      if(valor.bomba1_dm == 1){
        arrayBomba1.push('ON');
      }else{
        arrayBomba1.push('OFF');
      }
      if(valor.bomba2_dm == 1){
        arrayBomba2.push('ON');
      }else{
        arrayBomba2.push('OFF');
      }
    });
    //------Bomba 1
    const chartBomba1 = bomba1.children[0];
    new Chart(chartBomba1, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'ON / OFF',  //Nombre de la variable y 
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'red',
      borderWidth: 2,   //grosor de los bordes
      stepped: 'befor',   //los balores puede ser strings (befor = true, after)
      data: arrayBomba1
    }]
  },
  options: {
    animation: {
      onComplete: ()=>{
        delayed: false;
      }
    },
    scales: {
      y: {
        type: 'category',
        labels: ['ON', 'OFF'],
        beginAtZero: true   //Emepar desde cero o desde el numero mas bajo
      }
    }
  }
});
//bomba2
const chartBomba2 = bomba2.children[0];
new Chart(chartBomba2, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'ON / OFF',
      backgroundColor: 'rgba(54,162,235,0.2)',
      borderColor: 'blue',
      stepped: 'befor', 
      data: arrayBomba2,
      borderWidth: 1
    }]
  },
  options: {
    animation: {
      onComplete: ()=>{
        delayed: true;
      },
      delay: ()=>{
        let delay = 0;
        return delay;
      }
    },
    scales: {
      y: {
        type: 'category',
        labels: ['ON', 'OFF'],
        
        beginAtZero: true   //Emepar desde cero o desde el numero mas bajo
    }
    }
  }
});

//------Nivel
const chartNivel = nivel.children[0];
new Chart(chartNivel, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'Nivel',
      backgroundColor: 'rgba(255,206,86,0.2)',
      borderColor: 'orange',
      data: arraynivel,
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

  
}, 100)







setInterval(()=>{
  bomba1.innerHTML = '';
  bomba2.innerHTML = '';
  nivel.innerHTML = '';
  let canvasBomba1 = document.createElement('canvas');
  let canvasBomba2 = document.createElement('canvas');
  let canvasNivel = document.createElement('canvas');
  bomba1.appendChild(canvasBomba1);
  bomba2.appendChild(canvasBomba2);
  nivel.appendChild(canvasNivel);
  fetch('../graficas', {
      method: "POST"
  }).then(response => response.json()).then(data => {
    arrayBomba1 = [];
    arrayBomba2 = [];
    arraynivel = [];
    hora = [];
    data.forEach((valor) => {
      hora.push(valor.hora_tmp);
      arraynivel.push(valor.nivel_dm);
      if(valor.bomba1_dm == 1){
        arrayBomba1.push('ON');
      }else{
        arrayBomba1.push('OFF');
      }
      if(valor.bomba2_dm == 1){
        arrayBomba2.push('ON');
      }else{
        arrayBomba2.push('OFF');
      }
    });
    //------Bomba 1
    const chartBomba1 = bomba1.children[0];
    new Chart(chartBomba1, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'ON / OFF',  //Nombre de la variable y 
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'red',
      borderWidth: 2,   //grosor de los bordes
      stepped: 'befor',   //los balores puede ser strings (befor = true, after)
      data: arrayBomba1
    }]
  },
  options: {
    animation: {
      onComplete: ()=>{
        delayed: false;
      }
    },
    scales: {
      y: {
        type: 'category',
        labels: ['ON', 'OFF'],
        beginAtZero: true   //Emepar desde cero o desde el numero mas bajo
      }
    }
  }
});
//bomba2
const chartBomba2 = bomba2.children[0];
new Chart(chartBomba2, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'ON / OFF',
      backgroundColor: 'rgba(54,162,235,0.2)',
      borderColor: 'blue',
      stepped: 'befor', 
      data: arrayBomba2,
      borderWidth: 1
    }]
  },
  options: {
    animation: {
      onComplete: ()=>{
        delayed: true;
      },
      delay: ()=>{
        let delay = 0;
        return delay;
      }
    },
    scales: {
      y: {
        type: 'category',
        labels: ['ON', 'OFF'],
        
        beginAtZero: true   //Emepar desde cero o desde el numero mas bajo
    }
    }
  }
});

//------Nivel
const chartNivel = nivel.children[0];
new Chart(chartNivel, {
  type: 'line',
  data: {
    labels: hora,
    datasets: [{
      label: 'Nivel',
      backgroundColor: 'rgba(255,206,86,0.2)',
      borderColor: 'orange',
      data: arraynivel,
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

  
}, 10000)





