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
    const inputs = document.querySelectorAll(
        "input, select"
    ); 
    const progressBar = document.getElementById("progressBar");

    // Función para calcular el progreso
    function updateProgress() {
        const totalFields = inputs.length; 
        let filledFields = 0;

        inputs.forEach((element) => {
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

        const progress = Math.round((filledFields / totalFields) * 100);
        progressBar.style.width = progress + "%"; 
        progressBar.setAttribute("aria-valuenow", progress); 
        progressBar.textContent = progress + "% completado"; 
    }

    inputs.forEach((element) => {
        element.addEventListener("input", updateProgress);
        element.addEventListener("change", updateProgress); 
    });

    
    updateProgress();
});


<<<<<<< HEAD
// Resumen final
document.addEventListener("DOMContentLoaded", () => {
    const resumenFinal = document.getElementById("resumenFinal");
    const datosResumen = document.getElementById("datosResumen");
    const enviarFormulario = document.getElementById("enviarFormulario");
    const editarDatos = document.getElementById("editarDatos");

    const inputs = document.querySelectorAll("input, select");

    // Función para mostrar el resumen final
    function mostrarResumen() {
        datosResumen.innerHTML = ""; // Limpiar el resumen anterior
        inputs.forEach((input) => {
            const label = input.closest(".row").querySelector(".form-label")?.textContent || "Campo:";
            const valor = input.value;

            // Ignorar campos vacíos
            if (
                valor &&
                valor !== "Seleccione:" &&
                valor !== "Sexo:" &&
                valor !== "Estado civil:" &&
                valor !== "Tipo de documento:" &&
                valor !== "Seleccione un departamento:" &&
                valor !== "Seleccione una ciudad:"
            ) {
                const resumenItem = `
                    <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <strong>${label}</strong>
                        <span>${valor}</span>
                    </div>`;
                datosResumen.insertAdjacentHTML("beforeend", resumenItem);
            }
        });

        resumenFinal.style.display = "block"; // Mostrar el resumen
    }

    // Evento al completar el formulario (100% progreso)
    document.getElementById("progressBar").addEventListener("DOMSubtreeModified", () => {
        const progress = document.getElementById("progressBar").getAttribute("aria-valuenow");
        if (progress === "100") {
            mostrarResumen();
        } else {
            resumenFinal.style.display = "none"; // Ocultar si no está completo
        }
    });

    // Evento para editar datos
    editarDatos.addEventListener("click", () => {
        resumenFinal.style.display = "none";
        document.documentElement.scrollTop = 0; // Ir al inicio del formulario
    });

    // Evento para enviar el formulario
    enviarFormulario.addEventListener("click", () => {
        alert("Formulario enviado con éxito.");
        // Aquí puedes agregar lógica para enviar los datos, por ejemplo, con fetch
    });
});


// Función para actualizar el reloj
function actualizarReloj() {
    const reloj = document.getElementById("reloj"); // Elemento donde se mostrará el reloj
    const ahora = new Date(); // Obtener la hora actual

    // Formatear horas, minutos y segundos para que siempre tengan dos dígitos
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    // Mostrar la hora formateada
    reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

// Ejecutar la función cada segundo
setInterval(actualizarReloj, 1000);

// Ejecutar inmediatamente al cargar la página para mostrar la hora inicial
document.addEventListener("DOMContentLoaded", actualizarReloj);

=======
//Componente dinamico Auto-completar sugerencias
document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombreInput");
    const nombreSuggestions = document.getElementById("nombreSuggestions");
  
    // Lista de nombres comunes en Colombia
    const nombresComunes = [
      "Juan", "María", "Carlos", "Laura", "Andrés", "Camila", 
      "Alejandro", "Sofía", "Daniel", "Valentina", "Luis", 
      "Paula", "Jorge", "Gabriela", "Sebastián", "Natalia", 
      "Miguel", "Diana", "Santiago", "Isabela", "Steven", "Jose",
       "Diego", "Cristian", "Antonio", "Eduardo", "Ricardo", "Vannesa",
       "Catalina", "Sandra", "Lina", "Juliana", "Oscar", "Luisa",
    ];
  
    // Manejador de entrada del usuario
    nombreInput.addEventListener("input", () => {
      const query = nombreInput.value.toLowerCase();
      nombreSuggestions.innerHTML = "";
  
      if (query) {
        const nombresFiltrados = nombresComunes.filter((nombre) =>
          nombre.toLowerCase().startsWith(query)
        );
  
        // Mostrar las sugerencias
        nombresFiltrados.forEach((nombre) => {
          const li = document.createElement("li");
          li.textContent = nombre;
  
          // Autocompletar al hacer clic
          li.addEventListener("click", () => {
            nombreInput.value = nombre;
            nombreSuggestions.innerHTML = ""; // Limpiar sugerencias
          });
  
          nombreSuggestions.appendChild(li);
        });
      }
    });
  
    // Ocultar las sugerencias si se hace clic fuera del campo
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".mb-3")) {
        nombreSuggestions.innerHTML = "";
      }
    });
  });
>>>>>>> 5dd9409f11c70aee5fe7d62e1faca42b1335ea8f
