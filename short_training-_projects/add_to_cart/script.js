// <!-- https://www.youtube.com/watch?v=B20Getj_Zk4&list=RDCMUCADAkBGiLWIPkCu8D1R1M6g&index=5&ab_channel=TelmoSampaio -->
let carts = document.querySelectorAll('.add-cart');

// Array of objects
let products = [
    {
        name:'grey Tshirt',
        tag: "RainyDays_Jacket1",
        price: 100,
        inCart: 0
    },
    {
        name:'brown Tshirt',
        tag: "RainyDays_Jacket2",
        price: 200,
        inCart: 0
    },
    {
        name:'red Tshirt',
        tag: "RainyDays_Jacket3",
        price: 300,
        inCart: 0
    },
    {
        name:'bbb Tshirt',
        tag: "RainyDays_Jacket4",
        price: 400,
        inCart: 0
    },
];

// loop to my list of items
for (let i=0; i < carts.length; i++) {
    // add to cart button on every item
    carts[i].addEventListener('click', () => {

       cartNumbers(products[i]);
       totalCost(products[i]);
    })
}

// maintain the cart counts even after the page refreshed
function onLoadCartNumber(){
    // call the present local storage number
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// ADDING COUNTING NUMBER IN THE BASKET------------------------------------------------------------
function cartNumbers(product) {
    // returns index of array objects from loop line 32
    // console.log("the product clicked is", product)

    // getting the setItem from local storage  return as a string valeu
    let productNumbers = localStorage.getItem('cartNumbers');

    // convert the string to number 
    productNumbers = parseInt(productNumbers);

    // saving cartNumbers to my local storage return 1
    // will continue add numebr to local storage if not empty
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        // access the counter in document and add 1 on existing count
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }   else {
        localStorage.setItem('cartNumbers', 1);
        // access the counter  in document and change the number from 0 to 1
        document.querySelector('.cart span').textContent = 1;
    }

    // funtion that will be call to save the clicked item to local storage
    setItems(product);
}



// WHICH ITEM THAT'S IN THE CART-------------------------------------------------------------------
//to add in local storage
function setItems(product) {
        // get what's in local storage will return as a JSON Object
        let cartItems = localStorage.getItem('productsInCart');
        // parse the JSON to Javascript Object
        cartItems = JSON.parse(cartItems);

        // If the cartItem is not yet in local storage or already in storage plus 1
        if(cartItems !=null){

            // Adding different item to the cart will return undefined and wont be added to local storage
            if(cartItems[product.tag] === undefined) {
                cartItems = {
                    // a JS operator on getting or copying whats in the variable, array or object
                    ...cartItems,
                    [product.tag]:product
                }
            }

            // add 1 more if the item is already in cart
            cartItems[product.tag].inCart += 1;
        } else {
            // when clicked inCart object value will have 1 as count
        product.inCart = 1; 
        cartItems = {[product.tag]: product}
        }

//  push the cart item to local storage as an Object
// from JS Object to JSON Object used JSON.stringify
 localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// CALCULATING THE TOTAL COST OF THE PRODUCT IN THE CART---
function totalCost(product) {
    // test for clicking and showing the price.
    // console.log("the product price is", product.price);

    // get what is already in local storage as totalCost
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null) {
        // cartcost will return as string and needed to be converted as a number by using parseInt
        cartCost = parseInt(cartCost);
        // will add the old totalCost and the recent clicked item
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        // otherwise if ther is no totalCost yet(!=null) then setItem price.
        localStorage.setItem("totalCost", product.price);
    }

    
}


// -------------------CART PAGE STARTS HERE--------------------------------------------------------
// GETTING ITEMS FROM CART SAVED TO LOCAL STORAGE--------------------------------------------------
function displayCart(){
    // take cartItems from Local storage from clicked from Home Page
    // key name from local storage can still be name in as variable
    let cartItems = localStorage.getItem("productsInCart");
    // console.log(typeof cartItems) string
    // after getting a JSON(string)  from local storage convert it to Javascript Objects
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems); object

    // call div that contains the product, price, quantity and total
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    // if we are on cart.html page, .product-container class exist && we also have something in cartItems localStorage
    //if (local storage && html-class)
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        // took the valeus of local storage obj
        Object.values(cartItems).map(item => {
            // add or continue adding
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="add_to_cart_assets/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div> 
            <div class="quantity">
                <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="caret-forward-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `
        });

    productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>
        </div>
         `
    }
}

// call the function to keep the number in basket after page refreshed
onLoadCartNumber();
//call function to getItem from local Storage
displayCart()