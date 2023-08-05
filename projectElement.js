class ProjectCardElement extends HTMLElement {
    constructor() {
      super();

      // Attach the Shadow DOM to the custom element
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // Get the template and clone its content
      const template = document.getElementById('project-card-template');
      const templateContent = template.content.cloneNode(true);

      shadowRoot.appendChild(templateContent);
    }
  }

  // Register the custom element with the browser
  customElements.define('project-card', ProjectCardElement);