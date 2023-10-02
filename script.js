const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const validator = document.querySelector(".validator");

function saveAll(){
    const allTodos = JSON.stringify(listContainer.innerHTML);
    localStorage.setItem("myTodos", allTodos);
   }

function removeTodo(currentElement){
    console.log(currentElement.parentNode.parentNode);
    currentElement.parentNode.parentNode.remove();
    saveAll();
}

function deleteAll(){
    if (listContainer.childElementCount === 0) {
      validator.textContent = "List is Empty"
      saveAll();
    }
else{
    listContainer.innerHTML =""
    saveAll();
} 
}


function addTodo(){
    if(inputBox.value !== ''){
    var li = document.createElement("li");
    li.innerHTML = `<div><span>${inputBox.value}</span><button onclick = "editTodo(this)" id ="Yes" type="button" class="btn btn-success"> <i class="fas fa-edit">
    </i></button><button onclick = "removeTodo(this)"  id ="No" type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button></div>`;
    listContainer.appendChild(li);
    inputBox.value = "";
    validator.textContent = "";
    saveAll();
    }
    else {
        validator.textContent = "List is Empty";
        saveAll();
    }
}    
function editTodo(item){
    if(item.textContent === 'Done'){
    console.log("if cond", item.previousElementSibling);
    const todoName = item.previousElementSibling.value;
    let span = document.createElement("span");
    span.textContent = todoName;
    item.parentElement.replaceChild(span, item.previousElementSibling);
    item.textContent = "Edit";
    saveAll();
    }
    else{
        const todoName = item.previousElementSibling.textContent;
        console.log(todoName);
        item.textContent = "Done"
        let input = document.createElement("input");
        input.type = "text";
        input.value = todoName;
        item.parentElement.replaceChild(input, item.previousElementSibling); 
        saveAll();
    } 
}

function loadAllTodos(){
    const allTodos = JSON.parse(localStorage.getItem("myTodos"));
    console.log("allTodos", allTodos);
    listContainer.innerHTML = allTodos;
}
