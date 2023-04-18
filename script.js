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



const divBody = document.getElementById('divBody')
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
        <div class=" movie with-border espejo ">
        <img src=${image} class = "img movie-poster">
        <div class = "texto">
        <p class = "title">${title}</p>
        <p class = "price">${price}</p>
        <p class = "category">${category}</p>
        </div>
        <div class = "botonera">
        <button id = ${id} class = "btnCompra input1" onclick="agregar(${id})">Comprar</button>
        <button id = ${id} class = "btnCancela input1" onclick="quitar(${id})">Quitar</button>        
        
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
            // advertenciaTres()


        })


    } else {
        buscarEnCarrito.cantidad++

    }
    advertenciaTres()
    console.log(carrito)

}


const quitar = (id) => {
    const buscarEnCarrito = carrito.find((prod) => prod.id === id)

    if (!buscarEnCarrito) {
        advertenciaDos()
    } else {
        if (buscarEnCarrito.cantidad === 1) {
            carrito = carrito.filter((q) => q.id !== id)
        } else {
            buscarEnCarrito.cantidad--
            console.log(carrito)
        }
        advertenciaUno()


    }
    console.log(carrito)




}

const compra = document.getElementById('confirmaCarrito')
compra.onclick = () => {


    let totalCompra = 0
    carrito.forEach(e => {
        totalCompra += e.cantidad * e.price


        Swal.fire({
            html: `<table><thead><tr>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Total</th>
        </tr></thead>
        <tbody><tr>
        <td>${e.title}</td>
        <td>${e.cantidad}</td>
        <td>${totalCompra}</td>
        </tr></tbody></table>`,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `

        })

    })


}
const advertenciaTres = () => {
    Toastify({
        text: "Producto agregado.",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

}
const advertenciaDos = () => {
    Toastify({
        text: "No posee este articulo en su carrito.",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

}

const advertenciaUno = () => {
    Toastify({
        text: "Articulo eliminado.",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

}



