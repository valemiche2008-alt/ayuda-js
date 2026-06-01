// ==========================
// OBTENER ELEMENTOS DEL HTML
// ==========================

// input donde el usuario escribe la tarea
const titleInput = document.getElementById('title');

// select donde el usuario elige prioridad
const priorityInput = document.getElementById('priority');

// botón para guardar o actualizar tarea
const saveBtn = document.getElementById('saveBtn');

// contenedor donde se renderizan las tareas
const taskList = document.getElementById('taskList');

// párrafo donde se muestran errores
const error = document.getElementById('error');


// ==========================
// CARGAR DATOS DEL LOCALSTORAGE
// ==========================

// Busca las tareas guardadas en localStorage.
// Si existen, las convierte de JSON a array.
// Si no existen, crea un array vacío.
let tasks =
    JSON.parse(localStorage.getItem('tasks'))
    || [];


// variable para saber si estamos editando
// una tarea o creando una nueva
let editingId = null;


// ==========================
// GUARDAR EN LOCAL STORAGE
// ==========================

function saveStorage() {

    // guarda el array tasks en localStorage

    // JSON.stringify convierte el array
    // en texto para poder almacenarlo
    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}


// ==========================
// VALIDACIONES AVANZADAS
// ==========================

function validateTask(title, priority) {

    // trim() elimina espacios vacíos
    // ejemplo: "   hola   " → "hola"

    // valida si el input está vacío
    if (title.trim() === '') {

        error.textContent =
            'La tarea no puede estar vacía';

        return false;
    }

    // valida mínimo 3 caracteres
    if (title.length < 3) {

        error.textContent =
            'Mínimo 3 caracteres';

        return false;
    }

    // valida máximo 50 caracteres
    if (title.length > 50) {

        error.textContent =
            'Máximo 50 caracteres';

        return false;
    }

    // valida que el usuario seleccione
    // una prioridad
    if (priority === '') {

        error.textContent =
            'Selecciona prioridad';

        return false;
    }

    // valida si ya existe una tarea
    // con el mismo nombre

    const duplicated = tasks.some(

        // some() revisa si existe
        // al menos un elemento igual

        task =>

            // convierte texto a minúsculas
            // para evitar problemas
            // "Tarea" !== "tarea"

            task.title.toLowerCase() ===
            title.toLowerCase()

            // evita conflicto cuando editamos
            && task.id !== editingId
    );

    // si la tarea ya existe
    if (duplicated) {

        error.textContent =
            'La tarea ya existe';

        return false;
    }

    // limpia errores si todo salió bien
    error.textContent = '';

    // retorna true porque pasó validaciones
    return true;
}


// ==========================
// RENDERIZAR TAREAS (READ)
// ==========================

function renderTasks() {

    // limpia el contenedor antes de volver
    // a dibujar todas las tareas
    taskList.innerHTML = '';


    // recorre el array de tareas
    tasks.forEach(task => {

        // crea un div
        const div =
            document.createElement('div');

        // agrega clase css
        div.className = 'task';

        // inserta html dentro del div
        div.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>
                    Prioridad:
                    ${task.priority}
                </p>
            </div>

            <div class="buttons">

                <button
                    class="edit"
                    onclick="editTask(${task.id})"
                >
                    Editar
                </button>

                <button
                    class="delete"
                    onclick="deleteTask(${task.id})"
                >
                    Eliminar
                </button>

            </div>
        `;

        // mete el div dentro del contenedor
        taskList.appendChild(div);
    });
}


// ==========================
// CREATE + UPDATE
// ==========================

// escucha el click del botón guardar
saveBtn.addEventListener('click', () => {

    // obtiene lo escrito por el usuario
    const title = titleInput.value;

    // obtiene prioridad seleccionada
    const priority =
        priorityInput.value;


    // ejecuta validaciones
    const valid =
        validateTask(title, priority);

    // si no pasa validación
    // detiene el código
    if (!valid) return;


    // ======================
    // UPDATE
    // ======================

    // si editingId tiene valor
    // significa que editamos
    if (editingId) {

        // map recorre el array
        // y reemplaza la tarea editada
        tasks = tasks.map(task => {

            // busca la tarea correcta
            if (task.id === editingId) {

                // actualiza datos
                return {
                    ...task,
                    title,
                    priority
                };
            }

            // si no coincide
            // retorna igual
            return task;
        });

        // reinicia edición
        editingId = null;

        // cambia texto del botón
        saveBtn.textContent =
            'Guardar tarea';

    } else {

        // ======================
        // CREATE
        // ======================

        // crea objeto tarea
        const task = {

            // id único usando fecha actual
            id: Date.now(),

            // nombre tarea
            title,

            // prioridad
            priority
        };

        // agrega tarea al array
        tasks.push(task);
    }


    // guarda cambios
    saveStorage();

    // vuelve a renderizar
    renderTasks();


    // limpia inputs
    titleInput.value = '';
    priorityInput.value = '';
});


// ==========================
// EDITAR TAREA (UPDATE)
// ==========================

function editTask(id) {

    // busca tarea por id
    const task = tasks.find(

        task => task.id === id
    );

    // llena input con datos actuales
    titleInput.value =
        task.title;

    priorityInput.value =
        task.priority;

    // guarda id para editar
    editingId = id;

    // cambia texto del botón
    saveBtn.textContent =
        'Actualizar tarea';
}


// ==========================
// ELIMINAR TAREA (DELETE)
// ==========================

function deleteTask(id) {

    // muestra ventana de confirmación
    const confirmDelete = confirm(
        '¿Eliminar tarea?'
    );

    // si el usuario cancela
    // termina función
    if (!confirmDelete) return;


    // filter crea un nuevo array
    // sin la tarea eliminada
    tasks = tasks.filter(

        task => task.id !== id
    );


    // guarda cambios
    saveStorage();

    // actualiza interfaz
    renderTasks();
}


// ==========================
// INICIO DE LA SPA
// ==========================

// al abrir la página,
// renderiza tareas guardadas
renderTasks();
