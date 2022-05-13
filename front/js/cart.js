//Récupérer le panier l’array localStorage//
let cartProducts = JSON.parse(localStorage.getItem("produits"))
console.table(cartProducts)


//Récupérer et utiliser l'ID qui correspond a l'article selectionné//
const params = new URLSearchParams(location.search)
const articleId = params.get("id")

async function elementId(articleId) {
    try {
        const res = await fetch("http://localhost:3000/api/products/" + articleId)
        return await res.json()
    }catch (error) {
        alert('error')
    }  
}

//Fonction lancée au lancement de la page//
const launchPage = () => {
    productSelect()
    getTotals()
    modifyQuantity()
    productDelete()
}

launchPage()


//Récuperer les données pour injecter dans l html//
async function productSelect () {

    //Si le localstorage est vide//
    if(cartProducts === null || cartProducts == 0) {
        alert("Le panier est vide! Veuillez s'il vous plaît commander vos produits sur la page d'accueil!")
        
    }else {

        //Si le localstorage contient des produits//
        for (let article in cartProducts) {
            const product = await elementId(cartProducts[article].articleId)

            //Balise article//
            let newArticle = document.createElement("article")
            document.querySelector("#cart__items").appendChild(newArticle)
            newArticle.classList.add("cart__item")
            newArticle.setAttribute("data-id", cartProducts[article].articleId)
            newArticle.setAttribute("data-color", cartProducts[article].articleColor)

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
            newColor.innerHTML = cartProducts[article].articleColor

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
            quantity.value = cartProducts[article].articleQuantity

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
}

//Calculer le total de la quantité//
async function getTotals () {

    let totalQty = 0
    for (let article in cartProducts) {
        totalQty += Number(cartProducts[article].articleQuantity)
        let quantityTotal = document.getElementById("totalQuantity")
        quantityTotal.innerHTML = totalQty
    }

    //Calcule la totalité du prix//
    let totalPrice = 0
    const priceTotal = document.getElementById("totalPrice")
    for (let article in cartProducts) {
        const product = await elementId(cartProducts[article].articleId)
        const productsPrice = Number(product.price * cartProducts[article].articleQuantity)
        totalPrice += productsPrice
        priceTotal.innerHTML = totalPrice
    }
    modifyQuantity()
    productDelete()
}

//Modification de la quantité//
function modifyQuantity() {

    let inputQuantity = document.querySelectorAll(".itemQuantity")
    for (let i =0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener("change", (e) => {
            e.preventDefault()

            let inputValue = Number(e.target.value)
            let dataId = cartProducts[i].articleId
            let dataColor = cartProducts[i].articleColor

            if(cartProducts) {
                let result = cartProducts.find((total) => total.articleId === dataId && total.articleColor === dataColor)
            
            if(result) {
                cartProducts[i].articleQuantity = inputValue
                localStorage.setItem("produits", JSON.stringify(cartProducts))
            }}
            //Reload la page pour mettre a jour le total//
            location.reload()
        })
    }
}

//Suppression d'un produit dans le panier//
function productDelete () {

    let buttonDelete = document.querySelectorAll(".deleteItem")
    for (let i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener("click", (e) => {
            e.preventDefault()

            let deleteId = cartProducts[i].articleId
            let deleteColor = cartProducts[i].articleColor
    
            cartProducts = cartProducts.filter((element) => element.articleId !== deleteId || element.articleColor !== deleteColor)

            alert("Article supprimé")            
            localStorage.setItem("produits", JSON.stringify(cartProducts))
            location.reload()            
        })
    }
}


//Veriffier le formulaire, Regex//
let regexName = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/
let regexAddress = /^[a-z0-9\s,'-]*$/i
let regexEmail = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i

//Récupéraration id des champs de formulaire//
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")

//Firstname//
firstName.addEventListener("input", (e) => {
    e.preventDefault()

    if (regexName.test(firstName.value) == false || firstName.value == "") {
        document.getElementById("firstNameErrorMsg").textContent = "Prénom non valide!"
        return false
    }else {
        document.getElementById("firstNameErrorMsg").textContent = ""
    }
})

//Lastname//
lastName.addEventListener("input", (e) => {
    e.preventDefault()

    if (regexName.test(lastName.value) == false || lastName.value == "") {
        document.getElementById("lastNameErrorMsg").textContent = "Nom non valide!"
        return false
    }else {
        document.getElementById("lastNameErrorMsg").textContent = ""
    }
})

//Address//
address.addEventListener("input", (e) => {
    e.preventDefault()

    if (regexAddress.test(address.value) == false || address.value == "") {
        document.getElementById("addressErrorMsg").textContent = "Adresse non valide!"
        return false
    }else {
        document.getElementById("addressErrorMsg").textContent = ""
    }
})

//City//
city.addEventListener("input", (e) => {
    e.preventDefault()

    if (regexName.test(city.value) == false || city.value == "") {
        document.getElementById("cityErrorMsg").textContent = "Ville non valide!"
        return false
    }else {
        document.getElementById("cityErrorMsg").textContent = ""
    }
})

//Email//
email.addEventListener("input", (e) => {
    e.preventDefault()

    if (regexEmail.test(email.value) == false || email.value == "") {
        document.getElementById("emailErrorMsg").textContent = "Email non valide!"
        return false
    }else {
        document.getElementById("emailErrorMsg").textContent = ""
    }
})

//La methode POST pour envoyer la commande au serveur//
const btnOrder = document.getElementById("order")

//Début de la mise en écoute du boutton//
btnOrder.addEventListener("click", (e) => {
    e.preventDefault()

    //Tableau données de l'utilisateur//
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    }
    if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
    ){
        alert("Coordonnées incomplètes")
    }else {
        //Nouveau tableau uniquement avec les id//
        let products = []
        cartProducts.forEach((order) => {
            products.push(order.articleId)
        })

        let order = { contact, products }
    

        //Appel à l'api pour envoyer les tableaux//
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('orderId', data.orderId)
            document.location.href = "confirmation.html?Id=" + data.orderId
            //Vider local storage//
            localStorage.clear()
        })
        .catch((error) => {
            alert("Merci de bien renseigné le formulaire!")
        })
    }

})
