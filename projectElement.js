const localJSON = {
    projects: [
        {   "name" : "Stir Fry with Peppers",
            "image" : "img/stir-fry.png",
            "alt" : "Stir Fry Icon",
            "date" : "05/13/2014",
            "description" : "150g Meat (Shrimp, Beef, Pork, Chicken are all good!)\n25g Light Soy Sauce\n20g Oyster Sauce\n10g Fish Sauce\n2 Green Onions\n1/2 Bell Pepper",
            "link" : "stir-fry.html"
        },
        {   "name" : "Omelette",
            "image" : "img/omelette.png",
            "alt" : "Omelette Icon",
            "date" : "06/15/2014",
            "description" : "3 Eggs\n1tsp butter\nChoice of filling (totalling 1 cup)\nMeat: Breakfast Sausage, Bacon\nVeggies: Onion, Olives, Peppers, Tomatoes, Spinach, Mushrooms\nExtra Flavor: Parsley, Cheese",
            "link" : "omelette.html"
        },
        {   "name" : "Pancakes",
            "image" : "img/pancakes.png",
            "alt" : "Pancakes Icon",
            "date" : "06/22/2014",
            "description" : "2 cups AP flour\n1/4 cups Sugar\n1 1/3 tbsp Baking Powder\n1/2 tsp Salt\n1 Egg\n1 1/2 cups Milk\n1/4 cups Melted Butter",
            "link" : "pancakes.html"
        },
        {   "name" : "Marbled Cheesecake",
            "image" : "img/cheesecake.png",
            "alt" : "Cheesecake Icon",
            "date" : "08/11/2014",
            "description" : "32 oz Cream Cheese\n3 Eggs\n2/3 cups Sugar\nBaking Chocolate\n2 tsp Vanilla Extract\n1 Tsp Lemon Juice",
            "link" : "cheesecake.html"
        }
    ]};
var jsonString = JSON.stringify(localJSON);
localStorage.setItem('projects', jsonString);
var loaded = false;

class ProjectCardElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.getElementById('project-card-template');
        const templateContent = template.content.cloneNode(true);
        shadowRoot.appendChild(templateContent);
    }
}
customElements.define('project-card', ProjectCardElement);

function init() {
    let element = document.getElementById('localLoadBtn');
    element.addEventListener('click',function() {
        projectCardLoad("local");
    });
    element = document.getElementById('remoteLoadBtn');
    element.addEventListener('click', function() {
        projectCardLoad("remote");
    });
}

function makeProjectCard(project) {
    let newEle = document.createElement("project-card");

    newEle.shadowRoot.querySelector("h2").textContent = project.name;
    newEle.shadowRoot.querySelector("p").textContent = project.description;
    newEle.shadowRoot.getElementById("date").textContent = project.date; 
    
    let shadowImage = newEle.shadowRoot.querySelector("img");
    let shadowLink = newEle.shadowRoot.querySelector("a");
    shadowImage.setAttribute("src", `${project.image}`);
    shadowImage.setAttribute("alt", `${project.alt}`);
    shadowLink.setAttribute("href", `${project.link}`);

    let oldEle = document.getElementById("cardSection");
    oldEle.insertAdjacentElement("beforeend", newEle);
}



function projectCardLoad(loadMethod) {
    if(loaded) {
        if(confirm("You\'ve already loaded some cards into the webpage. Do you wanna do it again?")) {
            let allCards = document.getElementsByTagName("project-card");
            while(allCards.length > 0)
                allCards[0].remove();
        }
        else
            return;
    }
    else {
        loaded = true;
    }
    let projectData;
    if(loadMethod == "local") {
        const storedJsonString = localStorage.getItem('projects');
        const bigData = JSON.parse(storedJsonString);
        projectData = bigData.projects;
        projectData.forEach(project => {
            makeProjectCard(project);
        });
    }
    else {
        let cardSection =document.getElementById("cardSection");
        cardSection.textContent=("LOADING");
        const url = 'https://api.jsonbin.io/v3/b/64cf3168b89b1e2299cc2377'
        const secretKey = '$2b$10$BoUwpKBD3EnjPhxmAlyDfeSpDAIGEDmqoGr2dVMQ5mSSegGXF06PW'
        fetch(url, {
            headers: {
                'X-Master-Key': secretKey,
                'Content-Type':'application/json',
            }
        })
        .then(response =>{
            cardSection.textContent = null;
            return response.json();
        })
        .then(data => {
            cardSection.textContent = null;
            projectData = data.record.projects;
            projectData.forEach(project => {
                makeProjectCard(project);
            });
        })
    }
}

window.addEventListener('DOMContentLoaded', init);