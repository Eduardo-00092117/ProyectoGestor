//formulario para actualizar
document.forms.frmUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        nombres: document.forms.formUpdate.userU.value,
        apellidos: document.forms.formUpdate.rolU.value,
        correo: document.forms.formUpdate.rolU.value
    }
    //peticion
    fetch('/users/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea Actualizada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});