//book class
class ToDo {
    constructor(name, isDone) {
        this.name = name;
        this.isDone = isDone;
    }
}


//project class
class Project {
    constructor(name) {
        this.name = name;
        this.toDoArr = [];
    }
}


//store class
class Store {
    static getProjects() {
        let projects;
        if (localStorage.getItem('projects') === null) {
            projects = [];
        } else {
            projects = JSON.parse(localStorage.getItem('projects'));
        }
        return projects;
    }

    static addProject(project) {
        const projects = Store.getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static removeProject(name) {
        console.log("Entre");
        const projects = Store.getProjects();
        projects.forEach((project, index) => {
            if (project.name === name) {
                projects.splice(index, 1);
            }
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static getProject(name) {
        const projects = Store.getProjects();
        console.log(projects, name);
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === name) {
                return projects[i];
            }
        }
        return null;
    }

    static updateProject(name, newProject) {
        const projects = Store.getProjects();
        projects.forEach((project, index) => {
            if (project.name === name) {
                projects.splice(index, 1, newProject);
            }
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }



    static addToDo(name, todo) {
        const project = Store.getProject(name);
        project.toDoArr.push(todo);
        Store.updateProject(name, project);
    }
    
    static deleteToDo(name, nameToDo){
        const project = Store.getProject(name);
        project.toDoArr.forEach((todo, index) =>{
            if(todo.name === nameToDo){
                project.toDoArr.splice(index, 1);
            }
        });
        Store.updateProject(project.name, project);
    }

    static toggleToDo(name, nameToDo){
        const project = Store.getProject(name);
        let isDone = false;
        project.toDoArr.forEach((todo, index) =>{
            if(todo.name === nameToDo){
                project.toDoArr[index].isDone = !project.toDoArr[index].isDone;
                isDone = project.toDoArr[index].isDone;
            }
        });
        Store.updateProject(project.name, project);
        return isDone;
    }
}


//UI class
class UI {
    static addProject(project) {
        const newProject = document.createElement("div");
        const projects = document.querySelector(".projects");
        newProject.innerHTML = `<div>${project.name}</div><span class="expand">></span>`;
        newProject.className = "project";
        projects.appendChild(newProject);
    }

    static renderProjects() {
        const projectsDiv = document.querySelector(".projects");
        projectsDiv.innerHTML = "";
        const projects = Store.getProjects();
        projects.forEach(project => {
            UI.addProject(project);
        });
    }

    static showProject(el) {
        const todoTitle = document.querySelector("#todo-title");
        const toDoList = document.querySelector(".todo-list");
        toDoList.innerHTML = "";
        if(el === ""){
            todoTitle.textContent = "default";
            return 0;
        }
        const project = Store.getProject(el);
        console.log(project);
        project.toDoArr.forEach(toDo => {
            let newDiv = document.createElement("div");
            newDiv.className = "todo";
            newDiv.innerHTML = `<div class="name-isdone">
                                    <span class="icon isDone ${toDo.isDone?'done':''}">✓</span>
                                    <div class="title">${toDo.name}</div>
                                </div>
                                <div class="action-buttons">
                                    <span class="delete-todo icon float-right">X</span>
                                </div>`;
            toDoList.appendChild(newDiv);
        });
        todoTitle.textContent = project.name;
    }

    static toggleToDo(todo, isDone){
        if(isDone){
            todo.classList.add("done");
        } else {
            todo.classList.remove("done");
        }
    }

}


//events
//add project
document.querySelector("#add-project").addEventListener('click', (e) => {
    let newName = prompt("What's the name of the project?", "unnamed");
    let project = new Project(newName);
    UI.addProject(project);
    Store.addProject(project);
});

//show project on main
document.querySelector(".projects").addEventListener('click', (e) => {
    if (e.target.classList.contains("expand")) {
        UI.showProject(e.target.parentNode.querySelector("div").textContent);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    UI.renderProjects();
});

document.querySelector("#add-item").addEventListener('click', (e) => {
    const name = prompt("name of todo");
    
    const isDone = false;
    const newToDo = new ToDo(name, isDone);
    const projectName = document.querySelector("#todo-title").textContent;
    Store.addToDo(projectName, newToDo);
    UI.showProject(projectName);
});

document.querySelector("#delete-project").addEventListener('click', (e) =>{
    const projectName = document.querySelector("#todo-title").textContent;
    Store.removeProject(projectName);
    UI.renderProjects();
    UI.showProject("");
});

document.querySelector(".todo-list").addEventListener('click', (e)=>{
    const projectName = document.querySelector("#todo-title").textContent;
    const todoName = e.target.parentNode.parentNode.querySelector(".title").textContent;
    let isDone = false;
    if(e.target.classList.contains("delete-todo")){
        Store.deleteToDo(projectName, todoName);
        UI.showProject(projectName);
    } else if(e.target.classList.contains("isDone")){
        console.log("HOLA");
        isDone = Store.toggleToDo(projectName, todoName);
    }

    UI.toggleToDo(e.target, isDone);
})