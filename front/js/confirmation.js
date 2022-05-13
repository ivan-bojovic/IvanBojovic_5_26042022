//Récupération orderId//
const params = new URLSearchParams(location.search)
const orderId = params.get("Id")

//Affichage du numéro de commande//
document.getElementById("orderId").textContent = orderId

