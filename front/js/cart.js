//Récupérer le panier l’array localStorage//
let products = JSON.parse(localStorage.getItem("produits"))
console.table(products)


//Récupérer et utiliser l'ID qui correspond a l'article selectionné//
let params = (new URL(document.location)).searchParams
const articleId = params.get("id")

async function elementId(articleId) {
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
        const product = await elementId(products[article].articleId)

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
        pDelete.classList.add("deleteItem")
        pDelete.innerHTML = "Supprimer"
    }
}
productSelect ()

//Calculer le total de la quantité//
async function getTotals () {

    let totalQty = 0
    for (let article in products) {
        totalQty += Number(products[article].articleQuantity)
        let quantityTotal = document.getElementById("totalQuantity")
        quantityTotal.innerHTML = totalQty
    }

    //Calcule la totalité du prix//
    let totalPrice = 0
    const priceTotal = document.getElementById("totalPrice")
    for (let article in products) {
        const product = await elementId(products[article].articleId)
        const productsPrice = Number(product.price * products[article].articleQuantity)
        totalPrice += productsPrice
        priceTotal.innerHTML = totalPrice
    }
    modifyQuantity()
    productDelete()
}
getTotals ()

//Modification de la quantité//
function modifyQuantity() {

    let inputQuantity = document.querySelectorAll(".itemQuantity")
    for (let i =0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener("change", (e) => {
            e.preventDefault()

            let inputValue = Number(e.target.value)
            let dataId = products[i].articleId
            let dataColor = products[i].articleColor

            if(products) {
                let result = products.find((total) => total.articleId === dataId && total.articleColor === dataColor)
            
            if(result) {
                products[i].articleQuantity = inputValue
                localStorage.setItem("produits", JSON.stringify(products))
            }}
            //Reload la page pour mettre a jour le total//
            location.reload()
        })
    }
}
modifyQuantity()

//Suppression d'un produit dans le panier//
function productDelete () {

    let buttonDelete = document.querySelectorAll(".deleteItem")
    for (let i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener("click", (e) => {
            e.preventDefault()

            let deleteId = products[i].articleId
            let deleteColor = products[i].articleColor
    
            products = products.filter((element) => element.articleId !== deleteId || element.articleColor !== deleteColor)

            alert("Article supprimé")            
            localStorage.setItem("produits", JSON.stringify(products))
            location.reload()            
        })
    }
}
productDelete()
