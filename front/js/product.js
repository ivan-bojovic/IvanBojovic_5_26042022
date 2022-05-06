//Récupérer et utiliser l'ID de l'URL qui correspond a l'article selectionné//
const productId = new URLSearchParams(location.search);
const id = productId.get("id");


//Requête fetch de l'URL de l'API + ID//
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    //Selectionner et enregistrer le produit//
    .then((product) => {
        selectProduct(product)
        recordProduct(product)
    })
    //Gestion en cas d'erreur//
    .catch((error) => {
        alert('error')
    })

    //Répartition des données de l'API dans le DOM//
    let selectProduct = (product) => {

        //Récuperer les données pour injecter dans l html//
        document.querySelector("title").innerText = product.name
        document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        document.querySelector("#title").innerText = product.name
        document.querySelector("#price").innerText = product.price
        document.querySelector("#description").innerText = product.description
        document.querySelector("#colors")
            for (let i=0; i < product.colors.length; i++) {
                let option = document.createElement("option")
                option.innerText = product.colors [i]
                colors.appendChild(option)
            }
    }

//Confirmer l'ajout du produit au panier//
let toOrder = () => {
    alert("Votre commande est ajoutée au panier")
    window.location.href ="cart.html"
}

//Gestion du panier//
let recordProduct = (product) => {
    const color = document. querySelector("#colors");
    const quantity = document.querySelector("#quantity");

    //Créer un élément button et l'associer à l'ID addToCart//
    const button = document.querySelector("#addToCart");
    
    //Début de la mise en écoute du boutton//
    button.addEventListener("click", (event) => {
        event.preventDefault()
        if (color.value === "" || quantity.value == 0) {
            alert ("Merci d’indiquer la couleur et la quantité")
        }else {
            //Recupération du choix de la couleur et de la quantité//
            let colorChoise = color.value;
            let quantityChoice = quantity.value;

        //Valeur des objets dans un listing//
        let listingProducts = {
            articleId: id,
            articleColor: colorChoise,
            articleQuantity: Number(quantityChoice),
        }
        console.log(listingProducts)

        //Créer le localstorage//
        let products = JSON.parse(localStorage.getItem("produits"))

        //Si le produit commandé n'est pas dans le panier//
        if (products) {

            //verification si l'article n'existe dèjà dans le panier//
            const getProduct = products.find (
                (element) => element.articleId == listingProducts.articleId && element.articleColor == listingProducts.articleColor)

        //S'il est déjà present, ajouter seulement la quantité//
        if (getProduct) {
            getProduct.articleQuantity = Number(getProduct.articleQuantity) + Number(listingProducts.articleQuantity)
            localStorage.setItem ("produits", JSON.stringify(products))
            toOrder()
        
        } else {

        //J’ajoute un autre produit au tableau//
            products.push(listingProducts)
            localStorage.setItem("produits", JSON.stringify(products))
            toOrder()
            console.log(products)
        }}

        //Si le panier est vide//
        else {
            products = []
            products.push(listingProducts)
            localStorage.setItem("produits", JSON.stringify(products))
            toOrder ()
            console.log(products)
        }}
    })
}

