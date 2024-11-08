const apiLink = 'https://v2.api.noroff.dev/gamehub';
let allProducts = []; 

async function getData() {
    const loadingStyle = document.getElementById('loading');
    const errorStyle = document.getElementById('error');

    loadingStyle.style.display = 'block';
    errorStyle.style.display = 'none';

    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const dataRecieve = await response.json();
        allProducts = dataRecieve.data;  
        displayProducts(allProducts);
    } catch (error) {
        console.error("An error occurred", error);
        errorStyle.style.display = 'block';
    } finally {
        loadingStyle.style.display = 'none';
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';  

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');  

        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <p class="product-description">${product.description}</p>
            <p class="change">Genre: ${product.genre}</p>
            <p class="change">Released: ${product.released}</p>
            <p class="change">Age Rating: ${product.ageRating}</p>
            <p class="change">Price: $${product.price}</p>
            <p class="change">Discounted Price: $${product.discountedPrice} ${product.onSale ? '(On Sale!)' : ''}</p>
            <img src="${product.image.url}" alt="${product.image.alt}">
            <p class="tag">Tags: ${product.tags.join(', ')}</p>
            <p class="tag">Favorite: ${product.favorite ? 'Yes' : 'No'}</p>
            <button class="view-details" onclick="location.href='product-detail.html?id=${product.id}'">View Details</button>
        `;

        container.appendChild(productDiv);
    });
}

document.getElementById("button-filter").addEventListener("click", function() {
    const category = document.getElementById("genre").value;
    const ageRating = document.getElementById("age-rate").value;
    filterProducts(category, ageRating);
});

function filterProducts(category, ageRating) {
    
    const filteredProducts = allProducts.filter(function(product) {
        const categoryMatch = !category || category === 'all' || product.genre.toLowerCase() === category.toLowerCase();
        const ageRatingMatch = !ageRating || ageRating === 'all' || product.ageRating.toLowerCase() === ageRating.toLowerCase();
        return categoryMatch && ageRatingMatch;
    });

    
    displayProducts(filteredProducts);
}

document.getElementById("hero-button").addEventListener("click", function() {
    const genreButton = document.getElementById("genre");

    genreButton.scrollIntoView({
    behavior: 'smooth',
    block: 'center', 

});
    
});

getData();