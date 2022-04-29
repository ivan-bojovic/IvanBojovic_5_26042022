//Récupérer et utiliser l'ID de l'URL qui correspond a l'article selectionné//
const product = new URLSearchParams(location.search);
const id = product.get("id");
//Requête fetch de l'URL de l'API + ID//
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    //Selectionner et enregistrer le produit//
    .then((product) => {
        selectionProduct(product)
    })
    //Gestion en cas d'erreur//
    .catch((error) => {
        alert('error')
    })
    //Répartition des données de l'API dans le DOM//
    let selectionProduct = (product) => {
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
        console.log(product)
    }
    