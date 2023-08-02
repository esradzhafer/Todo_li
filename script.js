


$(document).ready(function () {
    // Зареждане на задачите от localStorage при стартиране на страницата
    loadTasksFromLocalStorage();
  
    // Добавяне на нова задача
    $(".add-button").on("click", function () {
      const taskText = $(".addTxt").val().trim();
      if (taskText !== "") {
        const newTask = `
          <div  class="todo-item-container">
            <p class="todo-text">${taskText}</p>
  
            <button class="edit-button">
              <img class="tick" src="images/edit.png" alt="edit">
            </button>
  
            <button class="delete-button">
              <img class="dustbin" src="images/delete.png" alt="delete">
            </button>
  
          </div>
        `;
        $(".todos-container").append(newTask);
        $(".addTxt").val("");
  
        // Запазване на задачите в localStorage след добавяне
        saveTasksToLocalStorage();
      }
    });

   
    
  
    // Редактиране на задача
    $(document).on("click", ".edit-button", function () {
      const todoTextElement = $(this).siblings(".todo-text");
      const currentTaskText = todoTextElement.text();
      const updatedTaskText = prompt("Редактирайте задачата:", currentTaskText);
      if (updatedTaskText !== null && updatedTaskText !== "") {
        todoTextElement.text(updatedTaskText);
  
        // Запазване на задачите в localStorage след редактиране
        saveTasksToLocalStorage();
      }
    });
  
    // Изтриване на задача
    $(document).on("click", ".delete-button", function () {
      $(this).parent().remove();
  
      // Запазване на задачите в localStorage след изтриване
      saveTasksToLocalStorage();
    });
  
    function saveTasksToLocalStorage() {
      // Извличане на всички текстове на задачи и записване в localStorage
      const taskTexts = $(".todo-text").map(function () {
        return $(this).text();
      }).get();
      localStorage.setItem("tasks", JSON.stringify(taskTexts));
    }

    
  
    function loadTasksFromLocalStorage() {
      // Взимане на задачите от localStorage и добавяне към DOM структурата
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks) {
        storedTasks.forEach(function (taskText) {
          const newTask = `
            <div id="sortable" class="todo-item-container">
              <p class="todo-text">${taskText}</p>
              <button class="edit-button">
                <img class="tick" src="images/edit.png" alt="edit">
              </button>
              <button class="delete-button">
                <img class="dustbin" src="images/delete.png" alt="delete">
              </button>
            </div>
          `;
          $(".todos-container").append(newTask);
        });
      }
    }
    $( "#sortable" ).sortable();
  });