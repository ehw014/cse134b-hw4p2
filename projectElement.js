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
        //newEle.childNodes[0].textContent = project.name;
        //newEle.childNodes[1].setAttribute("src", `${project.image}`);
        //newEle.childNodes[2].textContent = project.description;
        //newEle.childNodes[3].setAttribute("href", `${project.link}`);
        ////const shadowRoot = newEle.attachShadow({ mode: 'open' });
        ////shadowRoot.appendChild(newEle);
        document.getElementById("h1").insertAdjacentElement("afterend", newEle);
    });
}

window.addEventListener('DOMContentLoaded', init);