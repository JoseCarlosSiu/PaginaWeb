// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos(); // Carga los productos en la página

    // Recupera el carrito del localStorage o lo inicializa vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    actualizarCarrito(); // Actualiza la visualización del carrito

    // Obtiene referencias a los elementos del carrito y su icono
    const iconoCarrito = document.getElementById('icono-carrito');
    const carritoDiv = document.getElementById('carrito');

    // Muestra u oculta el carrito al hacer clic en el icono
    iconoCarrito.addEventListener('click', () => {
        if (carritoDiv.style.display === 'none' || carritoDiv.style.display === '') {
            carritoDiv.style.display = 'block';
        } else {
            carritoDiv.style.display = 'none';
        }
    });

    // Maneja el evento de agregar productos al carrito
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            // Obtiene los datos del producto desde los atributos del botón
            const productoId = e.target.getAttribute('data-id');
            const productoNombre = e.target.getAttribute('data-nombre');
            const productoPrecio = parseFloat(e.target.getAttribute('data-precio'));

            // Busca si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.id === productoId);

            if (productoExistente) {
                // Si existe, incrementa la cantidad y actualiza el precio total
                productoExistente.cantidad += 1;
                productoExistente.precioTotal = productoExistente.cantidad * productoPrecio;
            } else {
                // Si no existe, lo agrega al carrito
                carrito.push({
                    id: productoId,
                    nombre: productoNombre,
                    precioUnitario: productoPrecio,
                    cantidad: 1,
                    precioTotal: productoPrecio
                });
            }

            // Guarda el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito(); // Actualiza la visualización del carrito
            mostrarNotificacion(`${productoNombre} añadido al carrito`); // Notifica al usuario
        }
    });

    // Maneja el evento de vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', function() {
        carrito = []; // Vacía el carrito
        localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
        actualizarCarrito(); // Actualiza la visualización
        mostrarNotificacion('Carrito vaciado'); // Notifica al usuario
    });

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const carritoContainer = document.getElementById('items-carrito');
        carritoContainer.innerHTML = '';

        if (carrito.length === 0) {
            // Si el carrito está vacío, muestra un mensaje
            carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
            document.getElementById('comprar').style.display = 'none';
            return;
        }

        let total = 0;
        const lista = document.createElement('ul');
        lista.className = 'lista-carrito';

        // Recorre los productos del carrito y los muestra
        carrito.forEach(item => {
            total += item.precioTotal;

            const li = document.createElement('li');
            li.className = 'item-carrito';
            li.innerHTML = `
                <span class="nombre-producto">${item.nombre}</span>
                <span class="detalle-producto">
                    €${item.precioUnitario.toFixed(2)} x ${item.cantidad} = €${item.precioTotal.toFixed(2)}
                </span>
                <button class="eliminar-item" data-id="${item.id}">✕</button>
            `;
            lista.appendChild(li);
        });

        carritoContainer.appendChild(lista);

        // Muestra el total del carrito
        const totalElement = document.createElement('div');
        totalElement.className = 'total-carrito';
        totalElement.innerHTML = `
            <hr>
            <p><strong>Total: €${total.toFixed(2)}</strong></p>
        `;
        carritoContainer.appendChild(totalElement);

        // Muestra el botón de comprar
        document.getElementById('comprar').style.display = 'inline-block';

        // Agrega eventos para eliminar productos del carrito
        document.querySelectorAll('.eliminar-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                carrito = carrito.filter(item => item.id !== id); // Elimina el producto
                localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el localStorage
                actualizarCarrito(); // Actualiza la visualización
                mostrarNotificacion('Producto eliminado'); // Notifica al usuario
            });
        });
    }

    // Función para mostrar notificaciones al usuario
    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 10);

        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
});

// Función para cargar los productos en la página
function cargarProductos() {
    // Define los productos disponibles
    const productos = {
        procesadores: [
            { id: 'CPU001', nombre: 'AMD Ryzen 9 7950X', precio: '699', marca: 'AMD', descripcion: 'Procesador de 16 núcleos y 32 hilos' },
            { id: 'CPU002', nombre: 'Intel Core i9-13900K', precio: '649', marca: 'Intel', descripcion: 'Procesador de 24 núcleos (8P+16E)' },
            { id: 'CPU003', nombre: 'Intel Core i5-13600K', precio: '319', marca: 'Intel', descripcion: 'Procesador de 14 núcleos (6P+8E)' },
            { id: 'CPU004', nombre: 'AMD Ryzen 7 7700X', precio: '399', marca: 'AMD', descripcion: '8 núcleos y 16 hilos, 5.4GHz boost' },
            { id: 'CPU005', nombre: 'Intel Core i7-12700KF', precio: '379', marca: 'Intel', descripcion: '12 núcleos (8P+4E), desbloqueado' },
            { id: 'CPU006', nombre: 'Intel Core i3-12100F', precio: '119', marca: 'Intel', descripcion: '4 núcleos, 8 hilos, ideal para presupuestos bajos' }
        ],
        graficas: [
            { id: 'GPU001', nombre: 'NVIDIA RTX 4090', precio: '1999', marca: 'NVIDIA', descripcion: '24GB GDDR6X, 16384 CUDA Cores' },
            { id: 'GPU002', nombre: 'AMD RX 7900 XTX', precio: '1099', marca: 'AMD', descripcion: '24GB GDDR6, 6144 Stream Processors' },
            { id: 'GPU003', nombre: 'NVIDIA RTX 4070 Ti', precio: '799', marca: 'NVIDIA', descripcion: '12GB GDDR6X, DLSS 3.0' },
            { id: 'GPU004', nombre: 'AMD RX 7800 XT', precio: '549', marca: 'AMD', descripcion: '16GB GDDR6, Ray Tracing support' },
            { id: 'GPU005', nombre: 'NVIDIA RTX 3060', precio: '319', marca: 'NVIDIA', descripcion: '12GB GDDR6, Ideal para 1080p' },
            { id: 'GPU006', nombre: 'Intel Arc A770', precio: '329', marca: 'Intel', descripcion: '16GB GDDR6, Xe HPG architecture' }
        ],
        ram: [
            { id: 'RAM001', nombre: 'Corsair Dominator Platinum RGB 32GB', precio: '199', marca: 'Corsair', descripcion: 'DDR5 6000MHz CL36' },
            { id: 'RAM002', nombre: 'G.Skill Trident Z5 RGB 64GB', precio: '299', marca: 'G.Skill', descripcion: 'DDR5 6400MHz CL32' },
            { id: 'RAM003', nombre: 'Kingston Fury Beast 16GB', precio: '89', marca: 'Kingston', descripcion: 'DDR4 3200MHz CL16' },
            { id: 'RAM004', nombre: 'TeamGroup T-Force Delta RGB 32GB', precio: '139', marca: 'TeamGroup', descripcion: 'DDR5 6000MHz CL40' },
            { id: 'RAM005', nombre: 'Patriot Viper Steel 16GB', precio: '79', marca: 'Patriot', descripcion: 'DDR4 3600MHz, sin RGB' },
            { id: 'RAM006', nombre: 'Crucial Ballistix 16GB', precio: '99', marca: 'Crucial', descripcion: 'DDR4 3600MHz CL16' }
        ],
        placasBase: [
            { id: 'MB101', nombre: 'ASUS ROG Strix Z790-E Gaming', precio: '499', marca: 'ASUS', descripcion: 'Placa base ATX con soporte para DDR5 y PCIe 5.0' },
            { id: 'MB102', nombre: 'MSI MAG B650 Tomahawk WiFi', precio: '259', marca: 'MSI', descripcion: 'Placa base AM5 con WiFi 6 y soporte para DDR5' },
            { id: 'MB103', nombre: 'Gigabyte X670 Aorus Elite AX', precio: '289', marca: 'Gigabyte', descripcion: 'Placa base AM5 con PCIe 5.0 y DDR5' },
            { id: 'MB104', nombre: 'ASRock B550M Steel Legend', precio: '149', marca: 'ASRock', descripcion: 'Placa base Micro-ATX con soporte para Ryzen 5000' },
            { id: 'MB105', nombre: 'ASUS TUF Gaming Z590-Plus WiFi', precio: '229', marca: 'ASUS', descripcion: 'Placa base Intel Z590 con WiFi 6 y soporte para 11ª Gen' },
            { id: 'MB106', nombre: 'MSI PRO Z690-A DDR4', precio: '199', marca: 'MSI', descripcion: 'Placa base Intel Z690 con soporte para DDR4 y PCIe 4.0' }
        ]
    };

    // Muestra los productos en sus respectivos contenedores
    mostrarProductos('lista-procesadores', productos.procesadores);
    mostrarProductos('lista-graficas', productos.graficas);
    mostrarProductos('lista-ram', productos.ram);
    mostrarProductos('lista-placasBase', productos.placasBase);

    // Función para mostrar productos en un contenedor específico
    function mostrarProductos(contenedorId, productos) {
        const contenedor = document.getElementById(contenedorId);
        contenedor.innerHTML = '';

        productos.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'producto';
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p><strong>Marca:</strong> ${producto.marca}</p>
                <p><strong>Precio:</strong> €${producto.precio}</p>
                <p class="descripcion">${producto.descripcion}</p>
                <button class="agregar-carrito" 
                        data-id="${producto.id}" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}">
                    Añadir al carrito
                </button>
            `;
            contenedor.appendChild(div);
        });
    }
}
