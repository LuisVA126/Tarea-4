document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close');
    
    // Precios de los torneos en soles
    const preciosTorneos = {
        'Fornite': 50,
        'League of Legends': 60,
        'Dota 2': 70
    };
    
    // Cerrar modal al hacer clic en la X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const correo = document.getElementById('correo').value;
        const nombre = document.getElementById('nombre').value;
        const nacimiento = document.getElementById('nacimiento').value;
        const torneo = document.getElementById('torneo').value;
        const pago = parseFloat(document.getElementById('pago').value);
        
        // Validar que todos los campos estén completos
        if (!correo || !nombre || !nacimiento || !torneo || isNaN(pago)) {
            showModal('Por favor complete todos los campos del formulario.');
            return;
        }
        
        // Validar edad (mayor de 14 años)
        const fechaNacimiento = new Date(nacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        
        if (edad < 14) {
            showModal('Debes tener al menos 14 años para inscribirte en el torneo.');
            return;
        }
        
        // Validar pago
        const precioTorneo = preciosTorneos[torneo];
        
        if (pago < precioTorneo) {
            const faltante = precioTorneo - pago;
            showModal(`El pago es insuficiente. Faltan S/${faltante.toFixed(2)} para completar la inscripción.`);
            return;
        }
        
        // Calcular vuelto si es necesario
        if (pago > precioTorneo) {
            const vuelto = pago - precioTorneo;
            showModal(`¡Inscripción exitosa! Tu vuelto es de S/${vuelto.toFixed(2)}.`);
        } else {
            showModal('¡Inscripción exitosa! Pago exacto recibido.');
        }
    });
    
    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }
});