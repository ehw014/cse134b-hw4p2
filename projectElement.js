const localJSON = {
    projects: [
        {   "name" : "Stir Fry with Peppers",
            "image" : "stir-fry.png",
            "alt" : "Stir Fry Icon",
            "date" : "05/13/2014",
            "description" : "150g Meat (Shrimp, Beef, Pork, Chicken are all good!)\n25g Light Soy Sauce\n20g Oyster Sauce\n10g Fish Sauce\n2 Green Onions\n1/2 Bell Pepper",
            "link" : "stir-fry.html"
        },
        {   "name" : "Omelette",
            "image" : "omelette.png",
            "alt" : "Omelette Icon",
            "date" : "06/15/2014",
            "description" : ".",
            "link" : "omelette.html"
        },
        {   "name" : "Pancakes",
            "image" : "pancakes.png",
            "alt" : "Pancakes Icon",
            "date" : "06/22/2014",
            "description" : "we must cook some food, i am so hungry",
            "link" : "pancakes.html"
        }
    ]};
var jsonString = JSON.stringify(localJSON);
localStorage.setItem('projects', jsonString);

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

    let oldEle = document.querySelector("h1");
    oldEle.insertAdjacentElement("afterend", newEle);
}



function projectCardLoad(loadMethod) {
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
        const url = 'https://api.jsonbin.io/v3/b/64cf09128e4aa6225ecb6be7'
        const binId = '64cf09128e4aa6225ecb6be7';
        const secretKey = '$2b$10$BoUwpKBD3EnjPhxmAlyDfeSpDAIGEDmqoGr2dVMQ5mSSegGXF06PW'
        fetch(url, {
            headers: {
                'X-Master-Key': secretKey,
                'Content-Type':'application/json',
            }
        })
        .then(response =>{
            return response.json();
        })
        .then(data => {
            projectData = data.record.projects;
            projectData.forEach(project => {
                makeProjectCard(project);
            });
        })
    }
}

window.addEventListener('DOMContentLoaded', init);