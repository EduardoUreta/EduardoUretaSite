const divisaUno = document.getElementById("DivisaUno");
const divisaDos = document.getElementById("DivisaDos");
const valorAConvertir = document.getElementById("ValorAConvertir");
const botonConvertir = document.getElementById("botonConvertir");
const resultadoConversion = document.getElementById("ResultadoConversion");

export const indicadoresApi = async(valor) => {
    try {
        const obtenerDatos = await fetch(`https://mindicador.cl/api/${valor}`, {
            method: "GET"
        });
        const data = await obtenerDatos.json();
        const {serie} = data;
        return serie;
    } catch (error) {
        console.log('Error: ', error);
    };
};

const conversorDivisas = () => {

    botonConvertir.addEventListener('click', (e) => {
        if (valorAConvertir.value == ''){
            resultadoConversion.innerHTML = `
                <h4 class="m-0 text-center" style="color: rgb(12 12 54)">
                    Ingresa un valor
                </h4>
            `;
        } else if (divisaUno.value == divisaDos.value) {
            resultadoConversion.innerHTML = `
                <h4 class="m-0" style="color: rgb(12 12 54)">
                    Elige otra moneda para convertir
                </h4>
            `;
        } else if (divisaUno.value != 'CPL'){
            const obtenerDatosDivisaUno = indicadoresApi(divisaUno.value);
            obtenerDatosDivisaUno
                .then((data) => {
                    if(divisaDos.value === 'CPL'){
                        const valorActualDivisaUno = data[0].valor;
                        const calculo = valorAConvertir.value * valorActualDivisaUno;
                        resultadoConversion.innerHTML = `<h4 class="m-0" style="color: rgb(12 12 54)">$${calculo} ${divisaDos.value}</h4>`;
                    } else {
                        const valorActualDivisaUno = data[0].valor;
                        const obtenerDatosDivisaDos = indicadoresApi(divisaDos.value);
                        obtenerDatosDivisaDos
                            .then((data) => {
                                const valorActualDivisaDos = data[0].valor;
                                const calculo = valorAConvertir.value * valorActualDivisaUno / valorActualDivisaDos;
                                resultadoConversion.innerHTML = `
                                    <h4 class="">
                                        $${(calculo % 1 === 0) ? calculo : calculo.toFixed(3)} ${divisaDos.value}
                                    </h4>
                                `;
                            })
                            .catch((error) => {
                                console.log('Error: ', error);
                            });
                    };
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        } else {
            const obtenerDatosDivisaDos = indicadoresApi(divisaDos.value);
            obtenerDatosDivisaDos
                .then((data) => {
                    const valorActualDivisaDos = data[0].valor;
                    const calculo = valorAConvertir.value / valorActualDivisaDos;
                    resultadoConversion.innerHTML = `
                        <h4 class="m-0" style="color: rgb(12 12 54)">
                            $${(calculo % 1 === 0) ? calculo : calculo.toFixed(3)} ${divisaDos.value}
                        </h4>
                    `;
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        };
    });
};

conversorDivisas();