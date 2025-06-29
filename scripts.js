/* create variables for IDs */
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const error = document.getElementById('error');

/* event listener for add button */
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    error.textContent = "Please enter a task.";
    return;
  }
  error.textContent = "";
  addTaskToDOM(taskText);
  taskInput.value = '';
});

/* create function for adding a new item to the list and add an edit and a delete button*/
function addTaskToDOM(taskText) {
  const li = document.createElement('li');

  const taskWrapper = document.createElement('div');
  taskWrapper.className = 'task-wrapper';

  // Create the number span
  const numberSpan = document.createElement('span');
  numberSpan.className = 'task-number';
  numberSpan.style.marginRight = '8px';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  taskWrapper.appendChild(numberSpan);
  taskWrapper.appendChild(taskSpan);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = "task-buttons";

  const editBtn = document.createElement('button');
  editBtn.textContent = "Edit";
  editBtn.addEventListener('click', () => {
    const newText = prompt("Edit your task:", taskSpan.textContent);
    if (newText && newText.trim()) {
      taskSpan.textContent = newText.trim();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', () => {
    li.remove();
    renumberTasks(); // Call re-numbering after deletion
  });

  const completedBtn = document.createElement('button');
  completedBtn.textContent = "Completed";
  completedBtn.addEventListener('click', () => {
    completedBtn.textContent = "Task Complete";
    deleteBtn.style.display = "none";
    editBtn.style.display = "none";
    li.style.backgroundColor = "green";
  });

  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);
  buttonsDiv.appendChild(completedBtn);

  li.appendChild(taskWrapper);
  li.appendChild(buttonsDiv);

  taskList.appendChild(li);
  renumberTasks(); // Call after adding
}
/* end of function */
/* re-numbering function */
function renumberTasks() {
  const listItems = taskList.querySelectorAll('li');
  listItems.forEach((li, index) => {
    const numberSpan = li.querySelector('.task-number');
    numberSpan.textContent = `${index + 1}.`;
  });
}