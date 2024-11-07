const apiLink = 'https://v2.api.noroff.dev/gamehub';
let allProducts = []; 
let shoppingCart = JSON.parse(localStorage.getItem('cart')) || []; 


async function fetchProductDetails() {
    const productId = getProductId(); 

    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const dataRecieve = await response.json();
        allProducts = dataRecieve.data;  

        const product = allProducts.find(p => p.id === productId); 
        if (product) {
            displayProductDetails(product);
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found</p>';
        }
    } catch (error) {
        console.error("An error occurred", error);
    }
}
function getProductId() {
    return new URLSearchParams(window.location.search).get('id'); 
}


function displayProductDetails(product) {
    const container = document.getElementById('product-details');
    container.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Genre: ${product.genre}</p>
        <p>Released: ${product.released}</p>
        <p>Age Rating: ${product.ageRating}</p>
        <p>Price: $${product.price}</p>
        <p>Discounted Price: $${product.discountedPrice} ${product.onSale ? '(On Sale!)' : ''}</p>
        <img src="${product.image.url}" alt="${product.image.alt}">
        
    `;

    
    document.getElementById('add-to-cart-button').addEventListener('click', () => addToCart(product));
}


function addToCart(product) {
    shoppingCart.push(product); 
    localStorage.setItem('cart', JSON.stringify(shoppingCart)); 
    alert(`${product.title} has been added to the cart!`);
    updateCartDisplay(); 
}


function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    if (shoppingCart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('proceed-checkout').classList.add('hidden');
    } else {
        shoppingCart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <p class="cart-style">${item.title} - $${item.price}</p>
                <img src="${item.image.url}" class="image-cart"alt="${item.image.alt}">
                <button onclick="removeFromCart(${index})">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
        document.getElementById('proceed-checkout').classList.remove('hidden');
    }
}


function removeFromCart(index) {
    shoppingCart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(shoppingCart)); 
    updateCartDisplay(); 
}

document.addEventListener('DOMContentLoaded', () => {
    
    const proceedCheckoutButton = document.getElementById('proceed-checkout');

    
    proceedCheckoutButton.addEventListener('click', () => {
        window.location.href = '/checkout/checkout.html'; 
    });
});


fetchProductDetails();
updateCartDisplay(); 