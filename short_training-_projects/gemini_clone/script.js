const typingForm = document.querySelector(".typing-form"); /* form section */
const chatList = document.querySelector(".chat-list") /* conversation section */

let userMessage = null;/*  falsy variable */


// API configuration
const API_KEY = "AIzaSyDKPtjULrLRfvTvRuGowvR6H-_EBSpFUs8"; /*  Get an API Key  Generative Language Client */
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`; /* https://ai.google.dev/gemini-api/docs/api-key from jmnarv */

//1. Create a new message element and return it -----------------------------------------------------
const createMessageElement =  (content, ...classes) => {/* content: The HTML content to be set inside the div., className: The additional CSS class (or classes) to be added to the div. */
    const div = document.createElement("div"); 
    div.classList.add("message", ...classes);  /* class="message, ..arrayofcalsses" */
    div.innerHTML = content; /*  after creating a div the content is what will pass on the content parameter */
    return div;
}

// Fetch response from the API based on user message
const generateAPIResponse = async () => {
    // Send a POST request to the API with the user's message
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify({
                contents:[{
                    role:"user",
                    parts:[{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//2. The loading animation after sending a message and while waiting for API response----------------
const showLoadingAnimation = () => {
    const html = `<div class="message-content">
          <img src="images/gemini.svg" alt="Gemini image" class="avatar" />
          <p class="text"></p>
          <div class="loading-indicator">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
          </div>
        </div>
        <span class="icon material-symbols-outlined">content_copy</span>`;

//. Creating an element of incoming message and adding it to the chat list
    const incomingMessageDiv =  createMessageElement(html, "incoming", "loading"); /* parentDIV(childDiv, "className") or function with two parameters */
    chatList.appendChild(incomingMessageDiv) /* put the created div into the DOM */

    // generateAPI after showing the loading effect
    generateAPIResponse();
}

//2. Handle sending outgoing chat message-----------------------------------------------------------
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if(!userMessage) return; /*! check if variable is falsy.. exit if there is no message */
    const html = `<div class="message-content">
                    <img src="images/user.jpg" alt="User image" class="avatar" />
                    <p class="text">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Reiciendis, voluptatibus!
                    </p>
                    </div>`;

    //3. Creating an element of outgoing message and adding it to the chat list
   const outgoingMessageDiv =  createMessageElement(html, "outgoing"); /* parentDIV(childDiv, "className") or function with to parameters */
   outgoingMessageDiv.querySelector(".text").innerText = userMessage; /* what the user typed in input box */
   chatList.appendChild(outgoingMessageDiv) /* put the created div into the DOM */

   typingForm.reset(); /* clear input field when message is sent */
   setTimeout(showLoadingAnimation, 500);/*  Shows loading animation after delay */
} 


// prevent default form submission and handle outgoing chat----------------------------------------
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
})




// 41:35 getting error from fetching data