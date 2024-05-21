 //находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');



 let tasks = [];
 if(localStorage.getItem('tasks')){
     tasks = JSON.parse(localStorage.getItem('tasks'))
 }
 tasks.forEach((task) =>{
     let cssClass = task.done ? " task-title task-title--done": "task-title";
     let taskHTML = `
<li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
<button type="button" data-action="done" class="btn-action">
<img src="./img/tick.svg" alt="Done" width="18" height="18">
</button>
<button type="button" data-action="delete" class="btn-action">
<img src="./img/cross.svg" alt="Done" width="18" height="18">
</button>
</div>
</li>`
     tasksList.insertAdjacentHTML('beforeend', taskHTML);
})

const addTask = (event)=>{
        event.preventDefault(); // отменяем перезагрузку браузера при отправке формы
        // Достать текст из поля ввода
        const taskText = taskInput.value;
        // Описываем задачу в виде объекта
        const newTask = {
            id:Date.now(),
            text: taskText,
            done : false
        }
        // добавляем задачу в массив
        tasks.push(newTask)
        saveToLocalStorage()

    let cssClass = newTask.done ? " task-title task-title--done": "task-title";
    let taskHTML = `
<li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${newTask.text}</span>
<div class="task-item__buttons">
<button type="button" data-action="done" class="btn-action">
<img src="./img/tick.svg" alt="Done" width="18" height="18">
</button>
<button type="button" data-action="delete" class="btn-action">
<img src="./img/cross.svg" alt="Done" width="18" height="18">
</button>
</div>
</li>`
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = '';
        taskInput.focus()
        //Скрытие "список дел пуст"

    checkEmptyList()

}
//удаление задачи
const deleteTask = (event)=>{
    if(event.target.dataset.action === "delete"){
        const parentNode = event.target.closest('li');

        // определяем ID задачи
        const id = parentNode.id;

        // находим индекс задачи в массиве
        const index = tasks.findIndex(function (task){
            if(task.id == id){
                return true
            }
        })

        //Удаляем задачу из массива
        tasks.splice(index,1)

        parentNode.remove()

    }
    checkEmptyList()
    saveToLocalStorage()

}
// отмечание галочкой "done"
const doneTask = (event)=>{
    // проверяем что клик был по кнопке "задача выполнена"
    if(event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('.list-group-item')

        //определяем Id задачи
        const id = parentNode.id;
        const task = tasks.find(function (task){
            if(task.id == id){
                return true
            }
        })

        task.done = !task.done
        console.log(task)



        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')

    }
    saveToLocalStorage()
}
//сохранение разметки в LocalStorage - 1) неправильный но быстрый способ - хранение всей разметки в LS
// const saveHTMLtoLS = ()=>{
//     localStorage.setItem('tasksHTML',tasksList.innerHTML) // вся разметка с задачами находится уже в tasksList
//
//
// }
 const checkEmptyList =  ()=>{
    if(tasks.length === 0){
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
\t\t\t\t\t<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
\t\t\t\t\t<div class="empty-list__title">Список дел пуст</div>
\t\t\t\t</li>`
        tasksList.insertAdjacentHTML('afterbegin',emptyListElement)
    }

    if(tasks.length>0){
        const emptyListHTML = document.querySelector('#emptyList');
        emptyListHTML ? emptyListHTML.remove():null;
    }
}
checkEmptyList()

const saveToLocalStorage = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
 }
saveToLocalStorage()




form.addEventListener('submit',addTask)
tasksList.addEventListener('click',deleteTask)
tasksList.addEventListener('click', doneTask)


