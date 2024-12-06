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