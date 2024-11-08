let shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    checkoutItemsContainer.innerHTML = ''; 

    if (shoppingCart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        shoppingCart.forEach((item, index) => {
            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout-item');

            checkoutItem.innerHTML = `
                <h2>${item.title}</h2>
                <p>Price: $${item.price}</p>
                <img src="${item.image.url}" alt="${item.image.alt}" class="checkout-image">
                <button onclick="removeItemFromCheckout(${index})">Remove</button>
            `;
            checkoutItemsContainer.appendChild(checkoutItem);
        });
    }
}
function removeItemFromCheckout(index) {
    shoppingCart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(shoppingCart)); 
    displayCheckoutItems(); 
}
document.getElementById('confirm-purchase').addEventListener('click', () => {
    if (shoppingCart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    // Save the current cart to 'lastOrder' for the confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(shoppingCart));
    // Clear the cart after saving it for confirmation
    shoppingCart = []; 
    localStorage.removeItem('cart'); 
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
});
displayCheckoutItems();