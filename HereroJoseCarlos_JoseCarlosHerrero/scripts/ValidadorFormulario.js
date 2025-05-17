// Obtiene el formulario
const formulario = document.getElementById('form-contacto');

if (formulario) {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtiene los valores de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validaciones
        if (!nombre) {
            alert('Por favor, introduce tu nombre.');
            return;
        }

        if (!validarEmail(email)) {
            alert('El email no es válido.');
            return;
        }

        if (telefono && !/^\d{7,15}$/.test(telefono)) {
            alert('El teléfono debe contener solo números (7-15 dígitos).');
            return;
        }

        if (!validarPassword(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Si todo está correcto, redirige
        window.location.href = "ContactoEnviado.html";
    });
}

function validarEmail(email) {
    // Regex para validar emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarPassword(pass) {
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);
}