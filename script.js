//Elements references 
const cartContainer = document.getElementById("cartContainer");
const productContainer = document.getElementById("productContainer");
const feedbackElement = document.getElementById("feedback");
const clearCartBtn = document.getElementById("clearCart");
const sortByPriceBtn = document.getElementById("sortByPrice");

//default products
const products = [
    {
        id: 1,
        name: "Laptop",
        Price: 60000,
    },
    {
        id: 2,
        name: "Phone",
        Price: 50000,
    },
    {
        id: 3,
        name: "Tablet",
        Price: 45000,
    },
    {
        id: 4,
        name: "HeadPhones",
        Price: 5000,
    },
    {
        id: 5,
        name: "Smartwatch",
        Price: 20000,
    },
];

//empty cart
const cart = [];

clearCartBtn.addEventListener("click", clearCart);

sortByPriceBtn.addEventListener("click", sortByPrice);

function clearCart() {
    cart.length = 0;
    renderCartDetails();
    updateUserFeedback('cart is cleared', "success");
}

function sortByPrice() {
    cart.sort(function (item1, item2) {
        return item1.Price - item2.Price;
    });
    renderCartDetails();
}

function renderProductDetails() {
    products.forEach(function (product) {
        //     const productRow = `
        //     <div class="product-row">
        //       <p>${product.name} - Rs. ${product.Price}</P>
        //       <button>Add to cart</button>
        //     </div>
        //     `;
        //     productsContainer.insertAdjacentHTML("beforeend", productRow);
         
        
        const divElement = document.createElement("div");
        divElement.className = "product-row";
        divElement.innerHTML = `
        <P>${product.name} - Rs. ${product.Price}</P>
        <button onclick="addToCart(${product.id})">Add to cart</button>
        `;
         productsContainer.appendChild(divElement);
        });        
}


function renderCartDetails() {  
    cartContainer.innerHTML = " ";
    cart.forEach(function(product){
        const { id, name, Price } = product;
        const cartItemRow = `
         <div class="product-row">
                <p>${name} - Rs. ${Price}</p>
                <button onclick="removeFromCart(${id})">Remove</button>
             </div> 
        `;
           cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
    });

    // let totalPrice = 0;
    console.log("cart", cart);
    // for(let i = 0; i<cart.length; i++){
    //     totalPrice = totalPrice + cart[i].price
    // }

     const totalPrice = cart.reduce(function (acc, curproduct){
        return acc + curproduct.Price;
    }, 0);

    document.getElementById('totalPrice').textContent = `${totalPrice}`

}

//add to cart
function addToCart(id){
    // console.log("add to cart clicked", id);
    //checks if the product is available in the cart.
    const isProductAvailable = cart.some((product) =>  product.id === id);
    if (isProductAvailable){
        updateUserFeedback(`Item is already added to the cart`, "error");
        return;
    } 

    const productToAdd = products.find(function(product){
        return product.id == id;
    });
    // console.log(productToAdd);
    cart.push(productToAdd);
    console.log(cart);
    renderCartDetails()
    
    //  feedbackElement.textContent = `${name} is added to the cart`;
    updateUserFeedback(`${productToAdd.name} is added to the cart`, "success");
}

function removeFromCart(id) {
    console.log(id);
    const product = cart.find((product) => product.id===id);
    // const updatedCart = cart.filter(function(product) {
    //    return  product.id !== id;
    // });


    const productIndex = cart.findIndex((product) => product.id === id);
    cart.splice(productIndex, 1);
    // console.log(updatedCart);
    // cart = updatedCart;
    updateUserFeedback(`${product.name} is removed from the cart`,"error");
    renderCartDetails();
}

//used to reset the timer (user feedback)
let timerId;
function updateUserFeedback(msg, type) {
    clearTimeout(timerId);
    feedbackElement.style.display = "block";
    //type - success(green), error(red)
    if(type === 'success'){
        feedbackElement.style.backgroundColor = 'green'
    }
    if(type == 'error'){
        feedbackElement.style.backgroundColor = 'red'
    }
    feedbackElement.textContent = msg;

      timerId = setTimeout(function(){
          feedbackElement.style.display = "none";
    },3000);
}

//rendering products
renderProductDetails();