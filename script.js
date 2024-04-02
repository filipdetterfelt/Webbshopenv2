//Lista till shopingcart
const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const counter = document.getElementById('counter');
//var totalPriceList = [];
if (shoppingCart.length <= 0) {
    counter.style.display = 'none'
} else {
    counter.textContent = shoppingCart.length
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error + "Fetch has failed")
    }
}

const productList = await fetchProducts()

async function createCardTemplate() {
    try {
        const response = await fetch('./card.html');
        const template = await response.text();
        console.log('template created')
        return template;
    } catch (error) {
        console.error("Failed to fetch card template:", error);
        return null;
    }
}

async function createCard() {
    const cardTemplate = await createCardTemplate();
    if (!cardTemplate) {
        console.error("Card template not available");
        return;
    }

    //let click = 0

    productList.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = cardTemplate;

        card.querySelector('.card-img-top').src = product.image;
        card.querySelector('.card-title').textContent = product.title;
        card.querySelector('.card-price').textContent = `$${product.price}` ;
        
        const cardButton = card.querySelector('.card-button');
        cardButton.setAttribute('buttonid', product.id);

        const aboutCardButton = card.querySelector('.about-card-button');
        

        cardButton.addEventListener('click', () => {
            /*console.log('hello3')
            const productForm = document.querySelector('.product-info');
        
            productForm.style.display = "none";
            productInfo(product.image, 
                product.title, 
                product.description, 
                `Price: $${product.price}`, 
                product.id);
            console.log(cardButton.getAttribute('buttonid'))*/

            const buyButton = document.querySelector('.buy-button')
            buyButton.setAttribute('buyButtonId', product.id)

            // fyller kundvagnen
           /* const kundvagnIcon = document.getElementById('kundvagn-ikon');
            kundvagnIcon.src = './images/cartFull.png';*/
            
            //click++;
            
            //shoppingCart.push(cardButton.getAttribute('buttonid'));
            console.log(shoppingCart);
            addToCart(product.id);
            counter.style.display = 'block';
            const amount = shoppingCart.length
            document.querySelector('#counter').textContent = amount;
            
            

        });

        

        aboutCardButton.addEventListener('click', () => {
            console.log('hello3')
            const productForm = document.querySelector('.product-info');
        
            productForm.style.display = "block";
            productInfo(product.image, 
                product.title, 
                product.description, 
                `Price: $${product.price}`, 
                product.id);
            console.log(cardButton.getAttribute('buttonid'))

            const buyButton = document.querySelector('.buy-button')
            buyButton.setAttribute('buyButtonId', product.id)

            // fyller kundvagnen
           /* const kundvagnIcon = document.getElementById('kundvagn-ikon');
            kundvagnIcon.src = './images/cartFull.png';*/
            
            
        });

        

        document.getElementById("container-cards").appendChild(card.firstChild);

    });
    console.log('cards created')
}

createCard();

//Funktion för att Visa cart
/*function showCart(productId){
    const cartElement = document.querySelector('.cart .col');
    cartElement.innerHTML ='';

    shoppingCart.forEach(productId =>{
       const product = productList.find(item => item.id == productId );
       if (product){
        const titleDiv = document.createElement('<div>');
        titleDiv.textContent = product.title;
        cartElement.appendChild(titleDiv);
       }  
    })
}

//Skapa innehåll i cart
function addCart(){
    const cartElement = document.querySelector('.cart .col');
    cartElement.innerHTML ='';
}*/

/* const buyButton2 = document.querySelector('.buy-button');
buyButton2.addEventListener('click', function(event) {
    event.preventDefault();
    
}); */

const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', function(event) {
    event.preventDefault();

    
    const form = document.querySelector('#kontaktForm')
    const productId = buyButton.getAttribute('buyButtonId');
    addToCart(productId);

    if(!form.checkValidity()) {
        console.log('12')
        const inputs = document.querySelectorAll("input")
        let firstInvalidInput = null;

        for (let input of inputs) {
            if (!input.checkValidity()) {
                firstInvalidInput = input;
                break;
            }
        }

        firstInvalidInput.reportValidity();
        firstInvalidInput = null;
    } else {
        /* const emailInput = document.querySelector('.mail');
        if (!validateEmail(emailInput.value)) {
            alert('Vänligen ange en giltig e-postadress.');
            return;
        } */
        createCustomerList();
        createProductList();
        shoppingCart.push(productList);
        window.location.href = 'order-conf.html';
        

    }
    
});




function productInfo(image, title, desc, price, productId) {
    const productInfo = document.querySelector('.product-info');
    productInfo.querySelector('.card-img-top').src = image;
    productInfo.querySelector('.info-title').textContent = title;
    productInfo.querySelector('.info-desc').textContent = desc;
    productInfo.querySelector('.info-price').textContent = price;

    prodInfo.addEventListener('click',() => localStorage.setItem('title', title));

    const infoButton = productInfo.querySelector('.info-button');
    infoButton.setAttribute('buttonid', productId);
    infoButton.addEventListener('click', () => localStorage.setItem('productId',productId) );
    
}

function createCustomerList(){
    var nameOfCustomer = document.querySelector('.name').value;
    var emailOfCustomer = document.querySelector('.mail').value;
    var phoneOfCustomer = document.querySelector('.phone').value;
    var adressOfCustomer = document.querySelector('.adress').value;
    var zipcodeOfCustomer = document.querySelector('.zipcode').value;
    var cityOfCustomer = document.querySelector('.city').value;
    
    var customerData = {
        Name: nameOfCustomer,
        email: emailOfCustomer,
        phone: phoneOfCustomer,
        address: adressOfCustomer,
        zipcode: zipcodeOfCustomer,
        city: cityOfCustomer
    };

    localStorage.setItem('customerData', JSON.stringify(customerData));
}

function createProductList(){

    const productId = document.querySelector('.buy-button').getAttribute('buyButtonId')

    const product = productList.find(product => product.id === parseInt(productId))
    console.log(product.price)

    var productData = {
        Title: product.title,
        Price: product.price.toString(),
        Articlenumber: product.id.toString()
    }; 

    localStorage.setItem('productData', JSON.stringify(productData));

}

const cancelButton = document.querySelector('.cancel-button')
const prodInfo = document.querySelector('.product-info')
cancelButton.addEventListener('click', function(event){
prodInfo.style.display="none"
});

function addToCart(productId){
   /*  var shopingCart = JSON.parse(localStorage.getItem('shoppingCart')); */
 
     shoppingCart.push(productId.toString());
 
     localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
 }

 function loadCart(){
    const shopingcart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartElement = document.querySelector('.cart');
    cartElement.style.display = 'block';
    
 }

 

document.querySelector('#kundvagn-ikon').addEventListener('click', () => {

    const productSet = new Set(shoppingCart)
    console.log(productSet)
  
    document.querySelector('.cart').style.display = 'block';
    
    var headerPrice = document.querySelector('.totalSum');
    var cartElement = document.querySelector('.cart');
    var cartCenter = document.querySelector('.cart-center');
    cartCenter.innerHTML = "";
    /*cartElement.innerHTML ='';*/

    console.log('Product List:', productList); // Felsökning: Kontrollera productList
    console.log('Shopping Cart:', shoppingCart); 
    var pArtNbr = document.createElement('p');
    
    //pArtNbr.className = 'p-contentcart';

    //var pTitle = document.createElement('p');
    //pTitle.className = 'p-title';
    
    /*for(let i = 0; i < shoppingCart.length; i++ ){
        const prductId = shoppingCart[i];
        pArtNbr.innerHTML += 'Artikelnummer: '+prductId + '<br>';
    }*/

    
    
    /*shoppingCart.forEach(productId => {
        pArtNbr.innerHTML += 'Artikelnummer: '+productId + ' Title: ' + '<br>';
        
    })*/
    
   
    var totalSum =0;
   var totalPriceList = [];
   var headerPrice = [];
    productSet.forEach(productId => {
        const product = productList.find(item => item.id === parseInt(productId));
        console.log('Price: '+product.price+ ' Title: '+ product.title)

        console.log('Product with ID', productId, 'found:', product);
        console.log('Cart Element:', cartElement);
        if (product){
            
            //console.log(`Alla priser: ${totalPriceList}`);

          //  totalSumInCart += product.price;
            const amountInShoppingCart = shoppingCart.filter(id => id === productId).length
           

            var productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');

            var image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;
            image.className = "cart-pic";
            productDiv.appendChild(image);
            

            var title = document.createElement('p');
            title.textContent += product.title ;
            title.className = "cart-title";
            productDiv.appendChild(title);

            console.log(`Shopping cart ${shoppingCart}`);
            

            var amount = document.createElement('p');
            amount.textContent = `Amount: ${amountInShoppingCart}`;
            amount.className = "cart-amount";
            productDiv.appendChild(amount);

            var amount = document.createElement('p');

            var price = document.createElement('p');
            price.textContent = 'Á-Price: $'+product.price;
            price.className ="cart-price d-flex align-items-end";
            productDiv.appendChild(price);
           

           
            

            /*var totalProductSum = document.createElement('p');
            var totalProductSums = cart-amount * cart-price;
            totalProductSum.textContent = `Total price: ${totalProductSums}`;*/
           // totalCartSum = document.textContent = "`Total price: $totalSumInCart`";
            

           /* var plus = document.createElement('img');
            image.src = images/plusic;
            productDiv.appendChild(plus);*/

            
            totalPriceList.push(product.price * amountInShoppingCart);
            cartCenter.appendChild(productDiv);
            totalSum += product.price * amountInShoppingCart
            var totalSumHead = 0;
            totalSumHead += totalSum;
            console.log(`Total sum: ${totalSum}`);
           

            var sum = document.createElement('p');
            sum.textContent = `Total price: $${totalSum}`
            sum.className ="cart-sum";
            productDiv.appendChild(sum);
            
           
            headerPrice.push(totalSum);
            const totalHeaderSum = headerPrice.reduce((total, current) => total + current, 0);
            console.log(`listan med alla priser är ${headerPrice}`);
           

            
            totalSum = 0;
           
            console.log(`Det totala priset är ${totalHeaderSum}`);
            var changeSum = document.querySelector('.totalSum');
            changeSum.textContent = `Total Price: $${totalHeaderSum}`;
        }

        
    });

    

    
    

    //document.querySelector('.cart').appendChild(pArtNbr);
    //document.querySelector('.cart').appendChild(pTitle);
});




//Stänga ner varukorgen
document.querySelector('.kryss').addEventListener('click', ()=>{
    
    const cart = document.querySelector('.cart');
    cart.style.display ='none';
    const cartCenter = document.querySelector('.cart-center');
    

    
})

/*document.querySelector('.kryss').addEventListener('click', () =>{
    shoppingCart.length = 0;

})*/



