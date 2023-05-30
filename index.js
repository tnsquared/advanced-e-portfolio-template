let isModalOpen = false; //glpobal scope variables at the top
let contrastToggle = false;
const scaleFactor = 1 / 20; //doing this is better readability 

function moveBackground(event){ //the event will hold mouse location
    const shapes = document.querySelectorAll(".shape"); //querySelectorAll returns in an array
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) { //how to make shapes move is opposing directions
        const isOdd = i % 2 !==0; //const isOdd variable is odd when it is not even. remainder of division by 2 is 0 means even so the opposite of that is odd 
        const boolInt = isOdd ? -1 : 1; //is either going to be positive or negative
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) { // if contract toggle is true then add the dark theme
        document.body.classList += "dark-theme"
    }
    else { //if contrast toggle is false then remove dark theme
        document.body.classList.remove("dark-theme")
    }
}

function contact(event) {
    event.preventDefault(); //forms by default refreshes the page this code stops it. prevents default and passes in the event from the form
    const loading = document.querySelector('.modal__overlay--loading'); //targets the loading class that was made earlier
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible"; //when adding a  class make sure not to forget to include a space in the string
    emailjs //can do asyc await (add await here)
        .sendForm( //this is a promise
           'service_1nwcvgc',  //service ID
           'template_er9wi06', //template ID
           event.target, //passing in all the fiends in the event: name, email and message
           'eN39bcplZqWhI2ywk' //user ID
    ).then(() => {
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible";     
    }).catch(() => { //promises also has a catch this is if there is an error if service is down or if we ran out of emails etc, important for UX
        loading.classList.remove("modal__overlay--visible");
        alert(
            "The email service is temporarily unavailable. Please contact me at tian.t.chen@outlook.com "
        );
    })    
}


function toggleModal() { //if the modal is open we want to close it
    if (isModalOpen) {
        isModalOpen = false; //make it false and remove it
        return document.body.classList.remove("modal--open");
    }
    isModalOpen = true; //otherwise make it true and add it
    document.body.classList += " modal--open";
}