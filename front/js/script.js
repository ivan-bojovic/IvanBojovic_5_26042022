//Récuperation de produits d'API//
fetch("http://localhost:3000/api/products")
    .then((res) => {
        return res.json();
    })
    //Récupère la liste des produits//
    .then((products) => {
        console.log(products)
    //Boucle pour tous les produits//
    for (i = 0; i < products.length; i++) {
        console.log(products[i]);
        //Ajouter dans le html avec le getElementById le html suivant//
        document.getElementById("items").innerHTML += 
        `<a href="./product.html?id=${products[i]._id}">
            <article>
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                <h3 class="productName">${products[i].name}</h3>
                <p class="productDescription">${products[i].description}</p>
            </article>
        </a>`;
    }   
})
    //Gestion en cas d'erreur//
    .catch((error) => {
        alert('error')
    });