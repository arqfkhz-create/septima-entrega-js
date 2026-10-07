class Ingrediente {
    constructor(nombre, costoPorKilo, cantidadReceta){
        this.nombre = nombre;
        this.costoPorKilo = costoPorKilo;
        this.cantidadReceta = cantidadReceta;
    }

    calcularCosto(){
        const costoPorGramo = this.costoPorKilo / 1000;
        return costoPorGramo * this.cantidadReceta;
    }
}

const listaIngredientes = []; //creamos array donde guardar los ingredientes

const form = document.getElementById('formulario');
const boton = document.querySelector(".btn-agregar");
const textoOriginal = boton.textContent;

let temporizadorMensaje;

function mostrarMensaje(texto, tipo) {
    clearTimeout(temporizadorMensaje);
    
    boton.textContent = texto;
    boton.classList.add(tipo);

    temporizadorMensaje = setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.classList.remove("exito", "error");
    }, 2000);
}   

form.addEventListener("submit", function(evento){
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value; 
    const costoPorKilo = parseFloat(document.getElementById("costoPorKilo").value);
    const cantidadReceta = parseFloat(document.getElementById("cantidadReceta").value); 

    if (!nombre || isNaN(costoPorKilo) || isNaN(cantidadReceta)) {
        mostrarMensaje("Completa todos los campos.", "error");
        return;
    }

    const nuevoIngrediente = new Ingrediente(nombre, costoPorKilo, cantidadReceta);
    listaIngredientes.push(nuevoIngrediente);

    mostrarTabla();
    form.reset();
    mostrarMensaje(`${nombre} agregado a la receta.`, "exito");

});

function calcularTotal() {

    return listaIngredientes.reduce((total, ingrediente) => {
        return total + ingrediente.calcularCosto();
    }, 0);
}

function mostrarTabla() {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = ""; // Limpiar el contenido del tbody

    listaIngredientes.forEach(ingrediente => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="p-2 border-b border-gray-200">${ingrediente.nombre}</td>
            <td class="p-2 border-b border-gray-200">${ingrediente.costoPorKilo.toFixed(2)}</td>
            <td class="p-2 border-b border-gray-200">${ingrediente.cantidadReceta}</td>
            <td class="p-2 border-b border-gray-200">${ingrediente.calcularCosto().toFixed(2)}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    const costoTotalResultado = document.getElementById("costoTotal");
    costoTotalResultado.textContent = calcularTotal().toFixed(2);
}

mostrarTabla();

// Evento para limpiar tabla al presionar la tecla "Esc"
document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        if (listaIngredientes.length === 0) {
            mostrarMensaje("La tabla ya está vacía.", "error");
            return;
        }

        if (confirm("¿Estás seguro de que deseas limpiar la tabla y eliminar todos los ingredientes?")) {
            listaIngredientes.length = 0;
            mostrarTabla();
            mostrarMensaje("La tabla y lista de ingredientes limpiados.", "exito");
        }
    }
});
