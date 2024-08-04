// get all dropdowns from the document
const dropdowns = document.querySelector('.dropdown');

//loop through all dropdown elements
dropdowns.forEach(dropdown => {
    //get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
});

// we are using this method in order to have multiple dropdown menus on the page work

// Add a click event to the select element
select.addEventListener('click', () => {
//   add the clicked select styles to the select elements
    select.classList.toggle('select-clicked');
    // add the rotate styles to the caret element
    caret.classList.toggle('caret-rotate');
    // add the open styles to the menu element
    menu.classList.toggle('menu-open');
});


options.forEach(option => {
    // add a click event to the option element
    option.addEventListener('click', () => {
        // change selected innet text to clicked option inner text
        selected.innerText = option.innerText;
        // add the clicked select styles to the select element
        select.classList.remove('select-clicked');
        // add the rotate styles to the caret element
        caret.classList.remove('caret-rotate');
        // add the open styles to the menu element
        menu. classList.remove('menu-open');
        // remove active class from all option elements
        options.forEach(option =>{
            option.clasList.remove('.active');
        });
        // add active class to clicked option element
        option.classList.add('.active');
    });

});