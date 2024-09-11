fetch('https://api.gael.cloud/general/public/sismos', {
    method: 'GET', 
    headers: {accept: 'application/json'}
})
.then(response => response.json())
.then(data => {
    const ultimosSismos = data;
    
    const mostrarSismos = document.getElementById('MostrarSismos');

    let sismosHTML = `
        <div class="container text-light mt-4">
            <div class="row justify-content-center mb-1" data-aos="fade-up" data-aos-delay="25">
                <div class="col-12 d-flex justify-content-between align-items-center bg-primary p-2 rounded" style="font-weight: bold;">
                    <div style="width: 60%;" class="text-center">Fecha / Lugar</div>
                    <div style="width: 20%;" class="text-center">Magnitud</div>
                    <div style="width: 20%;" class="text-center">Profundidad</div>
                </div>
            </div>
            <div class="row">
    `;

    for (let i = 0; i < ultimosSismos.length; i++){
        const sismos = ultimosSismos[i];

        const fechaOriginal = sismos.Fecha.slice(0, 10);
        const fechaPartes = fechaOriginal.split("-");
        const nuevaFecha = `${fechaPartes[2]}-${fechaPartes[1]}-${fechaPartes[0]}`;  

        const horaOriginal = sismos.Fecha.slice(11, 19);

        sismosHTML += `
            <div class="col-12 d-flex justify-content-between align-items-center border-bottom py-2" data-aos="fade-up" data-aos-delay="50">
                <div style="width: 60%;">
                    <strong>${nuevaFecha} <span class="text-secondary" style="margin-left: 10px;">${horaOriginal}</span></strong>
                    <h6 class="mt-1 text-primary">${sismos.RefGeografica}</h6>  
                </div>
                <div class="text-center ${sismos.Magnitud >= 4.0 ? 'text-danger' : 'text-success'}" style="width: 20%; font-weight: bold;">
                    ${sismos.Magnitud}
                </div>
                <div class="text-center" style="width: 20%;">
                    ${sismos.Profundidad} km
                </div>
            </div>
        `;
    }

    sismosHTML += `   
            </div>
        </div>
    `;

    mostrarSismos.innerHTML = sismosHTML;

})
.catch(err => console.error(err));
