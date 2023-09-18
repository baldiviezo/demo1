const usuario = document.getElementById('email');
const contraseña = document.getElementById('contraseña');

usuario.setAttribute('required', '');
contraseña.setAttribute('required', '');


//Añadimos un evento al fomulario de iniciar sesion
const form = document.querySelector('.form');
form.addEventListener('submit', ()=>{
	//Evitamos que se recargue la venta de iniciar sesion (Esto por q el boton esta dentro de un formulario)
	event.preventDefault();
	//Creamos un objeto formData para guardar todos los datos del formulario
	let objeto = {
        'usuario': usuario.value,
        'contraseña': contraseña.value
    }
    objeto = JSON.stringify(objeto); 
	//realizamos un envio de informacion asincrona con el metodo POST
	fetch('../login', {
		method: "POST",
		body: objeto
	//Si recivimos en text, es un json string
	//si recibimos con json, es un objeto json
	}).then(response => response.json()).then(data => {
		//_self nos ayuda a remplazar la ventana actual, por la ventana que queremos abrir
		if (data.id_usua == "No existe"){
			alert("Usuario o Contraseña incorrecto");
        }else{
			localStorage.setItem('id_usua', data.id_usua);
            window.open('./monitoreo.html',"_self");
        }
	//catch se ejecuta cunado la promesa no se verdadera
	}).catch(error => console.log("Ocurrio un error. Intente nuevamente mas tarde"));
});