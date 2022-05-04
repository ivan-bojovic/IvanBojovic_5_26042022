//Récupérer le panier l’array localStorage//
let products = JSON.parse(localStorage.getItem("produits"))
console.table(products)

productSelect()

//Récupérer et utiliser l'ID qui correspond a l'article selectionné//
let params = (new URL(document.location)).searchParams
const articleId = params.get("id")

async function getElementById (articleId) {
     return fetch("http://localhost:3000/api/products//" + articleId)
    .then((res) =>{
        return res.json()
    })
    .catch ((error) => {
        alert('error')
    })  
}

//Récuperer les données pour injecter dans l html//
async function productSelect () {
    for (let article in products) {
        const product = await getElementById(products[article].articleId)

        //Balise article//
        let newArticle = document.createElement("article")
        document.querySelector("#cart__items").appendChild(newArticle)
        newArticle.classList.add("cart__item")
        newArticle.setAttribute("data-id", products[article].articleId)
        newArticle.setAttribute("data-color", products[article].articleColor)

        //Div img//
        let newDiv = document.createElement("div")
        newArticle.appendChild(newDiv)
        newDiv.classList.add("cart__item__img")

        //Img//
        let newImg = document.createElement("img")
        newDiv.appendChild(newImg)
        newImg.src = product.imageUrl
        newImg.alt = product.altTxt

        //Div cart__item__content//
        let divContent = document.createElement("div")
        newArticle.appendChild(divContent)
        divContent.classList.add("cart__item__content")

        //Div cart__item__content__description//
        let divDescription = document.createElement("div")
        divContent.appendChild(divDescription)
        divDescription.classList.add("cart__item__content__description")

        let newTitle = document.createElement("h2")
        divDescription.appendChild(newTitle)
        newTitle.innerHTML = product.name

        let newColor = document.createElement("p")
        divDescription.appendChild(newColor)
        newColor.innerHTML = products[article].articleColor

        let newPrice = document.createElement("p")
        divDescription.appendChild(newPrice)
        newPrice.innerHTML = product.price + ",00 €"

        //Div cart__item__content__settings//
        let divSettings = document.createElement("div")
        divContent.appendChild(divSettings)
        divSettings.classList.add("cart__item__content__settings")

        //Div cart__item__content__settings__quantity//
        let divQuantity = document.createElement("div")
        divSettings.appendChild(divQuantity)
        divQuantity.classList.add("cart__item__content__settings__quantity")

        //Paragraphe Qté//
        let pQte = document.createElement("p")
        divQuantity.appendChild(pQte)
        pQte.innerHTML = "Qté : "

        //Input Quantity//
        let quantity = document.createElement("input")
        divQuantity.appendChild(quantity)
        quantity.setAttribute("type", "number")
        quantity.classList.add("itemQuantity")
        quantity.setAttribute("name", "itemQuantity")
        quantity.setAttribute("min", "1")
        quantity.setAttribute("max", "100")
        quantity.setAttribute("value", "quantity.value")
        quantity.value = products[article].articleQuantity

        //Div cart__item__content__settings__delete//
        let divDelete = document.createElement("div")
        divSettings.appendChild(divDelete)
        divDelete.classList.add("cart__item__content__settings__delete")

        //Supprimer le produit//
        let pDelete = document.createElement("p")
        divDelete.appendChild(pDelete)
        pDelete.innerHTML = "Supprimer"
    }
}
