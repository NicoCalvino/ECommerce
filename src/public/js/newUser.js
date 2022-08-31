window.addEventListener("load", function(){
    let campoNombre = document.querySelector("#nombre")
    let camposErrores = document.querySelectorAll(".errorFront")

    camposErrores.forEach(elemento =>{
        elemento.style.display = "none"
    })

    campoNombre.focus()
})

let formulario = document.querySelector("#registro")
let campoNombre = document.querySelector("#nombre")
let campoApellido = document.querySelector("#apellido")
let campoEmail = document.querySelector("#mail")
let campoContrasena = document.querySelector("#contrasena")
let campoConfCont = document.querySelector("#confContrasena")

let camposErrores = document.querySelectorAll(".errorFront")

let camposObligatorios = [campoNombre, campoApellido, campoEmail, campoContrasena, campoConfCont]
let pruebaPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

camposObligatorios.forEach(campo =>{
    campo.addEventListener("change",function(){
        campo.classList.remove("campoConError")
    })
})

campoNombre.addEventListener("blur", function(){
    let errNom = document.querySelector(".errNom")
    if (campoNombre.value.length < 2){
        campoNombre.classList.add("campoConError")

        errNom.style.display = "block"
    }else{
        errNom.style.display = "none"
    }
})

campoApellido.addEventListener("blur", function(){
    let errApe = document.querySelector(".errApe")
    if (campoApellido.value.length < 2){
        campoApellido.classList.add("campoConError")

        errApe.style.display = "block"
    }else{
        errApe.style.display = "none"
    }
})

campoEmail.addEventListener("blur", function(){
    let errMail = document.querySelector(".errMail")
    if (campoEmail.value.indexOf("@") < 0){
        campoEmail.classList.add("campoConError")

        errMail.style.display = "block"
    }else{
        errMail.style.display = "none"
    }
})

campoContrasena.addEventListener("blur", function(){
    let errCont = document.querySelector(".errCont")
    if (!pruebaPassword.test(campoContrasena.value)){
        campoContrasena.classList.add("campoConError")

        errCont.style.display = "block"
    }else{
        errCont.style.display = "none"
    }
})

formulario.addEventListener("submit", function(e){
    let errores = 0
    if (campoNombre.value.length < 2){
        errores++
    }
    
    if (campoApellido.value.length < 2){
        errores++
    }
    
    if (campoEmail.value.indexOf("@") < 0){
        errores++
    }

    camposObligatorios.forEach(campo =>{
        if (campo.value == ""){
            campo.classList.add("campoConError")
            errores++
        }
    })

    if(!pruebaPassword.test(campoContrasena.value)){
        campoContrasena.classList.add("campoConError")   
        errores++
    }

    if (errores >0){
        e.preventDefault()
    }
})