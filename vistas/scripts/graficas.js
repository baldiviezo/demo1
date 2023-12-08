/**********************PANEL DE GRAFICA******************/
/*let date = new Date();
date.setHours(date.getHours());
let dia;
if (date.getUTCDate() < 10) {
    dia = `0${date.getUTCDate()}`;
} else {
    dia = date.getUTCDate();
}
let fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + dia;
let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
const inputDesde = document.getElementById('inputDesde');
inputDesde.value = fecha;
const inputHasta = document.getElementById('inputHasta');
inputHasta.value = fecha;*/

/****************************GRAFICAR***************** */
/*const chart = document.getElementById('chart');
const variable = document.getElementById('variable');




*/

/*const fechaa = new Date();
console.log(fecha)*/

/*let objeto = {
    'desde': inputDesde.value,
    'hasta': inputHasta.value,
    'tabla': variable.value
}
let variables_grafica = JSON.stringify(objeto);*/
/*
chart.innerHTML = '';
let canvas = document.createElement('canvas');
chart.appendChild(canvas);
fetch('../graficas', {
    method: "POST",
    body: variables_grafica
}).then(response => response.json()).then(data => {
    let ejey = [];
    let ejex = [];
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
                label: "Nivel",
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(51,51,255)',
                data: ejey,
                borderWidth: 1
            }]
        },
        options: {
            tension: 0.4,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            elements: {
                point: {
                    radius: 0 // default to disabled in all datasets
                }
            }
        },
    });
}).catch(err => console.log(err));
*/

//console.log(new Date('2019-01-01'))  //Mon Dec 31 2018 20:00:00 GMT-0400 (Bolivia Time)
//console.log(new Date('2019-01-01').valueOf())  //1546300800000

//--------------------------grafica
let datosNivel = [];
let arrayUndefined = [];

const data = {
    datasets: [{
        data: arrayUndefined,
        label: "Nivel",
        borderColor: 'rgba(0,161,209,1)',
        backgroundColor: 'rgba(0,161,209,1)',
        borderWidth: 1,

    }]
}
//hoverLine pluging block
const hoverLine = {
    id: 'hoverLine',
    //para q no se sobreponga dibujar la linea despues de mostra la informacion en un cuadro
    afterDatasetDraw(chart, args, plugins) {
        const { ctx, tooltip, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
        if (tooltip._active.length > 0) { //cuando el mause esta sobre un punto el array ya no esta vacio
            //console.log(args)
            const xCoor = args.meta.data[tooltip.dataPoints[0].dataIndex].x;
            const yCoor = args.meta.data[tooltip.dataPoints[0].dataIndex].y;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.moveTo(xCoor, top);
            ctx.lineTo(xCoor, bottom);
            ctx.stroke();
            
            //hoverline
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.moveTo(xCoor, yCoor);
            ctx.lineTo(right,yCoor);
            ctx.stroke();
            ctx.closePath();
            //texto
            //hovertext
            ctx.beginPath();
            ctx.fillStyle = 'black';
            //roundRect(x, y, width, height, radii)
            ctx.roundRect(right, yCoor-10, 30, 18, 0);
            ctx.fill();

            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = 'rgba(0,161,209,1)';
            ctx.textAlign = 'center';
            //context.fillText(text, x, y, maxWidth)
            ctx.fillText(y.getValueForPixel(yCoor), right+10, yCoor);

        }
    }
}
//Margen de la legenda
const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options) {
        const fitValue = chart.legend.fit;
        chart.legend.fit = function fit() {
            fitValue.bind(chart.legend)();
            return this.height += 20;
        }
    }
}
//labelTooltip
const labelTooltip = (tooltipItems) => {
    return '';
}

//Scala de chart
let min_x, max_x, min_y, max_y;
let const_min_x, const_max_x, const_min_y, const_max_y, const_left, const_right, const_top, const_bottom;
let i = 0;

//Cuadrantes
const quadrants = {
    id: 'quadrants',
    beforeDatasetDraw(chart, args, plugins) {
        const { ctx, chartArea: { left, right, top, bottom, width, height }, scales: { x, y } } = chart; //width = right - left, height = bottom - top
        //valores de cuadrante
        //console.log(x)
        min_x = x.min;
        max_x = x.max;
        min_y = y.min;
        max_y = y._valueRange;
        //console.log(x.min+' '+x._valueRange+' '+y.min+' '+ y._valueRange)
        if (i == 0) {
            i++;
            const_left = left;
            const_right = right;
            const_top = top;
            const_bottom = bottom;
            const_min_x = x.min;
            const_max_x = x.max;
        }
    }
}
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',  //year,day,hour,min
                    minUnit: '',
                }
            },
            y: {
                //beginAtZero: true
            }
        },
        layout: {
            padding: { //espacio entre la etiqueta  cambas y el grafico
                top: 10,
                right: 20,
                bottom: 0,
                left: 20
            }
        },
        animation: false,  //desabilita la animacion de subida
        elements: {
            point: {
                radius: 0 // ya no muestra los puntos
            }
        },
        interaction: {
            interaction: false,
        },
        plugins: {
            legend: {
                align: 'start' //La legenda empieza desde la izquierda
            },
            tooltip: {
                position: 'top', //que apresca arriba
                yAlign: 'buttom', // que la flecha se ponga abajo
                displayColors: false,
                callbacks: {
                    label: labelTooltip
                },
                backgroundColor: 'rgba(31,33,33,1)',
                titleColor: 'rgba(0, 161, 209, 1)',
                titleAlign: 'center',
                //borderColor: '#94969d',
                borderWidth: 5

            },
        },
        tooltip: {
        }
    },
    plugins: [quadrants, legendMargin, hoverLine],
}
var chart = document.getElementById('chart');
var myChart = new Chart(chart, config);

//Evento click
function clickHandler(click) {
    quadrantZoom(click.offsetX, click.offsetY)
}
myChart.canvas.onclick = clickHandler;

function quadrantZoom(puntoX, puntoY) {
    if (puntoX < const_left || puntoY < const_top || puntoX > const_right || puntoY > const_bottom) {
    } else {
        const { scales: { x, y } } = myChart.config.options;
        //left
        if (puntoX < ((const_right + const_left) / 2)) {
            x.max = (max_x - min_x) / 2 + min_x;
            if(x.max-min_x < 86400000){
                myChart.config.options.scales.x.time.unit = 'second';
             
            }
            //y.min = max_y / 2 + min_y;
            //right
        } else if (puntoX > ((const_right + const_left) / 2)) {
            if(x.max-min_x < 86400000){
                myChart.config.options.scales.x.time.unit = 'second';
                
            }
            x.min = (max_x - min_x) / 2 + min_x;
            //y.min = max_y / 2 + min_y;
        }
        myChart.update();
    }
}
function resetZoom() {
    const { scales: { x, y } } = myChart.config.options;
    x.min = const_min_x;
    x.max = const_max_x;
    myChart.config.options.scales.x.time.unit = 'day';
    myChart.update();
}
//position tooltip
Chart.Tooltip.positioners.top = function (elements, eventPosition) {
    const { chartArea: { top }, scales: { x, y } } = this.chart;
    return {
        x: x.getPixelForValue(x.getValueForPixel(eventPosition.x)),
        y: top
    }
}





fetch('../graficas', {
    method: "POST",
}).then(response => response.json()).then(data => {
    datosNivel = data;
    datosNivel.forEach(element => {
        arrayUndefined.push({x: new Date(`${element.fecha_nvl.slice(0, 10)}T${element.hora_nvl}`), y: element.valor_nvl})
    });
}).catch(err => console.log(err));


const showChart = document.getElementById('showChart');
showChart.addEventListener('click', () => {
    myChart.update();
});