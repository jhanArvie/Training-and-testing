const accessKey = "mmq_TCFYerW1h0Uvy2sjaVx1Mm9YhY5OjqWUGtFtOzg";/*  key from unsplash account jiminarvie@gmail.com*/
const formEl = document.querySelector("form"); /* form from DOM */
const inputEl = document.getElementById("search-input"); /* search input from DOM */
const searchResults = document.querySelector(".search-results"); /* container of products from DOM */
const showMore = document.getElementById("show-more-button"); /* show more button on bottom */

let inputData = "";/*  the keywords that will be save after searching  */
let page = 1;

async function searchImages() { /* converted to a async function for await and fetching data*/
    inputData = inputEl.value; /* the value thats typed on the search input will be update here */
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);/*  fetch the images base on the query */
    const data = await response.json(); /* convert the response into a json format */
    const results = data.results;

    if (page === 1 ) {/*  if page is === to 1 then let the product container empty */
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div"); /* create div */
        imageWrapper.classList.add("search-result"); /*add class */
        const image = document.createElement("img"); /* create img */
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.link.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);/*  div > img */
        imageWrapper.appendChild(imageLink); /* div > a */
        searchResults.appendChild(imageWrapper); /* div > div  */
    })
    
    page++;
    if (page > 1 ) { /* change the styling of show more button if page is more than 1 */
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => { /* search button */
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})
