
// Load todos from the server and display them
function loadTodos() {
    fetch('todo.php')
        .then(response => response.json())
        .then(todos => {
            console.log(todos);
            const todoList = document.getElementById('todoList');
            const todoListOrdered = document.getElementById('todoListOrdered');

            todoList.innerHTML = '';
            todoListOrdered.innerHTML = ''; 

            // Add each todo as a list item
            todos.forEach(todo => {
                const li = document.createElement('li');
                const liOrdered = document.createElement('li');

                li.textContent = todo;
                liOrdered.textContent = todo;

                todoList.appendChild(li);
                todoListOrdered.appendChild(liOrdered);
            });
        });
}

// When the page is loaded, fetch and display todos
window.addEventListener("load", (event) => {
    loadTodos();
});

// Handle form submission for adding a new todo
document.getElementById('todoForm').addEventListener(
    'submit', function (e) {

    e.preventDefault();

    const todoInput = document.getElementById('todoInput').value;
    // console.log(JSON.stringify({ todo: todoInput }));

    // Send the new todo to the server
    fetch('todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todoInput }),
    })
    
    .then(response => response.json())
    .then((result) => {

        // console.log(result)
        loadTodos();    // Refresh the list after adding
        document.getElementById('todoInput').value = '';
    })
    .catch(error => console.error(`Fehler beim Senden des Todos: ${error}`))
});
