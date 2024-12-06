// Hijos/ conyuges
document.getElementById('estadoCivil').addEventListener('change', function () {
    const camposConyuge = document.getElementById('camposConyuge');
    if (this.value === 'casado' || this.value === 'unionLibre') {
        camposConyuge.style.display = 'block';
    } else {
        camposConyuge.style.display = 'none';
    }
});

// Cantidad de hijos
 const tieneHijosSelect = document.getElementById('tieneHijos');
 const cantidadHijosContainer = document.getElementById('cantidadHijosContainer');
 const cantidadHijosInput = document.getElementById('cantidadHijos');
 const nombresHijosContainer = document.getElementById('nombresHijosContainer');

 // Mostrar u ocultar campos según respuesta a "¿Tiene hijos?"
 tieneHijosSelect.addEventListener('change', function () {
     if (this.value === 'si') {
         cantidadHijosContainer.style.display = 'block';
     } else {
         cantidadHijosContainer.style.display = 'none';
         nombresHijosContainer.style.display = 'none';
         nombresHijosContainer.innerHTML = '';
     }
 });

 // Generar campos dinámicos según la cantidad de hijos
 cantidadHijosInput.addEventListener('input', function () {
     const cantidad = parseInt(this.value) || 0; 
     nombresHijosContainer.innerHTML = ''; 
     if (cantidad > 0) {
         nombresHijosContainer.style.display = 'block';
         for (let i = 1; i <= cantidad; i++) {
             const hijoField = `
                 <div class="mb-3 col-12">
                     <label class="form-label letra-texto">Nombre del hijo ${i}:</label>
                     <input type="text" class="form-control form-control-lg rounded-4" placeholder="Nombre del hijo ${i}">
                 </div>
             `;
             nombresHijosContainer.insertAdjacentHTML('beforeend', hijoField);
         }
     } else {
         nombresHijosContainer.style.display = 'none';
     }
 });

// Si mama es soltera y tiene hijos
 // Referencias a los elementos
 const sexoSelect = document.getElementById('sexo');
 const estadoCivilSelect = document.getElementById('estadoCivil');
 const tieneHijosSelectt = document.getElementById('tieneHijos');
 const cantidadHijosContainerr = document.getElementById('cantidadHijosContainer');
 const cantidadHijosInputt = document.getElementById('cantidadHijos');
 const mensajeSubsidio = document.getElementById('mensajeSubsidio');

 // Mostrar campos adicionales si responde "Tiene hijos"
 tieneHijosSelectt.addEventListener('change', function () {
     if (this.value === 'si') {
         cantidadHijosContainerr.style.display = 'block';
     } else {
         cantidadHijosContainerr.style.display = 'none';
         mensajeSubsidio.style.display = 'none';
     }
 });

 // Calcular y mostrar subsidio
 cantidadHijosInputt.addEventListener('input', function () {
     const cantidadHijos = parseInt(this.value) || 0;
     const sexo = sexoSelect.value;
     const estadoCivil = estadoCivilSelect.value;

     if (sexo === '1' && estadoCivil === 'soltero' && cantidadHijos > 0) {
         const subsidioTotal = cantidadHijos * 100000;
         mensajeSubsidio.style.display = 'block';
         mensajeSubsidio.querySelector('.alert').textContent = 
             `Tiene derecho a un subsidio de $${subsidioTotal.toLocaleString('es-CO')} pesos por sus ${cantidadHijos} hijo(s).`;
     } else {
         mensajeSubsidio.style.display = 'none';
     }
 });

 //  Departamentos desde el json
async function cargarDepartamentos() {
    try {
        const response = await fetch('departamentos.json');
        const departamentos = await response.json();

        const selectDepartamentos = document.getElementById('departamentos');
        const selectCiudades = document.getElementById('ciudades');

        departamentos.forEach(departamento => {
            const option = document.createElement('option');
            option.value = departamento.nombre;
            option.textContent = departamento.nombre;
            selectDepartamentos.appendChild(option);
        });

        // Evento para actualizar ciudades al seleccionar un departamento
        selectDepartamentos.addEventListener('change', () => {
            const departamentoSeleccionado = selectDepartamentos.value;

            // Limpiar ciudades anteriores
            selectCiudades.innerHTML = '<option selected>Seleccione una ciudad:</option>';

            // Buscar ciudades del departamento seleccionado
            const departamento = departamentos.find(
                d => d.nombre === departamentoSeleccionado
            );

            if (departamento) {
                departamento.ciudades.forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = ciudad;
                    option.textContent = ciudad;
                    selectCiudades.appendChild(option);
                });
            }
        });
    } catch (error) {
        console.error('Error cargando los departamentos:', error);
    }
}

window.addEventListener('DOMContentLoaded', cargarDepartamentos);





// Barra de progreso
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todos los inputs y selects dentro del formulario
    const inputs = document.querySelectorAll(
        "input, select"
    ); // Todos los campos del formulario
    const progressBar = document.getElementById("progressBar");

    // Función para calcular el progreso
    function updateProgress() {
        const totalFields = inputs.length; // Total de campos interactivos
        let filledFields = 0;

        inputs.forEach((element) => {
            // Contar los campos completados
            if (
                element.value.trim() !== "" &&
                element.value !== "Seleccione:" &&
                element.value !== "Sexo:" &&
                element.value !== "Estado civil:" &&
                element.value !== "Tipo de documento:" &&
                element.value !== "Seleccione un departamento:" &&
                element.value !== "Seleccione una ciudad:"
            ) {
                filledFields++;
            }
        });

        // Calcular el porcentaje de progreso
        const progress = Math.round((filledFields / totalFields) * 100);
        progressBar.style.width = progress + "%"; // Ajustar el ancho de la barra
        progressBar.setAttribute("aria-valuenow", progress); // Actualizar el atributo accesible
        progressBar.textContent = progress + "% completado"; // Mostrar el porcentaje
    }

    // Agregar eventos de actualización a todos los campos
    inputs.forEach((element) => {
        element.addEventListener("input", updateProgress);
        element.addEventListener("change", updateProgress); // Para selects
    });

    // Inicializar el progreso al cargar la página
    updateProgress();
});
