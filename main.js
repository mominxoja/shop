const bag =  document.querySelector('header .bag');
const cart =  document.querySelector('.cart');
const closecartBtn = document.querySelector('.closecart');
const contenedorCarrito =  document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#minicart');
const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');

//Body
const courseList = document.querySelector('.cards');
let articulosCarrito = [];
let total = 0;

loadEventListeners()
function loadEventListeners(){
    //Menu right cart
    bag.addEventListener('click', openCart);

    //Close Cart button
    closecartBtn.addEventListener('click', closecart)

    //Agregar curso presionando addToCart
    courseList.addEventListener('click', addCourse);

    //Eliminar articulo
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; // reseteamos carrito
        limpiarHTML()
    })
}

//Open cart
function openCart(e){
    e.preventDefault();
    cart.classList.add('activo')
}
//Close Cart
function closecart(e) {
    e.preventDefault();
    cart.classList.remove('activo')
}

//Btn add course
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('button')) {
        const cursoSelected = e.target.parentElement;
        datosCurso(cursoSelected)
    }
}

//Delete product
function eliminarCurso(e){
    if(e.target.classList.contains('deletebtn')) {
        const cursoID = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID);

        carritoHTML();
    }
}

//Read course data
function datosCurso(curso){

    //Create Object
    const infoCurso = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('.title').textContent,
        price: curso.querySelector('.price').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizar el carrito
        let cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al array carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //console.log(articulosCarrito);
    carritoHTML();
}


//Muestra carrito en el HTML
function carritoHTML() {    
    //Limpiar HTML
    limpiarHTML();
    articulosCarrito.forEach( curso =>{
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.image}" width="100"></td>
            <td>${curso.title}</td>
            <td>${curso.price}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="deletebtn" data-id="${curso.id}">X</a></td>
        `;
        //Agregar en el Tbody
        contenedorCarrito.appendChild(row);

        //Total
        total = curso.cantidad + curso.cantidad
        console.log(total);
    })
    
}

function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}