// ===============================
// ABRIR / CERRAR MODAL
// ===============================
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

// ===============================
// GUARDAR PRODUCCIÓN (POST)
// ===============================
async function guardarPelicula() {

    const datos = {
        titulo: document.getElementById("titulo").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        año: parseInt(document.getElementById("anio").value),
        idioma: document.getElementById("idioma").value.trim(),
        imagen: document.getElementById("imagen").value.trim(),
        tipo: document.getElementById("tipo").value
    };

    if (!datos.titulo || !datos.genero || !datos.año || !datos.idioma) {
        alert("Completa todos los campos");
        return;
    }

    await fetch("http://localhost:3000/api/netflix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    cerrarModal();
    cargarProducciones();
}

// ===============================
// CARGAR PRODUCCIONES (GET) CON ELIMINAR
// ===============================
async function cargarProducciones() {

    const contPeliculas = document.getElementById("lista-peliculas");
    const contSeries = document.getElementById("lista-series");
    const contAnimes = document.getElementById("lista-animes");

    contPeliculas.innerHTML = "";
    contSeries.innerHTML = "";
    contAnimes.innerHTML = "";

    const res = await fetch("http://localhost:3000/api/netflix");
    const data = await res.json();
    const lista = data.producciones;

    if (!lista || lista.length === 0) {
        contPeliculas.innerHTML = "<p>No hay producciones registradas</p>";
        return;
    }

    lista.forEach(p => {

        const img = p.imagen && p.imagen !== "" 
            ? p.imagen 
            : "https://via.placeholder.com/300x450?text=Sin+Imagen";

        const card = `
            <div class="card">
                <img src="${img}" alt="${p.titulo}">
                <h3>${p.titulo}</h3>
                <p>${p.genero} • ${p.año}</p>
                <button class="btn-delete" onclick="eliminarProduccion('${p._id}')">Eliminar</button>
            </div>
        `;

        const tipo = p.tipo || "pelicula";

        if (tipo === "pelicula") contPeliculas.innerHTML += card;
        if (tipo === "serie") contSeries.innerHTML += card;
        if (tipo === "anime") contAnimes.innerHTML += card;
    });
}

// ===============================
// ELIMINAR PRODUCCIÓN (DELETE)
// ===============================
async function eliminarProduccion(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar esta producción?");
    if (!confirmar) return;

    await fetch(`http://localhost:3000/api/netflix/${id}`, {
        method: "DELETE"
    });

    cargarProducciones(); // recarga la lista después de eliminar
}

// ===============================
// BUSCAR PELÍCULA
// ===============================
function buscarPelicula() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = titulo.includes(texto) ? "block" : "none";
    });
}

// Ejecución inicial
cargarProducciones();
