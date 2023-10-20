/*-----------------------------------TABLA DE VARIABLES-------------------------------------*/
//------Cambiar valores
const progreso__tanque = document.querySelector('.progreso__tanque');
const texto__bomba1 = document.querySelector('.texto__bomba1');
const texto__bomba2 = document.querySelector('.texto__bomba2');
const texto__valvula = document.querySelector('.texto__valvula');
const ope = document.querySelector('.foco__ope');

setInterval(()=>{
    fetch('../variables', {
        method: "POST"
    }).then(response => response.json()).then(data => {
        //--------OPE
        if (data.ope_var == true){
            ope.classList.add('green');
        } else {
            ope.classList.remove('green');
        }
        //--------BOMBA1
       if (data.bomba1_var == true){
            texto__bomba1.innerHTML = 'ON';
            texto__bomba1.style.color = 'green';
        } else {
            texto__bomba1.innerHTML = 'OFF';
            texto__bomba1.style.color = 'red';
        }
        //--------BOMBA2
        if (data.bomba2_var == true){
            texto__bomba2.innerHTML = 'ON';
            texto__bomba2.style.color = 'green';
        } else {
            texto__bomba2.innerHTML = 'OFF';
            texto__bomba2.style.color = 'red';
        }
        //------falla1
        if (data.falla1_var == true ){
            falla1MW.classList.add('modal__show');
            falla1MW.children[0].children[1].children[0].textContent = 'Falla de la bomba 1';
        }
        //------falla2
        if (data.falla2_var == true ){
            falla1MW.classList.add('modal__show');
            falla1MW.children[0].children[1].children[0].textContent = 'Falla de la bomba 2';
        }
        //--------NIVEL
        porcentaje = data.nivel_var;
        progreso__tanque.style.height = `${porcentaje}%`;
        //--------NIVEL
        if (data.valvula_var == true){
            texto__valvula.innerHTML = 'ON';
            texto__valvula.style.color = 'green';
        } else {
            texto__valvula.innerHTML = 'OFF';
            texto__valvula.style.color = 'red';
        }
    }).catch(err => console.log(err));
}, 1000);
//------Modal de falla
const falla1MW = document.getElementById('falla1MW'); 
const closefalla1MW = document.getElementById('closefalla1MW');
//<<------------------------ABRIR Y CERRAR VENTANAS MODALES--------------------------------->>
closefalla1MW.addEventListener('click',(e)=>{
    falla1MW.classList.remove('modal__show');
});