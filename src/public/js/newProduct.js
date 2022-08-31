let campoNombre = document.querySelector("#nombreProducto")
let campoDesc = document.querySelector("#caracteristicas")
let camposErrores = document.querySelectorAll(".errorFront")

window.addEventListener("load", function(){
    camposErrores.forEach(elemento =>{
        elemento.style.display = "none"
    })
    
    campoNombre.focus()
})

let camposObligatorios = document.querySelectorAll(".campo-informacion")

camposObligatorios.forEach(campo =>{
    campo.addEventListener("change", function(){
        campo.classList.remove("campoConError")
    })
})

campoNombre.addEventListener("blur", function(){
    let errNom = document.querySelector(".errNom")
    if (campoNombre.value.length < 5){
        campoNombre.classList.add("campoConError")

        errNom.style.display = "block"
    }else{
        errNom.style.display = "none"
    }
})

campoDesc.addEventListener("blur", function(){
    let errCar = document.querySelector(".errCar")
    if (campoDesc.value.length < 20){
        campoDesc.classList.add("campoConError")

        errCar.style.display = "block"
    }else{
        errCar.style.display = "none"
    }
})

let formulario = document.querySelector("#infoProducto")

formulario.addEventListener("submit",function(e){

    let errores = 0
    camposObligatorios.forEach(campo =>{
        if (campo.value == ""){
            campo.classList.add("campoConError")
            errores++
        }
    })

    if(campoNombre.length < 5){
        campoNombre.classList.add("campoConError")
        errores++
    }
    if(campoDesc.length < 20){
        campoDesc.classList.add("campoConError")
        errores++
    }

    if (errores >0){
        e.preventDefault()
    }
})