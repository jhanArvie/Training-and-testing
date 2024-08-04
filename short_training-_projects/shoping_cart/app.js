// variables
const cartBtn = document.querySelector('.cart-btn'); /*  cart with number */
const closeCartBtn = document.querySelector('.close-cart'); /* close icon */
const clearCartBtn = document.querySelector('.clear-cart'); /* clear cart Button */
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content'); /* div for items that in cart */
const productsDOM = document.querySelector('.products-center'); /* container of the whole product */

// cart items
let cart = [];
// buttons
let buttonsDOM = [];


// OUR PRODUCTS SECTION----------------------------------------------------------------------------
// GETTING THE PRODUCTS OR "ARRAY OF OBJECTS" BY USING FETCH
class Products {
    async getProducts(){
    try {
        let result = await fetch('products.json') 
        let data = await result.json(); /* to get data in json format */
        let products = data.items; /* item is the name of the array */
        products = products.map(item => { /* to destructure fetched data and take key:value on cleaner way */
            const {title,price} = item.fields /* destructuring obj .fields */
            const {id} = item.sys /* destructuring obj .sys to get id */
            const image = item.fields.image.fields.file.url;
            return {title, price, id, image} /* to have a cleaner obj */
        })
        return products
       
    } catch (error) {
        console.log(error);
    }
    }
}

// USER INTERFACE FOR DISPLAYING PRODUCT LIST------------------------------------------------------
class UI {
    // ADDING PRODUCTS TO THE DOM
    displayProducts(products){ /* products is from fetched data */
        // console.log(products); will return the array of objects
        let result = '';
        products.forEach(product =>{  /* loop on the array [products] */ 
        result +=`
        <article class="product">
          <div class="img-container">
            <img
              class="product-img"
              src=${product.image}
              alt="Product 1"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              add to Cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        `;
        });
        productsDOM.innerHTML = result; /*return as html element ready to be sent to DOM to class="productsDOM"*/
    }
    // GET THE BUTTONS FROM PRODUCTS WORK AND MANIPULATING THE STORAGE
    getBagButtons(){ /* after loading the products displayProducts(products) then called the .bag-btn class from element created */
        const buttons = [...document.querySelectorAll(".bag-btn")]; /* returns array of bag-btn from element */
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id; /* returns id from the objects */
            let inCart = cart.find(item => item.id === id); /* will loop on id from obj */
            if(inCart) {  
                button.innterText = "In Cart"; 
                button.disabled = true
            }  /* clicking ADD TO BAG will add it on cart and disable the button */
            $button.addEventListener('click', (event) => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    // GET SPECIFIC PRODUCT FROM PRODUCTS
                    // let cartItem = Storage.getProduct(id); /* from class Storage getProduct(id)  */
                    // amount:1 is added for calculating the adding of item in the cart
                    let cartItem = {...Storage.getProduct(id), amount:1}; /* add spread operator and add, more property:value */
                    // ADD PRODUCT TO THE EMPTY CART VARIABLE = [ARRAY]
                    cart = [...cart, cartItem]; /* rewrite the [...empty variable of array, item from storage] */
                    // SAVE CART IN LOCAL STORAGE
                    Storage.saveCart(cart)  /*push the array to the class Storage.saveCart(cart) */
                    // SET CART VALUES
                    this.setCartValues(cart);
                    // DISPLAY CART ITEM - ADD ITEM TO THE DOM
                    this.addCartItem(cartItem);
                    // SHOW THE CART
                    this.showCart() /* to change the CSS properties and show the cart */
            });
        });
    }
    // INCREMENTING THE NUMBER IN DISPLAYED/ICON CART
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2)) /* parseFloat to make the string number and toFixed for 2 decimal */
        cartItems.innerText = itemsTotal; /* update .cart-total element */
        // console.log(cartTotal, cartItems); /* update .cart-items element */
    }
    // CREATE DIV ELEMENT AND ADD IT TO DOM
    addCartItem(item){ /* this method will call later on on other method populateCart(cart)*/
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>Remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
        `;
        cartContent.appendChild(div) /* insert the div to parent div cartContent */
    }
    showCart(){ /* classes that will be added to elements to show the cart */
        cartOverlay.classList.add('transparentBcg'); /*  visibility: hidden; to visibility: visible; */
        cartDOM.classList.add('showCart'); /*  transform: translateX(100%); to  transform: translateX(0);*/
    }
    setupAPP(){ 
        cart = Storage.getCart(); /*from class Srorage.getCart() will check the local storage cart value */
        this.setCartValues(cart) /*  update the cart total  */
        this.populateCart(cart); /* iterate and add to DOM */
        cartBtn.addEventListener('click', this.showCart); /* cart button on right corner DOm */
        closeCartBtn.addEventListener('click', this.hideCart) /* close button left-up corner of cart*/
    }
    populateCart(cart){
        cart.forEach(item => this.addCartItem(item)); /*loop on array if there is item add the elements */
    }
    hideCart(){ /* classes that will be remove after clicking the close button on cart */
        cartOverlay.classList.remove('transparentBcg'); /*  visibility: visible; to visibility: hidden;*/
        cartDOM.classList.remove('showCart'); /*  transform: translateX(0); to transform: translateX(100%);*/
    }
    cartLogic(){  /* point to class UI and this.clearCart() CLEAR CART button in DOM */
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        //cart Functionality
        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains("remove-item")) { /* if clicked button contains class 'remove-item' */
                let removeItem = event.target;
                let id = removeItem.dataset.id; /* takes the id of the iteam to be remove */
                cartContent.removeChild(removeItem.parentElement.parentElement); /* access the cartContent element and remove the child of child */
                this.removeItem(id); /* after the click event removeItem(id) will activate*/
            } 
            else if(event.target.classList.contains("fa-chevron-up")){/*  the up arrow icon to add number in cart */
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id===id);
                tempItem.amount = tempItem.amount + 1;/*  add 1 to the key:value of the array */
                Storage.saveCart(cart); /* pass the new cart to storage after adding  */
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains("fa-chevron-down")){
               let lowerAmount = event.target;
               let id = lowerAmount.dataset.id;
               let tempItem = cart.find(item => item.id === id);
               tempItem.amount = tempItem.amount - 1;
               if (tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount;
               } 
               else{
                cartContent.removeChild(lowerAmount.parentElement.parentElement)
                this.removeItem(id)
               }
            }
        });
    }
    clearCart(){ 
        let cartItems = cart.map(item => item.id); /* take id from the items in cart */
        cartItems.forEach(id => this.removeItem(id)) /* loop and run the removeItem method */
        while(cartContent.children.length > 0){ /* will remove the child element to the DOM */
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();/*  hides the cart by removing the added classes */
    }
    removeItem(id){
        cart = cart.filter(item => item.id !== id);/*  filter the array check if it does not have the same ID */
        this.setCartValues(cart);/*  update the amount and price displayed */
        Storage.saveCart(cart);  /* update the local storage */
        let button = this.getSingleButton(id);  
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    }
    getSingleButton(id){
        // buttonsDOM is an empty array will contains buttons
        return buttonsDOM.find(button => button.dataset.id === id); /* find the same id that matches the dataset id */

    }
}

// local storage-----------------------------------------------------------------------------------
class Storage{
    static saveProducts(products){ /* class owns anything static, not the objects */
        localStorage.setItem("products", JSON.stringify(products)); /* ("parameter"), stringify the Array() */
    }
    static getProduct(id){ /* class owns anything static, not the objects */
        let products = JSON.parse(localStorage.getItem('products')); /* JSON parse will convert the getItem(string) to JS object */
        return products.find(product => product.id === id); /* will look for specific product from local storage */
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart)) /* push the item to the local storrage */
    }
    static getCart(){ /* when page is load 1st time cart in local storage doesnt exist */
        return localStorage.getItem('cart')?  /* doest cart is in local storage ???? */
        JSON.parse(localStorage.getItem('cart')):[] /* if ? is true then get it and convert to JSON  if not then let it be empty array []*/
    }
}

document.addEventListener("DOMContentLoaded", () =>{ /* addEventListener("DOMContentLoaded", (event) => {}); this is a js event */
    const ui = new UI(); /* class UI that contains html elements and converted to new array*/
    const products = new Products (); /* class Products that fetched the productlist and converted to new array */
    // setup application
    ui.setupAPP();
    // get all products from fetched data 
    products.getProducts().then(products => {
        ui.displayProducts(products); /* then(display products in <article>) */
        Storage.saveProducts(products); /* also save it to local storage */
    }).then(() => {
        ui.getBagButtons()
        ui.cartLogic();
    });
});