//Lista till shopingcart
const shoppingCart = new Array()

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

    let click = 0

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
            
            click++;
            document.querySelector('#counter').textContent = (click);
            shoppingCart.push(cardButton.getAttribute('buttonid'));
            console.log(shoppingCart);
            addToCart(product.id);
            
            

        });

        function addToCart(productId){
           var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        
            shoppingCart.push(productId);
        
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }

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


document.querySelector('#kundvagn-ikon').addEventListener('click', () =>{
  
    document.querySelector('.cart').style.display = 'block';
    
    var cartElement = document.querySelector('.cart');
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
    
    
    shoppingCart.forEach(productId => {
        const product = productList.find(item => item.id === parseInt(productId));
        console.log('Price: '+product.price+ ' Title: '+ product.title)

        console.log('Product with ID', productId, 'found:', product);
        console.log('Cart Element:', cartElement);
        if (product){
            var productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');

            var image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;
            productDiv.appendChild(image);

            var title = document.createElement('p');
            title.textContent += 'Title: '+ product.title;
            productDiv.appendChild(title);

            var price = document.createElement('p');
            price.textContent = 'Price: $'+product.price;
            productDiv.appendChild(price);

            
            

            cartElement.appendChild(productDiv);
            
        }

        
    });

    

    
    

    //document.querySelector('.cart').appendChild(pArtNbr);
    //document.querySelector('.cart').appendChild(pTitle);
});


//Stänga ner varukorgen
document.querySelector('.kryss').addEventListener('click', ()=>{
    
    document.querySelector('.cart').style.display ='none';
    
})



