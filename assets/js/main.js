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
    resultado.classList.remove("d-none");

    const numeroUno = parseInt(document.getElementById("numeroUno").value);
    const numeroDos = parseInt(document.getElementById("numeroDos").value);
    const operacion = document.getElementById("operacionMatematica").value;
    const resultadoCalculo = document.getElementById("ResultadoCalculo");

    if (operacion === 'Sumar'){
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno + numeroDos}`;
    } else if (operacion === 'Restar'){
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno - numeroDos}`;
    } else if (operacion === 'Multiplicar'){
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno * numeroDos}`;
    } else if (operacion === 'Dividir'){
        resultadoCalculo.innerHTML = `El resultado es: ${numeroUno / numeroDos}`;
    }
});

