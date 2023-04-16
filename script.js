const divBody = document.querySelector('.divBody')
//const divBienvenida = document.querySelector('.divBienvenida')

const listaProductos = async () => {
    const listaBack = await fetch('https://fakestoreapi.com/products')
    const listaJson = await listaBack.json()
    return listaJson
}

// console.log(listaProductos())

const cardProductos = async () => {
    const productos = await listaProductos()
    productos.forEach((e) => {
        const { id, title, price, category, image } = e
        divBody.innerHTML +=`
        <div class="bienVenida">
        <img src=${image} class = "img">
        <div class = "texto">
        <p class = "title">${title}</p>
        <p class = "price">${price}</p>
        <p class = "category">${category}</p>
        </div>
        <div class = "botonera">
        <button id = ${id} onclick = "agregar"(${id})>Comprar</>
        <button id = ${id} onclick = "Quitar" (${id})>Quitar</>
        

         
        
        </div>
        
        `
           
    });


}
cardProductos()