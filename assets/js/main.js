const testimonioUno = document.getElementById("TestimonioUno");
const testimonioDos = document.getElementById("TestimonioDos");

const botonTestimonioUno = document.getElementById("BotonVerTestimonioUno");
const botonTestimonioDos = document.getElementById("BotonVerTestimonioDos");

const submitButton = document.getElementById("submitButton");
const mensajeFormEnviado = document.getElementById("submitSuccessMessage");

const retoTotal = document.getElementById("RetoTotal");
const rehabilitaSantiago = document.getElementById("RehabilitaSantiago");

const navLinks = document.querySelectorAll('.nav-link');
const navBar = document.getElementById("navbarText");

const calculadora = document.getElementById("Calculadora");
const botonCalcular = document.getElementById("botonCalcular");
const resultado = document.getElementById("Resultado");
const error = document.getElementById("Error");

const botonApi = document.getElementById("BotonApi");

// Nav Translucido
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {  
            nav.classList.add('nav-fondo-transparente');
            nav.classList.remove('nav-fondo-negro');
        } else {
            nav.classList.add('nav-fondo-negro');
            nav.classList.remove('nav-fondo-transparente');
        }
    });
});



// Cerrar Menu Hamburguesa al apretar un enlance
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        navBar.classList.remove("show");
    })
})

// Ver Testimonio Uno
botonTestimonioUno.addEventListener("click", () => {
    testimonioUno.innerHTML = "El desarrollo de nuestra página web fue excelente. Capturó nuestra visión a la perfección, entregando un sitio moderno y funcional. Su profesionalismo y atención al detalle nos dejaron completamente satisfechos.";
    retoTotal.innerHTML = "<a href='https://retototal.cl/' class='text-decoration-none text-danger'>Reto Total</a>";
    botonTestimonioUno.style.display = 'none';
});

// Ver Testimonio Dos
botonTestimonioDos.addEventListener("click", () => {
    testimonioDos.innerHTML = "Trabajar con Eduardo Ureta en nuestra página web fue una gran decisión. Supo entender nuestras necesidades y entregó un sitio web intuitivo y profesional que representa perfectamente nuestra misión. ¡Totalmente recomendado!";
    rehabilitaSantiago.innerHTML = "<a href='https://rehabilitasantiago.cl/' class='text-decoration-none text-danger'>Rehabilita Santiago</a>";
    botonTestimonioDos.style.display = 'none';
});

// Mensaje Form Enviado
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    mensajeFormEnviado.classList.remove("d-none");
});

// Calculadora
botonCalcular.addEventListener('click', (e) => {
    e.preventDefault();

    const numeroUno = parseInt(document.getElementById("numeroUno").value);
    const numeroDos = parseInt(document.getElementById("numeroDos").value);
    const operacion = document.getElementById("operacionMatematica").value;
    const resultadoCalculo = document.getElementById("ResultadoCalculo");
    const errorCalculo = document.getElementById("ErrorCalculo");

    if (isNaN(numeroUno) || isNaN(numeroDos)){
        error.classList.remove("d-none");
        resultado.classList.add("d-none");
        errorCalculo.innerHTML = 'Debes ingresar ambos números'
    } else if(operacion === 'Escoge una operación') {
        error.classList.remove("d-none");
        resultado.classList.add("d-none");
        errorCalculo.innerHTML = `Debes ingresar una operación matemática`;
    } else if (operacion === 'Sumar'){
        error.classList.add("d-none");
        resultado.classList.remove("d-none");
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno + numeroDos}`;
    } else if (operacion === 'Restar'){
        error.classList.add("d-none");
        resultado.classList.remove("d-none");
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno - numeroDos}`;
    } else if (operacion === 'Multiplicar'){
        error.classList.add("d-none");
        resultado.classList.remove("d-none");
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno * numeroDos}`;
    } else if (operacion === 'Dividir'){
        error.classList.add("d-none");
        resultado.classList.remove("d-none");
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno / numeroDos}`;
    }
    
});

// Ver Consumo de Apis
botonApi.addEventListener('click', (e) => {
    e.preventDefault();

    const divApis = document.getElementById('Apis');

    if (divApis.classList.contains('d-none')) {
        divApis.classList.remove("d-none");
        divApis.classList.remove("animate__bounceOut");
        divApis.classList.add("animate__bounceIn");
    } else {
        divApis.classList.remove("animate__bounceIn");
        divApis.classList.add("animate__bounceOut");

        setTimeout(() => {
            divApis.classList.add("d-none");
        }, 1000);
    }
});


