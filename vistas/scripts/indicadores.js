//------Nivel
const nivel_gradient = document.querySelector("#nivel_gradient");
const nivel_txt = document.querySelector("#nivel_txt");

//-----OPE
const ope = document.querySelector('#ope_dm');
const valvula = document.querySelector('#valvula_dm');
const bomba1 = document.querySelector('#bomba1_dm');
const bomba2 = document.querySelector('#bomba2_dm');
const falla1 = document.querySelector('#falla1_dm');
const falla2 = document.querySelector('#falla2_dm');
setInterval(()=>{
    fetch('../logo', {
        method: "POST"
    }).then(response => response.json()).then(data => {
        //-------Nivel
        nivel_txt.textContent = data.nivel_dm+'0%';
        let arc_length1 = nivel_gradient.getTotalLength();
        let step1 = arc_length1 / (10 - 0);
        let value1 = (data.nivel_dm - 0) * step1;
        nivel_gradient.style.strokeDasharray = `${value1} ${arc_length1 - value1}`;
        //--------OPE
        if (data.ope_dm == true){
            ope.children[0].classList.add('green');
            ope.children[1].children[1].textContent = 'Encendido';
        } else {
            ope.children[0].classList.remove('green');
            ope.children[1].children[1].textContent = 'Apagado';
        }
        //-------Valvula
        if (data.valvula_dm == true){
            valvula.children[0].classList.add('green');
            valvula.children[1].children[1].textContent = 'Habilitada';
        } else {
            valvula.children[0].classList.remove('green');
            valvula.children[1].children[1].textContent = 'Deshabilitado';
        }
        //-------Bomba 1
        if (data.bomba1_dm == true){
            bomba1.children[0].classList.add('green');
            bomba1.children[1].children[1].textContent = 'Encendido';
        } else {
            bomba1.children[0].classList.remove('green');
            bomba1.children[1].children[1].textContent = 'Apagado';
        } 
        //-------Bomba 2
        if (data.bomba2_dm == true){
            bomba2.children[0].classList.add('green');
            bomba2.children[1].children[1].textContent = 'Encendido';
        } else {
            bomba2.children[0].classList.remove('green');
            bomba2.children[1].children[1].textContent = 'Apagado';
        }
        //-------falla 1
        if (data.falla1_dm == true){
            falla1.children[0].classList.add('red');
            falla1.children[1].children[1].textContent = 'Falla!!';
        } else {
            falla1.children[0].classList.remove('red');
            falla1.children[1].children[1].textContent = '';
        }
        //-------falla 2
        if (data.falla2_dm == true){
            falla2.children[0].classList.add('red');
            falla2.children[1].children[1].textContent = 'Falla!!';
        } else {
            falla2.children[0].classList.remove('red');
            falla2.children[1].children[1].textContent = '';
        }
        //------falla1
        if (data.falla1_dm == true ){
            falla1MW.classList.add('modal__show');
            falla1MW.children[0].children[1].children[0].textContent = 'Falla de la bomba 1';
        }
        //------falla2
        if (data.falla2_dm == true ){
            falla1MW.classList.add('modal__show');
            falla1MW.children[0].children[1].children[0].textContent = 'Falla de la bomba 2';
        }



    }).catch(err => console.log(err));

}, 1000)

//<<------------------------ABRIR Y CERRAR VENTANAS MODALES--------------------------------->>
closefalla1MW.addEventListener('click',(e)=>{
    falla1MW.classList.remove('modal__show');
});