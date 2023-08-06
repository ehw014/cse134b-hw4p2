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
        localStorage.setItem('currentProjects', jsonString);
        
        const storedJsonString = localStorage.getItem('projects');
        projectData = JSON.parse(storedJsonString);
    }
    else {

    }
    class ProjectCardElement extends HTMLElement {
        constructor() {
            super();
    
            const shadowRoot = this.attachShadow({ mode: 'open' });
    
            const template = document.getElementById('project-card-template');


            if(projectData) {
                projectData.forEach(project => {
                    const templateContent = template.content.cloneNode(true);
                    templateContent.setItem("h2", `${project.name}`);
                    templateContent.setItem("img," `${project.image}`);
                    templateContent.setItem("p," `${project.description}`);
                    templateContent.setItem("a," `${project.link}`);
                    shadowRoot.appendChild(templateContent);
                });
            }
    
        }
      }
    customElements.define('project-card', ProjectCardElement);
}

window.addEventListener('DOMContentLoaded', init);