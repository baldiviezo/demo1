const date = new Date();
const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const fecha = diaSemana[date.getDay()] + ', ' + date.getDate() + ' de ' + meses[date.getMonth()] + ' de ' + date.getFullYear();
document.querySelector('#date').innerText = fecha;

/*******************************************************Nivel**********************************************************/
const lineBar = document.querySelector('#lineBar');
const textBar = document.querySelector('#textBar');
/*text indicadores */
const textvalvula = document.querySelector('#textvalvula');
let varValvula = 'OFF';
const textBomba1 = document.querySelector('#textBomba1');
let varBomba1 = 'OFF';
const textBomba2 = document.querySelector('#textBomba2');
let varBomba2 = 'OFF';
/*led indicadores */
const ledvalvula = document.querySelector('#ledvalvula');
const ledBomba1 = document.querySelector('#ledBomba1');
const ledBomba2 = document.querySelector('#ledBomba2');
setInterval(() => {
    fetch('../../variables', {
        method: "POST"
    }).then(response => response.json()).then(data => {
        /*valvula */
        data.valvula_var == 1 ? varValvula = 'ON' : varValvula = 'OFF';
        data.valvula_var == 1 ? ledvalvula.style.background = 'rgb(94,209,173)' : ledvalvula.style.background = 'rgb222,56,88()';
        varValvula == 'ON' ? textvalvula.setAttribute('style', 'color: rgb(94,209,173)') : textvalvula.setAttribute('style', 'color: rgb(222,56,88)')

        textvalvula.innerHTML = varValvula;
        /*Bomba1 */
        data.bomba1_var == 1 ? varBomba1 = 'ON' : varBomba1 = 'OFF';
        data.bomba1_var == 1 ? ledBomba1.style.background = 'rgb(94,209,173)' : ledBomba1.style.background = 'rgb222,56,88()';
        varBomba1 == 'ON' ? textBomba1.setAttribute('style', 'color: rgb(94,209,173)') : textBomba1.setAttribute('style', 'color: rgb(222,56,88)')
        textBomba1.innerText = varBomba1;
        /*bomba 2 */
        data.bomba2_var == 1 ? varBomba2 = 'ON' : varBomba2 = 'OFF';
        data.bomba2_var == 1 ? ledBomba2.style.background = 'rgb(94,209,173)' : ledBomba2.style.background = 'rgb222,56,88()';
        varBomba2 == 'ON' ? textBomba2.setAttribute('style', 'color: rgb(94,209,173)') : textBomba2.setAttribute('style', 'color: rgb(222,56,88)')
        textBomba2.innerText = varBomba2;
        /*nivel */
        textBar.innerText = `${data['nivel_var']}%`;
        lineBar.style.height = `${data['nivel_var']}%`;
    }).catch(err => console.log(err));
}, 1000);

/*************************************************Ventana modal chart**************************************************/
//------Ventana modal chart
const chartNivelMW = document.querySelector('#chartNivelMW');
const pencilNivel = document.querySelector('.nivel__top img');
pencilNivel.addEventListener('click', chartNivel);
function chartNivel() {
    chartNivelMW.classList.add('modal__show');
    //myChart.update();
}
const closechartNivelMW = document.querySelector('#closechartNivelMW');
closechartNivelMW.addEventListener('click', () => {
    chartNivelMW.classList.remove('modal__show');
    /*const { scales: { x, y } } = myChart.config.options;
    x.min = 0;
    x.max = 0;
    myChart.config.options.scales.x.time.unit = 'day';
    myChart.update();*/
})
//------chart
let arrayUndefined = [];
let arrayCount = [];
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
            ctx.lineTo(right, yCoor);
            ctx.stroke();
            ctx.closePath();
            //texto
            //hovertext
            ctx.beginPath();
            ctx.fillStyle = 'black';
            //roundRect(x, y, width, height, radii)
            ctx.roundRect(right, yCoor - 10, 30, 18, 0);
            ctx.fill();

            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = 'rgba(0,161,209,1)';
            ctx.textAlign = 'center';
            //context.fillText(text, x, y, maxWidth)
            ctx.fillText(Math.round(y.getValueForPixel(yCoor)), right + 10, yCoor);

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
let i;
let c;
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
        max_y = y.max;
        //CADA VEZ QUE SE MUEVE EL MOUSE DENTRO DEL CANVAS ENTRA AQUI
        //console.log(x.min+' '+x._valueRange+' '+y.min+' '+ y._valueRange)
        if (i == 0) {
            i++;
            const_left = left;
            const_right = right;
            const_top = top;
            const_bottom = bottom;
            const_min_x = x.min;
            const_max_x = x.max;
            const_min_y = y.min;
            const_max_y = y.max;
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
                    unit: 'day'  //year,day,hour,min
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
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    }
                }
            }

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
            if (x.max - min_x < 86400000) {
                myChart.config.options.scales.x.time.unit = 'second';
            }
            arrayCount.push({ 'x_min': min_x, 'x_max': x.max, 'y_min': y.min, 'y.max': y.max });
        
            //right
        } else if (puntoX > ((const_right + const_left) / 2)) {
            x.min = (max_x - min_x) / 2 + min_x;
            if (x.max - min_x < 86400000) {
                myChart.config.options.scales.x.time.unit = 'second';
            }
            arrayCount.push({ 'x_min': x.min, 'x_max': max_x, 'y_min': y.min, 'y.max': y.max });
        
        }
        myChart.update();
    }
}
function resetZoom() {
    const { scales: { x, y } } = myChart.config.options;
    x.min = const_min_x;
    x.max = const_max_x;
    y.min = const_min_y;
    y.max = const_max_y;
    myChart.config.options.scales.x.time.unit = 'day';
    myChart.update();
    arrayCount = [];
    arrayCount.push({ 'x_min': x.min, 'x_max': x.max, 'y_min': y.min, 'y.max': y.max });
}
//position tooltip
Chart.Tooltip.positioners.top = function (elements, eventPosition) {
    const { chartArea: { top }, scales: { x, y } } = this.chart;
    return {
        x: x.getPixelForValue(x.getValueForPixel(eventPosition.x)),
        y: top
    }
}


fetch('../../graficas', {
    method: "POST",
}).then(response => response.json()).then(data => {
    datosNivel = data;
    datosNivel.forEach(element => {
        arrayUndefined.push({ x: new Date(`${element.fecha_nvl.slice(0, 10)}T${element.hora_nvl}`), y: element.valor_nvl })
    });

    //Tarda en graficar, No poner myChart.update() aqui
}).catch(err => console.log(err));

//------show chart
function showChart() {
    i = 0;
    c = 1;
    const { scales: { x, y } } = myChart.config.options;
    arrayCount = [];
    arrayCount.push({ 'x_min': x.min, 'x_max': x.max, 'y_min': y.min, 'y.max': y.max });
    myChart.update();
}
function backChart() {
    if (arrayCount.length - c > 0) {
        const { scales: { x, y } } = myChart.config.options;
        //left
        c++;
        if (x.max - x.min > 43200000) {
            myChart.config.options.scales.x.time.unit = 'day';
        }
        x.min = arrayCount[arrayCount.length - c].x_min;
        x.max = arrayCount[arrayCount.length - c].x_max;
        myChart.update();
        
    }
}