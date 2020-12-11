//book class
class ToDo{
    constructor(name, desc, isDone){
        this.name = name;
        this.desc = desc;
        this.isDone = isDone;
    }
}


//project class
class Project{
    constructor(name){
        this.name = name;
        this.toDoArr = [];
    }
    
    addBook(toDo){
        this.toDoArr.push(toDo);
    }
}


//store class
class Store{
    static getProjects(){
        let projects;
        if(localStorage.getItem('projects') === null){
            projects = [];
        } else {
            projects = JSON.parse(localStorage.getItem('projects'));
        }
        return projects;
    }

    static addProject(project){
        const projects = Store.getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static removeProject(name){
        const projects = Store.getProjects();
        projects.forEach(project, index, ()=>{
            if(project.name === name){
                projects.splice(index, 1);
            }
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static getProject(name){
        const projects = Store.getProjects();
        console.log(projects, name);
        for(let i = 0; i<projects.length; i++){
            if(projects[i].name === name){
                return projects[i];
            }
        }
        return null;
    }
}


//UI class
class UI{
    static addProject(project){
        const newProject = document.createElement("div");
        const projects = document.querySelector(".projects");
        newProject.innerHTML = `<div>${project.name}</div><span class="expand">+</span>`;
        newProject.className = "project";
        projects.appendChild(newProject);
    }

    static showProject(el){
        const toDoList = document.querySelector(".todo-list");
        toDoList.innerHTML = "";
        const project = Store.getProject(el);
        console.log(project);
        project.toDoArr.forEach(toDo => {
            let newDiv = document.createElement("div");
            newDiv.className = "todo";
            newDiv.textContent = toDo;
            toDoList.appendChild(newDiv);
        });

        const todoTitle = document.querySelector("#todo-title");
        todoTitle.textContent = project.name;

    }
}


//events
//add project
document.querySelector(".add-project").addEventListener('click', (e)=>{
    let newName = prompt("What's the name of the project?", "unnamed");
    let project = new Project(newName);
    UI.addProject(project);
    Store.addProject(project);
});
//show project on main
document.querySelector(".projects").addEventListener('click', (e)=>{
    if(e.target.classList.contains("expand")){
        UI.showProject(e.target.parentNode.querySelector("div").textContent);
    }
});