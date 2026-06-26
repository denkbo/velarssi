


    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let envioGratis = 50;
    let envioCosto = 4.95;

    updateCartCount();
    renderCart();


    function addToCart(nombre, precio, boton) {
        let producto = boton.parentElement;
        let talla = producto.querySelector(".talla").value;

        cart.push({ nombre, precio, talla });
        document.getElementById("contador1").innerText = cart.length;
        document.getElementById("contador2").innerText = cart.length;

        guardarCarrito();
        updateCartCount();
        renderCart();
    }

    function renderCart() {
        let container = document.getElementById("cart-items");
        container.innerHTML = "";
        let total = 0;

        cart.forEach((item, i) => {
            total += item.precio;

            container.innerHTML += `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.talla}</td>
            <td>${item.precio}€</td>
            <td>
                <img src="img/trash.svg" onclick="removeItem(${i})">
            </td>
        </tr>
        `;
        });

        if (total >= envioGratis) {
            document.getElementById("envio").innerHTML = "🚚 Envío GRATIS";
        } else if (total > 0) {
            document.getElementById("envio").innerHTML =
                `Envío ${envioCosto}€ (gratis desde ${envioGratis}€)`;
            total += envioCosto;
        } else {
            document.getElementById("envio").innerHTML = "";
        }

        document.getElementById("total").innerText = total.toFixed(2);
    }

    function removeItem(i) {
        cart.splice(i, 1);
        guardarCarrito();
        updateCartCount();
        renderCart();
    }


    function checkout() {
        if (cart.length == 0) {
            alert("Carrito vacío");
            return;
        }

        let total = document.getElementById("total").innerText;

        // 🔴 TU LINK REAL STRIPE
        window.location.href = "TU_LINK_STRIPE_AQUI";
    }
    function toggleMenu() {
        let menu = document.getElementById("menuMovil");
        let carrito = document.getElementById("carrito");
        let overlay = document.getElementById("overlay");

        menu.classList.toggle("abierto");

        // cerrar carrito si estaba abierto
        carrito.classList.remove("abierto");

        // activar overlay si menú abierto
        if (menu.classList.contains("abierto")) {
            overlay.classList.add("activo");
        } else {
            overlay.classList.remove("activo");
        }
    }


    function toggleCart() {
        let carrito = document.getElementById("carrito");
        let menu = document.getElementById("menuMovil");
        let overlay = document.getElementById("overlay");

        carrito.classList.toggle("abierto");

        // cerrar menú si estaba abierto
        menu.classList.remove("abierto");

        // activar overlay si carrito abierto
        if (carrito.classList.contains("abierto")) {
            overlay.classList.add("activo");
        } else {
            overlay.classList.remove("activo");
        }
    }

    function cerrarTodo() {
        document.getElementById("menuMovil")?.classList.remove("abierto");
        document.getElementById("carrito")?.classList.remove("abierto");
        document.getElementById("overlay")?.classList.remove("activo");
    }
    function guardarCarrito() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        document.getElementById("contador1").innerText = cart.length;
        document.getElementById("contador2").innerText = cart.length;
    }
