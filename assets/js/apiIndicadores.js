const dolarTab = document.getElementById("dolar-pesos");
const euroTab = document.getElementById("euro-pesos");
const ufTab = document.getElementById("uf-pesos");
const utmTab = document.getElementById("utm-pesos");

let ctx = document.getElementById("ChartDolar");
let valor = 'dolar';
let chart = null;

dolarTab.addEventListener('click', () => {
    valor = 'dolar';
    ctx = document.getElementById("ChartDolar");
    indicadoresApi();
});

euroTab.addEventListener('click', () => {
    valor = 'euro';
    ctx = document.getElementById("ChartEuro");
    indicadoresApi();
});

ufTab.addEventListener('click', () => {
    valor = 'uf';
    ctx = document.getElementById("ChartUF");
    indicadoresApi();
});

utmTab.addEventListener('click', () => {
    valor = 'utm';
    ctx = document.getElementById("ChartUTM");
    indicadoresApi();
});

export const indicadoresApi = async() => {
    try {
        const obtenerDatos = await fetch(`https://mindicador.cl/api/${valor}`, {
            method: "GET"
        });
        const data = await obtenerDatos.json();
        actualizarGrafico(data);
    } catch (error) {
        console.log('Error: ', error);
    };
};

const actualizarGrafico = (data) => {
    const {codigo, unidad_medida, serie} = data;

    const arrayFecha = serie.map(dato => {
        const {fecha} = dato;
        const fechaString = new Date(fecha).toLocaleDateString(); 
        return fechaString;
    });

    const arrayValor = serie.map(dato => {
        const {valor} = dato;
        return valor;
    });

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayFecha,
            datasets: [{
                label: `${(codigo == 'utm') ? `${codigo.slice(0,3).toUpperCase()} a ${unidad_medida}` : 
                      (codigo == 'uf') ? `${codigo.slice(0,2).toUpperCase()} a ${unidad_medida}` : `${codigo.charAt(0).toUpperCase() + codigo.slice(1).toLowerCase()} a Pesos`}`,
                data: arrayValor,
                borderWidth: 1,
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#f0f8ff', // Cambia el color de la fuente del eje X
                    }
                },
                y: {
                    ticks: {
                        color: '#f0f8ff', // Cambia el color de la fuente del eje Y
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f0f8ff', // Cambia el color de la fuente de la leyenda
                    }
                },
                title: {
                    display: true,
                    text: (codigo == 'utm') ? 'Últimos 16 periodos'.toUpperCase() :
                         (codigo == 'uf') ? 'Últimos 30 días'.toUpperCase() : 'Últimos 31 días hábiles'.toUpperCase(),
                    color: '#f0f8ff', // Cambia el color de la fuente del título
                }
            }
        }
    }); 
};

indicadoresApi()

