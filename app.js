const modal = document.getElementById('evento-modal');
const btnAbrirModal = document.querySelector('.btn-abrir-modal');
const spanCerrar = document.querySelector('.cerrar-modal');
const inputCorreo = document.getElementById('input-correo');
const btnValidar = document.getElementById('btn-validar');
const mensajeError = document.getElementById('mensaje-error');
const zonaAccion = document.querySelector('.modal-accion');
const notificacion = document.getElementById('notificacion');
const formatoOficial = /^[a-zA-Z0-9._-]{3,30}@espol\.edu\.ec$/;

btnAbrirModal.addEventListener('click', () => {
    modal.classList.add('mostrar');
    verificarSesion();
});

spanCerrar.addEventListener('click', () => {
    modal.classList.remove('mostrar');
});

window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.classList.remove('mostrar');
    }
});

btnValidar.addEventListener('click', () => {
    const correo = inputCorreo.value.trim().toLowerCase();
    if (formatoOficial.test(correo)) {
        mensajeError.textContent = "";
        inputCorreo.classList.remove('shake');
        localStorage.setItem('espolValidado', 'true');
        notificacion.classList.add('mostrar-toast');
        setTimeout(() => {
            notificacion.classList.remove('mostrar-toast');
        }, 3000);
        mostrarBotonStrava();
    } else {
        mensajeError.textContent = "Acceso denegado. Utiliza un correo válido de la ESPOL.";
        inputCorreo.classList.remove('shake');
        void inputCorreo.offsetWidth;
        inputCorreo.classList.add('shake');
    }
});

function verificarSesion() {
    if (localStorage.getItem('espolValidado') === 'true') {
        mostrarBotonStrava();
    }
}

function mostrarBotonStrava() {
    zonaAccion.innerHTML = `
        <p style="color: #b2ff05; font-weight: bold;">¡Identidad verificada, politécnico!</p>
        <p>Tu acceso ha sido confirmado. Ya puedes unirte al club privado.</p>
        <a href="https://www.strava.com" target="_blank" class="btn-strava" style="display: block; text-align: center; margin-top: 15px;">
            Unirse al Reto en Strava
        </a>
    `;
}
// ==========================================
// LÓGICA DEL FORMULARIO DE CONTACTO
// ==========================================
const formContacto = document.getElementById('form-contacto');

if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre && correo && mensaje) {
            // Mostramos una notificación de éxito reutilizando el toast
            notificacion.textContent = "¡Mensaje enviado con éxito! Gracias por contactarnos.";
            notificacion.classList.add('mostrar-toast');

            setTimeout(() => {
                notificacion.classList.remove('mostrar-toast');
                notificacion.textContent = "¡Bienvenido! Generando enlace de Strava..."; // Reseteamos el texto original
            }, 3500);

            // Limpiamos el formulario
            formContacto.reset();
        }
    });
}