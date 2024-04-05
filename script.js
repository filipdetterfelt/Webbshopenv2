import { fetchProducts } from "./fetch.js";
//Lista till shopingcart
const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const counter = document.getElementById("counter");
//var totalPriceList = [];

updateCartGui()
if (shoppingCart.length <= 0) {
  counter.style.display = "none";
} else {
  counter.textContent = shoppingCart.length;
}

const productList = await fetchProducts();

async function createCardTemplate() {
  try {
    const response = await fetch("./card.html");
    const template = await response.text();
    console.log("template created");
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

  productList.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = cardTemplate;

    card.querySelector(".card-img-top").src = product.image;
    card.querySelector(".card-title").textContent = product.title;
    card.querySelector(".card-price").textContent = `$${product.price}`;

    const cardButton = card.querySelector(".card-button");
    cardButton.setAttribute("buttonid", product.id);

    const aboutCardButton = card.querySelector(".about-card-button");

    cardButton.addEventListener("click", () => {
      /*console.log('hello3')
            const productForm = document.querySelector('.product-info');
        
            productForm.style.display = "none";
            productInfo(product.image, 
                product.title, 
                product.description, 
                `Price: $${product.price}`, 
                product.id);
            console.log(cardButton.getAttribute('buttonid'))*/

      const buyButton = document.querySelector(".buy-button");
      buyButton.setAttribute("buyButtonId", product.id);

      // fyller kundvagnen
      /* const kundvagnIcon = document.getElementById('kundvagn-ikon');
            kundvagnIcon.src = './images/cartFull.png';*/

      //click++;

      //shoppingCart.push(cardButton.getAttribute('buttonid'));
      console.log(shoppingCart);
      addToCart(product.id);
      counter.style.display = "block";
      const amount = shoppingCart.length;
      document.querySelector("#counter").textContent = amount;
    });

    aboutCardButton.addEventListener("click", () => {
      console.log("hello3");
      const productForm = document.querySelector(".product-info");

      productForm.style.display = "block";
      productInfo(
        product.image,
        product.title,
        product.description,
        `Price: $${product.price}`,
        product.id
      );
      console.log(cardButton.getAttribute("buttonid"));

      const buyButton = document.querySelector(".buy-button");
      buyButton.setAttribute("buyButtonId", product.id);

      // fyller kundvagnen
      /* const kundvagnIcon = document.getElementById('kundvagn-ikon');
            kundvagnIcon.src = './images/cartFull.png';*/
    });

    document.getElementById("container-cards").appendChild(card.firstChild);
  });
  console.log("cards created");
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

const buyButton = document.querySelector(".buy-button");
buyButton.addEventListener("click", function (event) {
  event.preventDefault();

  const form = document.querySelector("#kontaktForm");
  const productId = buyButton.getAttribute("buyButtonId");
  addToCart(productId);

  if (!form.checkValidity()) {
    console.log("12");
    const inputs = document.querySelectorAll("input");
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
    /* shoppingCart.push(productList); */
    window.location.href = "order-conf.html";
  }
});

function productInfo(image, title, desc, price, productId) {
  const productInfo = document.querySelector(".product-info");
  productInfo.querySelector(".card-img-top").src = image;
  productInfo.querySelector(".info-title").textContent = title;
  productInfo.querySelector(".info-desc").textContent = desc;
  productInfo.querySelector(".info-price").textContent = price;

  prodInfo.addEventListener("click", () =>
    localStorage.setItem("title", title)
  );

  const infoButton = productInfo.querySelector(".info-button");
  infoButton.setAttribute("buttonid", productId);
  infoButton.addEventListener("click", () =>
    localStorage.setItem("productId", productId)
  );
}

function createCustomerList() {
  var nameOfCustomer = document.querySelector(".name").value;
  var emailOfCustomer = document.querySelector(".mail").value;
  var phoneOfCustomer = document.querySelector(".phone").value;
  var adressOfCustomer = document.querySelector(".adress").value;
  var zipcodeOfCustomer = document.querySelector(".zipcode").value;
  var cityOfCustomer = document.querySelector(".city").value;

  var customerData = {
    Name: nameOfCustomer,
    email: emailOfCustomer,
    phone: phoneOfCustomer,
    address: adressOfCustomer,
    zipcode: zipcodeOfCustomer,
    city: cityOfCustomer,
  };

  localStorage.setItem("customerData", JSON.stringify(customerData));
}

/* function createProductList() {
  var productsInCart = productList.filter();
  
  localStorage.setItem("productData", JSON.stringify(productData));
} */
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

const cancelButton = document.querySelector(".cancel-button");
const orderForm = document.querySelector(".order-form");
cancelButton.addEventListener("click", function () {
  orderForm.style.display = "none";
});

function addToCart(productId) {
    var shopingCart = JSON.parse(localStorage.getItem('shoppingCart')); 

  shoppingCart.push(productId.toString());

  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function loadCart() {
  const shopingcart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const cartElement = document.querySelector(".cart");
  const cartElementCenter = document.querySelector(".cart-center");
  cartElement.style.display = "block";
}

document.querySelector("#kundvagn-ikon").addEventListener("click", () => {
  const productSet = new Set(shoppingCart);
  console.log(productSet);

  document.querySelector(".cart").style.display = "block";

  var headerPrice = document.querySelector(".totalSum");
  var cartElement = document.querySelector(".cart");
  var cartCenter = document.querySelector(".cart-center");
  cartCenter.innerHTML = "";
  /*cartElement.innerHTML ='';*/

  console.log("Product List:", productList); // Felsökning: Kontrollera productList
  console.log("Shopping Cart:", shoppingCart);
  var pArtNbr = document.createElement("p");

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

  var totalSum = 0;
  var totalPriceList = [];
  var headerPrice = [];
  productSet.forEach((productId) => {
    const product = productList.find((item) => item.id === parseInt(productId));
    console.log("Price: " + product.price + " Title: " + product.title);

    console.log("Product with ID", productId, "found:", product);
    console.log("Cart Element:", cartElement);
    if (product) {
      var showTrashAgain = document.querySelector(".empty-all");
      showTrashAgain.style.display = "block";
      //console.log(`Alla priser: ${totalPriceList}`);

      //  totalSumInCart += product.price;
      const amountInShoppingCart = shoppingCart.filter(
        (id) => id === productId
      ).length;

      var productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");
      productDiv.dataset.productId = productId;

      var image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      image.className = "cart-pic";
      productDiv.appendChild(image);

      var title = document.createElement("p");
      title.textContent += product.title;
      title.className = "cart-title";
      productDiv.appendChild(title);

      console.log(`Shopping cart ${shoppingCart}`);

      var amount = document.createElement("p");
      amount.textContent = `Amount `;
      amount.className = "cart-amount ms-5";

      productDiv.appendChild(amount);

      var amountPlus = document.createElement("button");
      amountPlus.textContent = "\u002b";
      amountPlus.classList.add("amount-plus");
      amountPlus.setAttribute('product-id', product.id)
      productDiv.appendChild(amountPlus);

      

      var amountInput = document.createElement("input");
      amountInput.value = amountInShoppingCart;
      amountInput.className = "amount-input";
      productDiv.appendChild(amountInput);

      var amountMinus = document.createElement("button");
      amountMinus.textContent = "\u2212";
      amountMinus.className = "amount-minus";
      amountMinus.setAttribute('product-id', product.id)
      productDiv.appendChild(amountMinus);

      

      

      var price = document.createElement("p");
      price.textContent = "Á-Price: $" + product.price;
      price.className = "cart-price d-flex align-items-end mt-3";
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
      totalSum += product.price * amountInShoppingCart;
      var totalSumHead = 0;
      totalSumHead += totalSum;
      console.log(`Total sum: ${totalSum}`);

      var sum = document.createElement("p");
      sum.textContent = `Total price: $${totalSum}`;
      sum.className = "cart-sum";
      productDiv.appendChild(sum);

      headerPrice.push(totalSum);
      const totalHeaderSum = headerPrice
        .reduce((total, current) => total + current, 0)
        .toFixed(2);
      console.log(`listan med alla priser är ${headerPrice}`);

      var deleteOneProduct = document.createElement("img");
      deleteOneProduct.src = "images/trash.png";
      deleteOneProduct.className = "delete-one-product";
      productDiv.appendChild(deleteOneProduct);

      totalSum = 0;

      console.log(`Det totala priset är ${totalHeaderSum}`);
      var changeSum = document.querySelector(".totalSum");
      changeSum.textContent = `Total Price: $${totalHeaderSum}`;

      amountPlus.addEventListener('click', e => {
        totalPriceList.push(product.price);
        const prodId = e.target.getAttribute('product-id')
        console.log(`clicked plus product id: ${prodId}`)
        shoppingCart.push(prodId)
        localStorage.setItem('shoppingCart', shoppingCart)

        const amount = shoppingCart.filter(id => id === prodId).length
        amountInput.value = amount

        sum.textContent = `Total price: $${amount * product.price}`;

        const total = totalPriceList.reduce((total, sum) => total + sum).toFixed(2)
        document.querySelector('.totalSum').textContent = `Total Price: $${total}`;
        
      })

      amountMinus.addEventListener('click', e => {
        const prodId = e.target.getAttribute('product-id')
        const closestParent = e.target.closest('.cart-item');
        shoppingCart.splice(shoppingCart.indexOf(prodId), 1)
        const amount = shoppingCart.filter(id => id === prodId).length

        if(amount <= 0 ){
          closestParent.innerHTML = '';
        }
        
        console.log(`clicked minus product id: ${prodId}`)
        
        
      })

      /*var amountInput = document.createElement('input');
            input.type = 'number';
            amountInput.className = "amount-input"
            productDiv.appendChild(amountInput);*/
    }
  });

  //document.querySelector('.cart').appendChild(pArtNbr);
  //document.querySelector('.cart').appendChild(pTitle);
});

/*document.querySelector('.amount-plus').addEventListener('click', () => {
    shoppingCart.push

})*/

//Stänga ner varukorgen
document.querySelector(".kryss").addEventListener("click", () => {
  const cart = document.querySelector(".cart");
  cart.style.display = "none";
  const cartCenter = document.querySelector(".cart-center");
});

/*document.querySelector('.kryss').addEventListener('click', () =>{
    shoppingCart.length = 0;

})*/

document.querySelector(".empty-all").addEventListener("click", () => {
  localStorage.clear();
  shoppingCart.splice(0, shoppingCart.length);
  var deleteCart = document.querySelector(".cart-center");
  var deleteCartPrice = document.querySelector(".totalSum");
  var deleteCartTrash = document.querySelector(".empty-all");
  var deleteCounter = document.querySelector(".counter");

  deleteCart.innerHTML = "";
  deleteCartPrice.textContent = "";
  deleteCartTrash.style.display = "none";
  deleteCounter.style.display = "none";

  //updateCartGui();
});

document.querySelector(".cart-center").addEventListener("click", (event) => {
  //const changeCounter = document.querySelector('.counter');
  if (event.target.classList.contains("delete-one-product")) {
    console.log("Delete");
    var productDiv = event.target.closest(".cart-item");

    if (productDiv) {
      var productId = productDiv.dataset.productId;
      console.log("Product id: " + productId);
      shoppingCart.sort();
      var productIndex = shoppingCart.indexOf(productId);
      console.log("productindex: " + productIndex);
      console.log(`Före splice ${shoppingCart}`);

      if (productIndex !== -1) {
        const amount = shoppingCart.filter((id) => productId === id).length;
        shoppingCart.splice(productIndex, amount);
        console.log(`Efter splice ${shoppingCart}`);
        console.log(`productIndex: ${productIndex}`);
      }

      productDiv.remove();
      var totalHeaderSum = document.querySelector(".totalSum");
      
      totalHeaderSum.textContent = `Total Price: $${calculateSum()}`;

      if (shoppingCart.length <= 0) {
        localStorage.removeItem("shoppingCart");
        document.querySelector('.counter').style.display = 'none';
        document.querySelector('.totalSum').textContent = '';
        document.querySelector('.empty-all').style.display = 'none';
        
      } else {
        localStorage.setItem("shoppingCart", shoppingCart);
        changeCounter(shoppingCart.length)
      }
      // totalHeaderSum = shoppingCart.pr

      /*var changeTotalPrice = document.querySelector('.totalSum');
            changeTotalPrice.textContent = totalSum ;*/
      /* if(shoppingCart < 0){
            counter.textContent = shoppingCart.length -1;
            }
            else if(shoppingCart == 0){
                counter.style.display = 'none';
            }*/
    }
  }
});

function changeCounter(amount){
    document.querySelector('.counter').textContent = amount;
}

function calculateSum() {
  var totalPrice = 0;
  shoppingCart.forEach((productId) => {
    const product = productList.find((item) => item.id === parseInt(productId));
    if (product) {
      totalPrice += product.price;
    }
  });
  return totalPrice.toFixed(2);
}

document.querySelector(".footer-box").addEventListener("click", (event) => {
  console.log('plus tryckt')
  const prodId = event.target.getAttribute('product-id');
  console.log(`this product ID is ${prodId}`)
  if (event.target.classList.contains("amount-plus")) {
    console.log("pluss");
    var productDiv = event.target.closest(".cart-item");

    if (productDiv) {
      const productId = parseInt(productDiv.dataset.productId);
     // const productIndex = shoppingCart.indexOf(productId);
      shoppingCart.push(productId);

      

      document.querySelector('.amount-input').textContent = shoppingCart.filter(id => Number(id) == productId).length
      const totalPriceItem = document.querySelector('.sum');
      const totalPriceCart = document.querySelector('.totalSum');
        
        //updateCartGui();
        
         
        /* var amountInput = document.querySelector('.amount-input');
        const addProduct = productList.find(
          (product) => product.id === productId
        );
        if (addProduct) {
          shoppingCart.push(addProduct.id);
          console.log("Product added: ", addProduct.id);
          amountInput.value = Number(amountInput.value) + 1;
        
        //productDiv.add();
        var totalHeaderSum = document.querySelector(".totalSum");
          
        totalHeaderSum.textContent = `Total Price: $${calculateSum()}`;
  
        if (shoppingCart.length >= 1) {
          localStorage.setItem("shoppingCart", shoppingCart);
          //document.querySelector('.counter').style.display = 'none';
          document.querySelector('.totalSum').textContent = totalHeaderSum;
          //document.querySelector('.empty-all').style.display = 'none';
          
         
          localStorage.setItem("shoppingCart", shoppingCart);
          changeCounter(shoppingCart.length)
          var changeAmount = document.querySelector('.amount-input');
          changeAmount.value = shoppingCart.length;
          updateCartGui()
        } 
      }*/
    }
  }
});

document.querySelector(".footer-box").addEventListener("click", (event) => {
  console.log('cart center tryckt')
  if (event.target.classList.contains("amount-minus")) {
    console.log("Minus");
    var productDiv = event.target.closest('.cart-item');

    if(productDiv){
      var productId = productDiv.dataset.productId;
      var productIndex = shoppingCart.indexOf(productId);

      if(productIndex !== -1){
       /* const amount = shoppingCart.filter((id) => productId === id).length;*/
        shoppingCart.splice(productIndex, 1);
      }
      
      productDiv.remove();
      var totalHeaderSum = document.querySelector(".totalSum");
          
          totalHeaderSum.textContent = `Total Price: $${calculateSum()}`;
    
          if (shoppingCart.length <= 0) {
            localStorage.removeItem("shoppingCart");
            document.querySelector('.counter').style.display = 'none';
            document.querySelector('.totalSum').textContent = '';
            document.querySelector('.empty-all').style.display = 'none';
            
          } else {
            localStorage.setItem("shoppingCart", shoppingCart);
            changeCounter(shoppingCart.length)
            /*var changeAmount = document.querySelector('.amount-input');
            changeAmount.value = shoppingCart.length;*/
            updateCartGui();
          }
    }
  }
});



document.querySelector('.product-info').addEventListener('click', () => {
    document.querySelector('.product-info').style.display = 'none';
});

document.querySelector('.lets-buy').addEventListener('click', () => {
    document.querySelector('.order-form').style.display = 'block';
    document.querySelector('.cart').style.display = 'none';
})
    

/*document.querySelector('.card-button').addEventListener('click', () => {
    var showTrash = document.querySelector('.empty-all');
    showTrash.style.display = 'block';
})*/

/*document.querySelector('.delete-one-product').forEach(button => {
    button.addEventListener('click', () => {
        const productToDelete = button.getAttribute('productId');

        const productIndexDelete = shoppingCart.findIndex(id => id === productIndexDelete);

        if (productIndexDelete !== -1){
            shoppingCart.splice(productIndexDelete, 1);
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }
    });
});*/

function updateCartGui() {
  const cartElement = document.querySelector('.cart-center');
  cartElement.innerHTML = ''; // Ta bort alla befintliga produkter från varukorgen
 
  
  new Set(shoppingCart).forEach(productId => {
    const product = productList.find(item => item.id === parseInt(productId));
    
    if (product) {
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');
      productDiv.dataset.productId = productId;

      // Skapa och fyll i HTML-elementet för produkten
      var image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      image.className = "cart-pic";
      productDiv.appendChild(image);

      var title = document.createElement("p");
      title.textContent += product.title;
      title.className = "cart-title";
      productDiv.appendChild(title);

      var amount = document.createElement("p");
      amount.textContent = `Amount `;
      amount.className = "cart-amount ms-5";
      productDiv.appendChild(amount);

      const amountInShoppingCart = shoppingCart.filter(
        (id) => id === productId
      ).length;

      var amountInput = document.createElement("input");
      amountInput.value = amountInShoppingCart;
      amountInput.className = "amount-input";
      productDiv.appendChild(amountInput);

      var amountPlus = document.createElement("button");
      amountPlus.textContent = "\u002b";
      amountPlus.className = "amount-plus";
      amountPlus.setAttribute('product-id', product.id)
      productDiv.appendChild(amountPlus);

      var amountMinus = document.createElement("button");
      amountMinus.textContent = "\u2212";
      amountMinus.className = "amount-minus";
      amountMinus.setAttribute('product-id', product.id)
      productDiv.appendChild(amountMinus);

      amountMinus.addEventListener('click', () => {
        console.log('Minus tryckt')
      })

      var price = document.createElement("p");
      price.textContent = "Á-Price: $" + product.price;
      price.className = "cart-price d-flex align-items-end mt-3";
      productDiv.appendChild(price);

      
     var totPrice = product.price * amountInShoppingCart;
     
      var sum = document.createElement("p");
      sum.textContent = `Total price: $${totPrice}`;
      sum.className = "cart-sum";
      productDiv.appendChild(sum);
      
      var deleteOneProduct = document.createElement("img");
      deleteOneProduct.src = "images/trash.png";
      deleteOneProduct.className = "delete-one-product";
      productDiv.appendChild(deleteOneProduct);

      // Lägg till produktdiv i varukorgen i DOM
      cartElement.appendChild(productDiv);
    }
  });

  // Uppdatera eventuella tillhörande siffror eller totalsummor i varukorgen
  const totalHeaderSum = document.querySelector('.totalSum');
  totalHeaderSum.textContent = `Total Price: $${calculateSum()}`;
}

