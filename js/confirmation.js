const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || [];

function displayOrderItems() {
    const orderContainer = document.getElementById('order-confirmation-container');
    orderContainer.innerHTML = ''; 

    if (lastOrder.length === 0) {
        orderContainer.innerHTML = '<p>No items found in your last order.</p>';
    } else {
        lastOrder.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');

            itemElement.innerHTML = `
                <h2>${item.title}</h2>
                <p>Price: $${item.price}</p>
                <img src="${item.image.url}" alt="${item.image.alt}" class="order-image">
            `;

            orderContainer.appendChild(itemElement);
        });
    }
}
displayOrderItems();