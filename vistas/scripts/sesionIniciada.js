
    let objeto = {
        'id_usua': localStorage.getItem('id_usua')
    }
    objeto = JSON.stringify(objeto);
    console.log(objeto)
	fetch('../sesionIniciada', {
        method: "POST",
        body: objeto
    }).then(response => response.text()).then(data => {
        console.log(data);
        if (data != 1){
            window.open('./login.html',"_self");
        }
    })
