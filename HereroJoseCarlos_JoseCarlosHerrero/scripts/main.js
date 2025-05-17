window.onload = function () {
    // Obtener nombre desde localStorage o pedirlo si no existe
    let nombre = localStorage.getItem("nombreUsuario");
    if (!nombre) {
        // Solicitar el nombre al usuario si no está guardado
        nombre = prompt("¡Bienvenido a PC Componentes! Por favor, ingresa tu nombre:");
        if (nombre) {
            // Guardar el nombre en localStorage
            localStorage.setItem("nombreUsuario", nombre);
        }
    }

    // Mostrar el nombre en el h1 si existe
    if (nombre) {
        const h1 = document.querySelector('h1');
        // Añadir el nombre al texto del h1
        h1.textContent += `, ${nombre}`;
    }

    // Verificar edad si no está guardada
    let edad = localStorage.getItem("edadUsuario");
    if (!edad) {
        // Solicitar la edad al usuario si no está guardada
        edad = prompt("Por favor, ingresa tu edad:");
        if (edad) {
            // Guardar la edad en localStorage
            localStorage.setItem("edadUsuario", edad);
        }
    }

    // Mostrar mensaje según la edad
    if (edad) {
        if (parseInt(edad) >= 18) {
            alert("Puedes acceder a todos nuestros productos y ofertas.");
        } else {
            alert("Acceso limitado. Algunos productos pueden estar restringidos para menores de edad.");
        }
    }

    // Aplica tema guardado o tema claro por defecto
    const temaGuardado = localStorage.getItem('tema') || 'claro';
    aplicarTema(temaGuardado);

    // Crear botones en contenedor principal
    const contenedor = document.querySelector('.contenedor-principal');

    // Botón para cambiar el tema
    const botonTema = document.createElement('button');
    botonTema.id = 'cambiar-tema';
    botonTema.className = 'boton-personalizado';
    botonTema.textContent = temaGuardado === 'claro' ? 'Tema Oscuro' : 'Tema Claro';
    contenedor.appendChild(botonTema);

    // Botón para iniciar el juego
    const botonJuego = document.createElement('button');
    botonJuego.id = 'juego-boton';
    botonJuego.className = 'boton-personalizado';
    botonJuego.style.marginTop = '20px';
    botonJuego.textContent = 'Jugar: Adivina el número';
    contenedor.appendChild(botonJuego);

    // Cambiar tema al hacer click
    botonTema.addEventListener('click', function () {
        if (document.body.classList.contains('tema-claro')) {
            // Cambiar a tema oscuro
            aplicarTema('oscuro');
            this.textContent = 'Tema Claro';
        } else {
            // Cambiar a tema claro
            aplicarTema('claro');
            this.textContent = 'Tema Oscuro';
        }
    });

    // Iniciar juego al hacer click
    botonJuego.addEventListener('click', iniciarJuego);
};

// Función para aplicar el tema (oscuro o claro)
function aplicarTema(tema) {
    if (tema === 'oscuro') {
        document.body.classList.remove('tema-claro');
        document.body.classList.add('tema-oscuro');
        localStorage.setItem('tema', 'oscuro');
    } else {
        document.body.classList.remove('tema-oscuro');
        document.body.classList.add('tema-claro');
        localStorage.setItem('tema', 'claro');
    }
}

// Juego simple - Adivina el número
function iniciarJuego() {
    // Generar un número secreto aleatorio entre 1 y 100
    const numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let intentos = 0;
    let adivinado = false;

    alert("Juego: Adivina el número entre 1 y 100");

    // Permitir hasta 10 intentos
    while (!adivinado && intentos < 10) {
        // Pedir al usuario que ingrese un número
        let intento = prompt(`Intento ${intentos + 1}/10 - Ingresa un número:`);

        // Si el usuario cancela, salir del juego
        if (intento === null) break;

        intento = parseInt(intento);

        // Validar que el valor ingresado sea un número
        if (isNaN(intento)) {
            alert("Por favor, ingresa un número válido.");
            continue;
        }

        intentos++;

        // Dar pistas al usuario
        if (intento < numeroSecreto) {
            alert("El número es mayor.");
        } else if (intento > numeroSecreto) {
            alert("El número es menor.");
        } else {
            adivinado = true;
            alert(`¡Correcto! Adivinaste en ${intentos} intentos.`);
        }
    }

    // Si no adivinó en 10 intentos, mostrar el número secreto
    if (!adivinado) {
        alert(`Lo siento, el número era ${numeroSecreto}.`);
    }
}
