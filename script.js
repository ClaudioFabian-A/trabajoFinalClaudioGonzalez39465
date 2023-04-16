const formulario = document.getElementById('formulario')
const datoNombre = document.getElementById('nombre')
const datoApellido = document.getElementById('apellido')
const titulo = document.getElementById('titulo')
const divcard = document.getElementById('cardsArticulos')


formulario.onsubmit = (envia) => {
    envia.preventDefault()

    const datosCliente = {
        nombre: datoNombre.value,

    }

    localStorage.setItem('datosDelCliente', JSON.stringify(datosCliente))
    formulario.remove()
    titulo.innerText = `Buen dia ${datoNombre.value}.`



}



const divBody = document.querySelector('.divBody')
//const divBienvenida = document.querySelector('.divBienvenida')

const listaProductos = async () => {
    const listaBack = await fetch('https://fakestoreapi.com/products')
    const listaJson = await listaBack.json()
    return listaJson
}

//console.log(listaProductos())

const cardProductos = async () => {
    const productos = await listaProductos()
    productos.forEach((e) => {
        const { id, title, price, category, image } = e
        divBody.innerHTML += `
        <div class="bienVenida">
        <img src=${image} class = "img">
        <div class = "texto">
        <p class = "title">${title}</p>
        <p class = "price">${price}</p>
        <p class = "category">${category}</p>
        </div>
        <div class = "botonera">
        <button id = ${id} class = "btnCompra" onclick="agregar(${id})">Comprar</button>
        <button id = ${id} class = "btnCancela" onclick="quitar(${id})">Quitar</button>        
        
        </div>
        `
    });


}
cardProductos()

const listaProductosId = async (id) => {
    const lista = await fetch(`https://fakestoreapi.com/products/${id}`)
    const listaJSON = await lista.json()
    //console.log(productJSON)
    return listaJSON
}

const carrito = []

const agregar = async (id) => {
    const agregarC = await listaProductosId(id)
    const buscarEnCarrito = carrito.find((a) => a.id === agregarC.id)
    if (!buscarEnCarrito) {
        carrito.push({
            id: agregarC.id,
            title: agregarC.title,
            price: agregarC.price,
            category: agregarC.category,
            cantidad: 1,
        })

    } else {
        buscarEnCarrito.cantidad++
    }
    console.log(carrito)
      
}  


    const quitar = (id) => {
        const buscarEnCarrito = carrito.find((prod) => prod.id === id)

        if (!buscarEnCarrito) {
            advertenciaUno()
        } else {
            if (buscarEnCarrito.cantidad === 1) {
                carrito = carrito.filter((q) => q.id !== id)
            } else {
                buscarEnCarrito.cantidad--
                console.log(carrito)
            }
            advertenciaDos()

        }
        console.log(carrito)

    }
    

    
const advertenciaDos = () => { alert("hola") }
const advertenciaUno = () => { alert("chau") }




// Swal.fire(`<table><thead><tr>
// <th scope="col">Producto</th>
// <th scope="col">Cantidad</th>
// <th scope="col">Total</th>
// </tr></thead>
// <tbody><tr>
// <td>25</td>
// <td>3</td>
// <td>50</td>
// </tr></tbody></table>`) 

