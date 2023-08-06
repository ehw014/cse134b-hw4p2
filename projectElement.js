const localJSON = {
    projects: [
        {   "name" : "save the whales",
            "image" : "path to image",
            "description" : "we must save the whales, by jove",
            "link" : "www.great whales!"},
        {   "name" : "attack the snails",
            "image" : "path to image",
            "description" : "we must cull the snails, do it now!",
            "link" : "www.terrible snails!!"},
        {   "name" : "make some food",
            "image" : "path to image",
            "description" : "we must cook some food, i am so hungry",
            "link" : "www.hungary"}
    ]};
alert(localJSON.projects[0].name);

class ProjectCardElement extends HTMLElement {
    //constructor(name = "Project Title", date="01/01/2000", image= "link to image",
    //             description="Project Description", link = "link to project") {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.getElementById('project-card-template');
        const templateContent = template.content.cloneNode(true);
                    
        //templateContent.querySelector("h2").textContent = name;
        //templateContent.querySelector("img").setAttribute("src", image);
        //templateContent.querySelector("p").textContent;

        shadowRoot.appendChild(templateContent);
    }
    changeValue(){
        alert(templateContent.querySelector("h2"));
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


function projectCardLoad(loadMethod) {
    //const localJSON = require('./local.json');
    let projectData;
    if(loadMethod == "local") {

        const jsonString = JSON.stringify(localJSON);
        localStorage.setItem('projects', jsonString);
        
        const storedJsonString = localStorage.getItem('projects');
        projectData = JSON.parse(storedJsonString);
    }
    else {

    }
    projectData.projects.forEach(project => {
        let newEle = document.createElement("project-card");
        //let kids = newEle.childNodes;
        //kids[0].textContent = project.name;
        //kids[1].setAttribute("src", `${project.image}`);
        //kids[2].textContent = project.description;
        //kids[3].setAttribute("href", `${project.link}`);
        ////const shadowRoot = newEle.attachShadow({ mode: 'open' });
        ////shadowRoot.appendChild(newEle);
        newEle.changeValue();
        let oldEle = document.querySelector("h1");
        oldEle.insertAdjacentElement("afterend", newEle);
    });
}

window.addEventListener('DOMContentLoaded', init);