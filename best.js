import { fetchProducts } from './fetch.js';

const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const productList = await fetchProducts();
const shoppingCartSet = new Set(shoppingCart)
console.log(shoppingCartSet)
console.log(productList)
productList.forEach(product => console.log(typeof product))


    var customerData = JSON.parse(localStorage.getItem('customerData'));
    if (customerData) {
        var bstInfoSite = document.getElementById('beställare');
        for (var key in customerData) {
            if (customerData.hasOwnProperty(key)) {
                var p = document.createElement('p');
                p.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + customerData[key].charAt(0).toUpperCase() + customerData[key].slice(1);
                bstInfoSite.appendChild(p);
            } else {
                console.log("Något gick fel, nyckel saknas")
            }
        }
    } else{
        console.log("Något gick fel, input saknas")
    }


    const filteredProducts = productList.filter(product => 
        shoppingCartSet.has(product.id.toString())
    )

    console.log(filteredProducts)
    var bestProduct = document.querySelector('#bstprodukter');
    for(let product of filteredProducts){
            console.log(typeof product)
            const amount = shoppingCart.filter(id => Number(id) === product.id).length
            const productPrice = product.price * amount;
            var pTagg = document.createElement('p');
            pTagg.className = 'confi-p'
            pTagg.textContent = `Product: ${product.title} Amount: ${amount} Price: ${productPrice} `
            bestProduct.appendChild(pTagg);
    }

    /* var productData = JSON.parse(localStorage.getItem('productData'));
    if(productData){
         var bestProduct = document.querySelector('#bstprodukter');
        for(var key in productData){
            if(productData.hasOwnProperty(key)){
                var pTagg = document.createElement('p');
                pTagg.className = 'confi-p'
                if(key === 'Price') {
                    pTagg.textContent = '$'
                }
                pTagg.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + pTagg.textContent + productData[key].charAt(0).toUpperCase() + productData[key].slice(1);
                bestProduct.appendChild(pTagg);
            } else {
                console.log("Något gick fel, saknar nyckel")
            }
        }
    } else {
        console.log(`Något gick fel, saknar Input`)
    } */

    var datumBstElement = document.getElementById('datumBst')
    datumBstElement.innerHTML = '<h5>Beställningsdatum: ' + genereraDagensDatum() + '</h5>';



/*document.addEventListener('DOMContentLoaded', function(){
    var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if(shoppingCart && shoppingCart.length > 0){
        var cartElement = document.querySelector('.cart .col');
        cartElement.innerHTML = '';

        shoppingCart.forEach(productId => {
            var product = productList.find(item => item.id == productId);

            if (product){
                var productDiv = document.createElement('div');
                productDiv.classList.add('cart-item');
                productDiv.innerHTML = '<div class="product-title">${product.title}</div> <div class="product-price">$${product.price}<7div>';
                cartElement.appendChild(productDiv);
            }
        });
    } else{
        console.log('Varukorgen är tom');
    }
});*/

/*var productData = JSON.parse(localStorage.getItem('productData'));
if(productData){
    var productToCart = document.querySelector('.cart');
    for(var key in productData){
        if(productData.hasOwnProperty(key)){
            var pContent = document.createElement('<p>');
            pContent.className = 'product-cart';
            if(key === 'Price'){
                pContent.textContent ='$';
            }
            pContent.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + pContent.textContent + productData[key].charAt(0).toUpperCase() + productData[key].slice(1);
            productToCart.appendChild(pContent);
        }
        else{
            console.log('Något gick fel, saknar nyckel')
        }
    }
    }else{
        console.log('Något gick fel, saknar input');
    }*/








function genereraDagensDatum() {
    var idag = new Date();
    var dagensDatum = idag.getDate();
    var dagensMånad = idag.getMonth() + 1;
    var dagensÅr = idag.getFullYear();
    var tidPunkt = '['  +idag.getHours() + ': '  + idag.getMinutes() + ': ' + idag.getSeconds() + ']';

    var datumText = dagensDatum + '-' + dagensMånad + '-' + dagensÅr + ' ' + tidPunkt;

    return datumText;
}
