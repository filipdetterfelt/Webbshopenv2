document.addEventListener('DOMContentLoaded', function() {
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

    var productData = JSON.parse(localStorage.getItem('productData'));
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
    }

    var datumBstElement = document.getElementById('datumBst')
    datumBstElement.innerHTML = '<h5>Beställningsdatum: ' + genereraDagensDatum() + '</h5>';
    
});

var inTheCart = document.querySelector('inCart');
inTheCart.innerHTML = '<p>'+productInfo(title);


function genereraDagensDatum() {
    var idag = new Date();
    var dagensDatum = idag.getDate();
    var dagensMånad = idag.getMonth() + 1;
    var dagensÅr = idag.getFullYear();
    var tidPunkt = '['  +idag.getHours() + ': '  + idag.getMinutes() + ': ' + idag.getSeconds() + ']';

    var datumText = dagensDatum + '-' + dagensMånad + '-' + dagensÅr + ' ' + tidPunkt;

    return datumText;
}
