const dolarTab = document.getElementById("dolar-pesos");
const euroTab = document.getElementById("euro-pesos");
const ufTab = document.getElementById("uf-pesos");
const utmTab = document.getElementById("utm-pesos");

let ctx = document.getElementById("ChartDolar");
let chart = null;

dolarTab.addEventListener('click', () => {
    ctx = document.getElementById("ChartDolar");
    indicadoresApi('dolar');
});

euroTab.addEventListener('click', () => {
    ctx = document.getElementById("ChartEuro");
    indicadoresApi('euro');
});

ufTab.addEventListener('click', () => {
    ctx = document.getElementById("ChartUF");
    indicadoresApi('uf');
});

utmTab.addEventListener('click', () => {
    ctx = document.getElementById("ChartUTM");
    indicadoresApi('utm');
});

export const indicadoresApi = async(valor = 'dolar') => {
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
    serie.reverse();

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
                        color: '#f0f8ff', 
                    }
                },
                y: {
                    ticks: {
                        color: '#f0f8ff', 
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f0f8ff',
                    }
                },
                title: {
                    display: true,
                    text: (codigo == 'utm') ? 'Últimos 16 periodos'.toUpperCase() :
                         (codigo == 'uf') ? 'Últimos 30 días'.toUpperCase() : 'Últimos 31 días hábiles'.toUpperCase(),
                    color: '#f0f8ff',
                }
            }
        }
    }); 
  
    let chart2 = new CanvasJS.Chart("chartContainer", {
        title:{
            text:`${(codigo == 'utm') ? `${codigo.slice(0,3).toUpperCase()} a ${unidad_medida}` : 
                      (codigo == 'uf') ? `${codigo.slice(0,2).toUpperCase()} a ${unidad_medida}` : `${codigo.charAt(0).toUpperCase() + codigo.slice(1).toLowerCase()} a Pesos`}`,      
        },
        data: [{
            type: "line",
            dataPoints: 
                arrayFecha.map((fecha, index) => {
                    return { label: fecha , y: arrayValor[index]}
                }),
            }]
        });
        chart2.render();
};

indicadoresApi();

