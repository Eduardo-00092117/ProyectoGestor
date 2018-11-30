//formulario para actualizar
document.forms.frmUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        nombres: document.forms.frmUpdate.name.value,
        apellidos: document.forms.frmUpdate.last.value
    }
    //peticion
    fetch('/drive/'+document.forms.frmUpdate.id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea Actualizada con exito");
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});