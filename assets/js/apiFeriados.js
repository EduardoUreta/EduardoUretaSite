fetch('https://api.boostr.cl/holidays.json', {
    method: 'GET', 
    headers: {accept: 'application/json'}
})
.then(response => response.json())
.then(data => {
    const diasFeriados = data.data;
    const listaFeriados = document.getElementById('ListaFeriados');

    let datosHTMLLista = `
        <div class="container mt-4">
            <div class="row">
                <div class="d-flex justify-content-center">
                    <table class="table table-hover table-striped table-bordered text-center align-middle">
                        <thead class="table-danger">
                            <tr style="font-size: 18px;">
                                <th>Título</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Irrenunciable</th>
                            </tr>
                        </thead>
                        <tbody class="table-primary">
    `;

    for (let i = 0; i < diasFeriados.length; i++) {
        const fechaOriginal = diasFeriados[i].date;
        const fechaPartes = fechaOriginal.split("-");
        const fechaNueva = `${fechaPartes[2]}-${fechaPartes[1]}-${fechaPartes[0]}`;

        datosHTMLLista += `
            <tr>
                <td style="font-weight: 600;">${diasFeriados[i].title}</td>
                <td>${fechaNueva}</td>
                <td>${diasFeriados[i].type}</td>
                <td class="${diasFeriados[i].inalienable ? 'text-danger' : ''}">${diasFeriados[i].inalienable ? 'Sí' : 'No'}</td>
            </tr>
        `;
    }

    datosHTMLLista += `
        </tbody>
        </table>
    </div>
    </div>
    </div>
    `;
    listaFeriados.innerHTML = datosHTMLLista;

    const tablaFeriados = document.getElementById('CalendarioFeriados');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const feriados = diasFeriados.map(feriado => {
        const [anio, mes, dia] = feriado.date.split("-");
        return {
            mes: parseInt(mes, 10) - 1,
            dia: parseInt(dia, 10),
            title: feriado.title,
            type: feriado.type,
            date: feriado.date,
            inalienable: feriado.inalienable,
        };
    });

    let datosHTMLTabla = `<div class="row" style="gap: 5px;">`;

    for (let i = 0; i < meses.length; i++) {
        const mes = meses[i];
        const fecha = new Date(`2024-${i + 1}-01`);
        
        // Calcular el primer día del mes y los días del mes
        const primerDia = (new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay() + 6) % 7;
        const diasDelMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
        
        let calendario = '';
        let dia = 1;

        // Generar las filas del calendario
        for (let fila = 0; fila < 6; fila++) {
            calendario += '<tr>';
            
            for (let columna = 0; columna < 7; columna++) {
                if (fila === 0 && columna < primerDia) {
                    calendario += '<td></td>';
                } else if (dia <= diasDelMes) {
                    const esFeriado = feriados.some(f => f.mes === i && f.dia === dia);
                    calendario += `
                        <td class="${esFeriado ? 'text-danger diaFeriado' : ''}"
                            data-title="${esFeriado ? feriados.find(f => f.mes === i && f.dia === dia).title : ''}"
                            data-date="${esFeriado ? feriados.find(f => f.mes === i && f.dia === dia).date : ''}"
                            data-type="${esFeriado ? feriados.find(f => f.mes === i && f.dia === dia).type : ''}"
                            data-inalienable="${esFeriado ? feriados.find(f => f.mes === i && f.dia === dia).inalienable : ''}">
                            ${dia}
                        </td>
                    `;
                    dia++;
                } else {
                    calendario += '<td></td>';
                }
            }
            
            calendario += '</tr>';
        }
        
        datosHTMLTabla += `
            <div class="col-lg-4 col-md-4 col-sm-6 card m-auto m-0 justify-content-center text-center mt-5 animate__animated">
                <div class="license-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="card-header">
                        <h3>${mes}</h3>
                    </div>
                    <table class="table table-hover table-striped table-bordered text-center align-middle">
                        <thead class="table-danger">
                            <tr>
                                <th style="width: 14.2857%">L</th>
                                <th style="width: 14.2857%">M</th>
                                <th style="width: 14.2857%">X</th>
                                <th style="width: 14.2857%">J</th>
                                <th style="width: 14.2857%">V</th>
                                <th style="width: 14.2857%">S</th>
                                <th style="width: 14.2857%">D</th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            ${calendario}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    datosHTMLTabla += `</div>`;
    tablaFeriados.innerHTML = datosHTMLTabla;

    // Apretar en feriado y obtener información
    const diaFeriado = document.querySelectorAll('.diaFeriado');

    diaFeriado.forEach((dia) => {
        dia.addEventListener('click', (e) => {
            const target = e.target;
    
            // Extraer la información del feriado desde los atributos data-
            const title = target.getAttribute('data-title');
            const date = target.getAttribute('data-date');
            const type = target.getAttribute('data-type');
            const inalienable = target.getAttribute('data-inalienable') === 'true' ? 'Sí' : 'No';

            // Formatear feacha
            const fechaOriginal = date;
            const fechaPartes = fechaOriginal.split("-");
            const fechaNueva = `${fechaPartes[2]}-${fechaPartes[1]}-${fechaPartes[0]}`;
    
            // Asignar la información del feriado al modal
            document.getElementById('feriadoModalLabel').innerText = title;
            document.getElementById('feriadoFecha').innerText = `Fecha: ${fechaNueva}`;
            document.getElementById('feriadoTipo').innerText = `Tipo: ${type}`;
            document.getElementById('feriadoIrrenunciable').innerText = `Irrenunciable: ${inalienable}`;
    
            // Abrir el modal
            const modal = new bootstrap.Modal(document.getElementById('feriadoModal'));
            modal.show();
        });
    });
    
})

.catch(err => console.error(err));



