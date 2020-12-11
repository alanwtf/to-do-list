import {projectsArray} from "./index.js"

const projects = document.querySelector(".projects");

const addProjectToDOM = function(name){
    const newProject = document.createElement("div");
    const expandIcon = document.createElement("span");
    newProject.innerHTML = name;
    expandIcon.innerHTML = "+";
    newProject.classList.add("project");
    expandIcon.classList.add("expand");
    newProject.appendChild(expandIcon);
    projects.appendChild(newProject);
}

const init = function(){
    projectsArray.forEach(()=>{
        projects.appendChild(this);
    });
}

export {addProjectToDOM, init};