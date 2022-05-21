
var accep=`application/json`
const headers= {
         Accept: `Bearer ${accep}`
}
   
// var myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");
var baseurl="https://e-commerce-api-academlo.herokuapp.com/api"
let editID=null
function printProduct(products){
    const conten= document.getElementById("conten_products");

    let html="";
    for(let i=0;i<products.length;i++){

        html+= 
        `
        <div class="wrapper__product">
          <div class="wrapper__product-img">
            <img src="${products[i].image}" class="br" alt="${products[i].name}" class="wrapper__product-img-item">
          </div>
          <div class="wrapper__product-content">
            <h3 class="wrapper__product-title">${products[i].name}</h3>
            <p class="wrapper__product-text">
            ${products[i].description}
            </p>
            <div class="wrapper__product-btn">
            <span class="wrapper__product-btn-text">$ ${products[i].price}</span>
              <button class="wrapper__product-btn-item" data-id="${products[i].id}">
                <i class='bx bx-shopping-bag'></i>
                <span class="wrapper__product-btn-text">Add to Cart</span>
              </button>
              <button onclick="delateProducts(${products[i].id})" >Eliminar articulo</button>
        <button onclick="editProducts(${products[i].id})" >Editar producto</button>
            </div>
          </div>
          </div>
        `
        // `<div class="espacio_celda_7 la">
        // <div "><img src=${products[i].image} class="ima"></div>
        // <div><h3>${products[i].name}</h3></div>
        // <div>${products[i].price}</div>
        // <button onclick="delateProducts(${products[i].id})" >Eliminar articulo</button>
        // <button onclick="editProducts(${products[i].id})" >Editar producto</button>
        // <button onclick="editProducts(${products[i].id})" >agregar al carrito</button>
        // </div>`

    conten.innerHTML=html
    }
}


function getProducts(){

    axios.get("https://e-commerce-api-academlo.herokuapp.com/api/products")
    .then(function (response){

    
         const products= response.data;
        printProduct(products);}
    )
    .catch(function(error){
        console.log()
    }
    )
}

getProducts()



function creatProducts(){
    const newProduct={
        image: document.getElementById("URLnew").value,
        name: document.getElementById("nameNew").value,
        price: document.getElementById("priceNew").value
    };
    axios.post("https://e-commerce-api-academlo.herokuapp.com/api/products",newProduct,{headers:headers})
    .then(function (response){
       console.log(response);
       alert("Articulo creado con exito");
       getProducts();
    }
    )
    .catch(function(response){
        console.log("hola")
        alert("No se pudo crear el articulo")
    }
    )
}

function delateProducts(id){
    let confirmation=confirm("¿Estas seguro de eliminar este articulo?")
    if(!confirmation){
        return 
    }
 
    axios.delete(`${baseurl}/products/${id}`)
    
    .then(function (response){
        console.log(response)
        getProducts()
        alert("Articulo eliminado")
        
     }
     )
     .catch(function(rsp){
         console.log("hola")
         alert("No se pudo crear el articulo")
     }
     )
}


function editProducts(id){
    axios.get(`${baseurl}/products/${id}`)
    .then(function(response){
        const Product=response.data
        editID=id
        document.getElementById("URL").value=Product.image
        document.getElementById("name").value=Product.name
        document.getElementById("Price").value=Product.price

        console.log(response.data)
        
        
    }
     
     )
     .catch(function(rsp){
         console.log("hola")
         alert("No se pudo editar el articulo")
     }
     )
}


function updateProducts(){
    alert("Se edito la tarea")

    const ProductEdit={
        image:document.getElementById("URL").value,
        name:document.getElementById("name").value,
        price:document.getElementById("Price").value
    };
    axios.put(`${baseurl}/products/${editID}`,ProductEdit)
    .then(function (response){
       
       console.log(response);
       alert("Articulo creado con exito");
       getProducts();
    }
    )
    .catch(function(response){
        console.log("hola")
        alert("No se pudo crear el articulo")
    }
    )


}

function creacionProducto(){

}


//codigo jsakdjksajkdljasldjalksjdlkasjdlkjaslkdjlaksjdlkajsldjalsjdljasdlkjaslkdjla
wrapperProducts.insertAdjacentHTML('beforeend', productsHTML)

let cart = []

function find(id) {
  for (let product of getProducts()) {  ///lkasñldkñlaskdñlkasñldkañslkdñlaskdñlkasñlkd
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  cart.push(product)
}

wrapperProducts.addEventListener('click', function (e) {
  if (e.target.closest('.wrapper__product-btn-item')) {
    const id = e.target.closest('.wrapper__product-btn-item').dataset.id
    addToCart(+id)
    renderCart()
  }
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="cart__item">
    <div class="cart__item-img">
    <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="cart__item-content">
    <h3 class="cart__item-title">${product.name}</h3>
    <p class="cart__item-text">
    ${product.description}
    </p>
    <div class="cart__item-btn">
    <span class="cart__item-btn-text">$ ${product.price}</span>
    <button class="cart__item-btn-item" data-id="${product.id}">
    <i class='bx bx-x'></i>
    </button>
    </div>
    </div>
    </div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>No hay productos</p>'
  cartTotal.innerHTML = `$ ${sumTotal()}`
}

renderCart()

function sumTotal() {
  let sum = 0
  for (let product of cart) {
    sum += product.price
  }
  return sum
}

function removeFromCart (id) {
  let newArr = []
  for (let product of cart) {
    if(product.id !== id) {
      newArr.push(product)
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id)
    renderCart()
  }
})

const checkout = document.getElementById('checkout')

checkout.addEventListener('click', function (e) {
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')) {
    alert('Gracias por tu compra')
    cart = []
    renderCart()
  }
})














// function correcto(){
//     console.log("hola")
// }

// function error(){
//     console.log("error")
// }

// function getProducts(){
// axios.get('https://e-commerce-api-academ.herokuapp.com/api/products')
// .then(function (response) {
//     const tasks = response.data;
//     printTasks(tasks);
// })
// .catch(function (error) {
//     console.log(error);
// })
// }

// function printTasks(tasks) {
//     // Identificar el contenedor
//     const container = document.getElementById('tasks-container');
//     // Generar el HTML
//     let html = '';
//     for(let i = 0; i < tasks.length; i++) {
//         html += `<div class="col-md-6 col-lg-4 mt-3">
//                     <div class="card">
//                         <div class="card-body">
//                             <h5 class="card-title">${tasks[i].name}</h5>
//                             <p class="card-text">${tasks[i].price}</p>
//                             <div class="text-end">
//                                 <button class="btn btn-danger" onclick="deleteTask(${tasks[i].id})">
//                                     <i class="fas fa-trash-alt"></i>
//                                 </button>
//                                 <button class="btn btn-primary" onclick="editTask(${tasks[i].id})">
//                                     <i class="fas fa-pen"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`
//     }
//     // Imprimir el HTML
//     container.innerHTML = html;
// }
