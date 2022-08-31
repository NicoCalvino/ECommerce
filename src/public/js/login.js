window.addEventListener("load", function(){
    let campoEmail = document.querySelector("#email")

    campoEmail.focus()
})
let formulario = document.querySelector("#login")
let campoEmail = document.querySelector("#email")
let campoContrasena = document.querySelector("#contrasena")

let camposObligatorios = [campoEmail, campoContrasena]

camposObligatorios.forEach(campo =>{
    campo.addEventListener("change",function(){
        campo.classList.remove("campoConError")
    })
})
campoEmail.addEventListener("blur", function(){
    if (campoEmail.value.indexOf("@") < 0){
        campoEmail.classList.add("campoConError")
    }
})

formulario.addEventListener("submit", function(e){
    let errores = 0
    camposObligatorios.forEach(campo =>{
        if (campo.value == ""){
            campo.classList.add("campoConError")
            errores++
        }
    })

    if (campoEmail.value.indexOf("@") < 0){
        campoEmail.classList.add("campoConError")
        errores++
    }

    if (errores >0){
        e.preventDefault()
    }
})